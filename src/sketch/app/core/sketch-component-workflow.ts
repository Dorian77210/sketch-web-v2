import { Class } from "konect-api-types-ts";
import { getConfigurationOf, getSlotByEntryName } from "@/sketch/app/core/sketch-component-configuration-manager";
import { Stack, ArrayStack } from "konect-api-types-ts";
import injectData from "@/sketch/app/core/inject-data";

import { GenericSketchComponentClass, SketchComponent } from "konect-api-types-ts";

/**
 * @author Dorian TERBAH
 * 
 * Class used to represent a succession of components in the app
 * 
 * @version 1.0
 */
export default class SketchComponentWorkflow {

    /**
     * Edges of the workflow. Each component will be mapped with their
     * entries names and the parent component associated.
     */
    private _edges: Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>>;

    /**
     * Cache of results of component
     */
    private resultCache: Map<SketchComponent<unknown>, any>;

    /**
     * Map a component with his children
     */
    private _children: Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>>;

    /**
     * Components that doesn't have any link with other components
     */
    private _orphanComponents: Array<SketchComponent<unknown>>;

    constructor() {
        this._edges = new Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>>();
        this._children = new Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>>();
        this._orphanComponents = new Array<SketchComponent<unknown>>();
        this.resultCache = new Map<SketchComponent<unknown>, any>();
    }

    get edges(): Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>> { return this._edges; }
    get children(): Map<SketchComponent<unknown>, Map<string, SketchComponent<unknown>>> { return this._children; }
    
    get orphanComponents(): Array<SketchComponent<unknown>> { return this._orphanComponents; }
    set orphanComponents(value: Array<SketchComponent<unknown>>) {
        this._orphanComponents = value;
    }

    /**
     * Insert a component in the workflow
     * @param component The component to insert
     */
    public insertComponent(component: SketchComponent<unknown>) : void {
        this.orphanComponents.push(component);
    }

    /**
     * @param component The component to check
     * @return true if the component has parents, otherwise false
     */
    private hasParents(component: SketchComponent<unknown>) : boolean {
        const parents : Map<string, SketchComponent<unknown>> | undefined = this.edges.get(component);
        return (parents != undefined) && (parents.size > 0);
    }

    /**
     * Try to create a link between with two components
     * @param parent The parent of the association
     * @param child The child of the association
     * @param entryName The entry name for the association
     * @returns true if the association was created, else false
     */
    public createLinkBetween(parent: SketchComponent<unknown>, child: SketchComponent<unknown>, entryName: string) : boolean {
        if (!this.isAssociationPossible(parent, child, entryName)
        || this.existsLinkBetween(parent, child, entryName)
        || this.isParent(child, parent)) {
            return false;
        }

        if (!this.edges.has(child)) {
            this.edges.set(child, new Map<string, SketchComponent<unknown>>());
        }

        const parents = this.edges.get(child) as Map<string, SketchComponent<unknown>>;
        parents.set(entryName, parent);

        if (!this.children.has(parent)) {
            this.children.set(parent, new Map<string, SketchComponent<unknown>>());
        }

        const children = this.children.get(parent);
        children?.set(entryName, child);

        if (this.resultCache.has(parent)) {
            injectData(child, entryName, this.resultCache.get(parent));
        }

        // remove the components from the orphan components
        this.orphanComponents = this.orphanComponents.filter(component => {
            return component !== parent && component !== child
        });

        return true;
    }

    public existsLinkBetween(parent: SketchComponent<unknown>, child: SketchComponent<unknown>, entryName: string) : boolean {
        if (!this.edges.has(child)) {
            return false;
        }

        const parents: Map<string, SketchComponent<unknown>> | undefined = this.edges.get(child);
        const potentialParent: SketchComponent<unknown> | undefined = parents?.get(entryName);
        return parent == potentialParent;
    }

    private isAssociationPossible(parent: SketchComponent<unknown>, child: SketchComponent<unknown>, entryName: string) : boolean {
        const parentConfiguration = getConfigurationOf(parent.constructor as GenericSketchComponentClass);
        const childConfiguration = getConfigurationOf(child.constructor as GenericSketchComponentClass);

        const parentTypeReturn: Class<unknown> | undefined = parentConfiguration.config.returnType;
        if (!childConfiguration.entries) {
            return false;
        }

        const slot = getSlotByEntryName(childConfiguration.entries, entryName);

        // maybe to review
        return slot !== undefined && slot.type === parentTypeReturn;
    }

    /**
     * Build a deque with the parents and the parents of the parents etc of the component
     * @param component The component which one the algo has to find the parents.
     * @return The deque with all the parents
     */
    private buildExecutionQueue(component: SketchComponent<unknown>) : Stack<SketchComponent<unknown>> {
        const componentStack: Stack<SketchComponent<unknown>> = new ArrayStack<SketchComponent<unknown>>();
        let currentComponents: Array<SketchComponent<unknown>> = [component];
        
        componentStack.push(component);
        // push all the parents of the component, then the parents of the parents, etc
        while (currentComponents.length !== 0) {
            const tmpComponents: Array<SketchComponent<unknown>> = [];
            currentComponents.forEach(currentComponent => {
                if (this.hasParents(currentComponent)) {
                    const parents = this.edges.get(currentComponent)?.values();
                    if (parents) {
                        Array.from(parents).forEach(parent => {
                            componentStack.push(parent);
                            tmpComponents.push(parent);
                        });
                    }
                }
            });

            currentComponents = []
            currentComponents.push(...tmpComponents);
        }

        return componentStack;
    }

    public async execute(component: SketchComponent<unknown>)  {
        const componentStack = this.buildExecutionQueue(component);

        let currentComponent: SketchComponent<unknown> | undefined;
        let result: any = null;

        while (!componentStack.isEmpty()) {
            currentComponent = componentStack.pop() as SketchComponent<unknown>;
            
            if (this.hasParents(currentComponent)) {
                const parents = this.edges.get(currentComponent);
                if (parents) {
                    for (const entry of Array.from(parents.entries())) {
                        const entryName = entry[0];
                        const parentResult = this.resultCache.get(parents.get(entryName) as SketchComponent<unknown>);
                        if (!injectData(currentComponent, entryName, parentResult)) {
                            throw "Impossible to pass data to component";
                        }
                        currentComponent.isDirty = true;
                    }
                }
            }

            if (currentComponent.isDirty) {
                await currentComponent.beforeExecute();
                result = currentComponent.execute();
                currentComponent.isDirty = false;
            } else {
                result = this.resultCache.get(currentComponent);
                if (!result) {
                    throw 'There was an error during the execution of the workflow';
                }
            }

            console.log(result);
            this.resultCache.set(currentComponent, result);
        }
        
        currentComponent = currentComponent as SketchComponent<unknown>;
        if (this.children.has(currentComponent)) {
            this.children.get(currentComponent)?.forEach((comp, entryName) => {
                injectData(comp, entryName, result);
            })
        }

        return true;
    }

    /**
     * Check if a component is the parent of another
     *
     * @param parent The potential parent.
     * @param child The potential child.
     * @return <code>true</code> if the first component is the parent of the second, else <code>false</code>.
     */
    private isParent(parent: SketchComponent<unknown>, child: SketchComponent<unknown>) : boolean {
        const links: Map<string, SketchComponent<unknown>> | undefined = this.edges.get(child);
        if (links === undefined) {
            return false;
        }

        const components: Array<SketchComponent<unknown>> = Array.from(links.values());
        return components.includes(parent);
    }

    public removeLink(child: SketchComponent<unknown>, entryName: string) : void {
        const parents: Map<string, SketchComponent<unknown>> | undefined = this.edges.get(child);
        if (parents !== undefined) {
            parents.delete(entryName);
        }
    }

    public deleteComponent(component: SketchComponent<unknown>) {
        this.orphanComponents = this.orphanComponents.filter(c => c !== component);
        this.edges.delete(component);
        this.children.delete(component);

        // remove links where the component is a parent
        this.edges.forEach((parents) => {
            const entriesToDelete: Array<string> = [];
            parents.forEach((parent, entry) => {
                if (parent === component) {
                    entriesToDelete.push(entry);
                }
            });

            entriesToDelete.forEach(entry => parents.delete(entry));
        });

        this.children.forEach((children) => {
            const entriesToDelete: Array<string> = [];
            children.forEach((child, entry) => {
                if (child === component) {
                    entriesToDelete.push(entry);
                }
            })

            entriesToDelete.forEach(entry => children.delete(entry));
        })
    }

    public clear() : void {
        this.edges.clear();
        this.children.clear();
        this.orphanComponents = [];
    }
}
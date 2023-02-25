import SketchComponentWorkflow from "./sketch-component-workflow";
import Save, { ComponentSaveConfiguration, ComponentLinkConfiguration, SAVE_EXTENSION, SaveReconstitution, ComponentLink } from "./save";
import { ComponentModel } from "../ui/utils";
import { ComponentConfiguration } from "konect-api-types";
import {saveFile, GenericSketchComponentClass, SketchComponentFactory, SketchComponent } from "konect-api-types";

import getFactoryFor from "./sketch-factory-manager";
import { getSketchComponentClassByString } from "./sketch-component-configuration-manager";

/**
 * @author Dorian Terbah
 *
 * @version 1.0
 *
 * Manage the main sketch board of the application.
 */
export default class SketchBoardManager
{
    private selectedComponent?: GenericSketchComponentClass;

    private _workflow: SketchComponentWorkflow;

    private _saveFilename = '';

    private _componentModels: Map<ComponentModel, ComponentConfiguration>;

    constructor()
    {
        this.selectedComponent = undefined;
        this._workflow = new SketchComponentWorkflow();
        this._componentModels = new Map();
    }

    get workflow(): SketchComponentWorkflow { return this._workflow; }

    get saveFilename(): string { return this._saveFilename; }
    set saveFilename(value: string) { this._saveFilename = value; }

    get componentModels(): Map<ComponentModel, ComponentConfiguration> { return this._componentModels; }

    public setSelectedComponent(componentClass: GenericSketchComponentClass)
    {
        this.selectedComponent = componentClass;
    }

    public getAndRemoveComponentClass(): GenericSketchComponentClass | undefined
    {
        const componentClass: GenericSketchComponentClass | undefined = this.selectedComponent;
        this.selectedComponent = undefined;
        return componentClass;
    }

    public saveBoard() {
        // save the board
        const components = this.getComponents();

        const factories = this.getFactoriesByComponentClass(components);

        const save: Save = {
            components: new Array<ComponentSaveConfiguration>(),
            links: new Array<ComponentLinkConfiguration>()
        };

        // insert the components data
        components.forEach(component => {
            const factory = factories.get(component.constructor as GenericSketchComponentClass) as SketchComponentFactory<SketchComponent<unknown>>;
            const config = Array.from(
                this.componentModels.keys()
            ).filter(model => model.component === component)[0];

            const componentJSON = {
                type: component.constructor.name,
                json: factory.toJSON(component),
                id: component.getID(),
                componentConfiguration: {
                    x: config.x,
                    y: config.y,
                    style: config.config
                }
            };
            
            save.components.push(componentJSON);
        })

        // insert the links of the parents
        this.workflow.edges.forEach((parentData, child) => {
            parentData.forEach((parent, entryName) => {
                const link: ComponentLinkConfiguration = {
                    parent: parent.getID(),
                    child: child.getID(),
                    entryName: entryName
                };

                save.links.push(link);
            })
        });

        // finally, save the workflow in the save
        saveFile(JSON.stringify(save), SAVE_EXTENSION, this.saveFilename);
    }

    public reconstructWorkflow(data: string) : SaveReconstitution {
        const save: Save = JSON.parse(data);
        const idToComponents = new Map<string, SketchComponent<unknown>>();

        const componentModels = new Array<ComponentModel>();
        const links = new Array<ComponentLink>();
        
        // reconstruct all the components
        const componentsJSON = save.components;
        componentsJSON.forEach(json => {
            const type = json.type;
            // retrieve the class component
            const componentClass = getSketchComponentClassByString(type);
            if (componentClass) {
                // find factory and create the corresponding component
                const factory = getFactoryFor(componentClass) as SketchComponentFactory<SketchComponent<unknown>>;
                const component = factory.fromJSON(json.json);
                const oldId = json.id;

                idToComponents.set(oldId, component);

                componentModels.push({
                    x: json.componentConfiguration.x,
                    y: json.componentConfiguration.y,
                    component,
                    config: json.componentConfiguration.style
                });
            }
        });

        // reconstitute links
        save.links.forEach(link => {
            const parent = idToComponents.get(link.parent);
            const child = idToComponents.get(link.child);
            const entryName = link.entryName;

            if (parent && child && entryName) {
                links.push({
                    parent,
                    child,
                    entryName
                });
            }
        });


        return {
            componentModels: componentModels,
            links
        };
    }

    private getComponents(): Array<SketchComponent<unknown>> {
        const components: Set<SketchComponent<unknown>> = new Set();
        this.workflow.edges.forEach((map, comp) => components.add(comp));
        this.workflow.children.forEach((map, comp) => components.add(comp));
        this.workflow.orphanComponents.forEach(comp => components.add(comp));
        return Array.from(components);
    }

    private getFactoriesByComponentClass(components: Array<SketchComponent<unknown>>) : Map<GenericSketchComponentClass, SketchComponentFactory<SketchComponent<unknown>>> {
        const factories : Map<GenericSketchComponentClass, SketchComponentFactory<SketchComponent<unknown>>> = new Map();

        components.forEach((component) => {
            const componentClass = component.constructor as GenericSketchComponentClass;
            if (!factories.has(componentClass)) {
                factories.set(componentClass, getFactoryFor(componentClass) as SketchComponentFactory<SketchComponent<unknown>>);
            }
        })

        return factories;
    }
}
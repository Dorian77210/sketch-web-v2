import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";
import SketchComponent from "@/sketch/api/sketch-component";
import SketchComponentWorkflow from "./sketch-component-workflow";
import { getConfigurationOf } from "@/sketch/api/sketch-component-configuration-manager";
import Save, { ComponentSaveConfiguration, ComponentLinkConfiguration, SAVE_EXTENSION } from "./save";
import { ComponentModel } from "../ui/utils";
import { ComponentConfiguration } from "@/sketch/api/component-configuration";
import saveFile from "@/sketch/api/file-saver";
import { GenericSketchComponentClass } from "@/sketch/api/types";

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

    public reconstructWorkflow(data: string) {
        const save: Save = JSON.parse(data);

        console.log(save);
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
            const configuration = getConfigurationOf(componentClass);
            if (!factories.has(componentClass)) {
                factories.set(componentClass, new configuration.factory());
            }
        })

        return factories;
    }
}
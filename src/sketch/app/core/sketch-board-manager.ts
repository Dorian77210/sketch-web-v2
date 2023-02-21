import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";
import SketchComponent from "@/sketch/api/sketch-component";
import { Class } from '@/sketch/api/types';
import SketchComponentWorkflow from "./sketch-component-workflow";

import { getConfigurationOf } from "@/sketch/api/sketch-component-configuration-manager";

import Save, { ComponentSaveConfiguration } from "./save";

/**
 * @author Dorian Terbah
 *
 * @version 1.0
 *
 * Manage the main sketch board of the application.
 */
export default class SketchBoardManager
{
    private selectedComponent?: Class<SketchComponent<unknown>>;

    private _workflow: SketchComponentWorkflow;

    private _saveFilename: string | undefined;

    constructor()
    {
        this.selectedComponent = undefined;
        this._workflow = new SketchComponentWorkflow();
    }

    get workflow(): SketchComponentWorkflow { return this._workflow; }
    get saveFilename(): string | undefined { return this._saveFilename; }
    set saveFilename(value: string | undefined) { this._saveFilename = value; }

    public setSelectedComponent(componentClass: Class<SketchComponent<unknown>>)
    {
        this.selectedComponent = componentClass;
    }

    public getAndRemoveComponentClass(): Class<SketchComponent<unknown>> | undefined
    {
        const componentClass: Class<SketchComponent<unknown>> | undefined = this.selectedComponent;
        this.selectedComponent = undefined;
        return componentClass;
    }

    public saveBoard() {
        // save the board
        const components = this.getComponents();
        const factories = this.getFactoriesByComponentClass(components);
        console.log(factories);

        const save: Save = {
            components: new Array<ComponentSaveConfiguration>()
        }


        components.forEach(component => {
            const factory = factories.get(component.constructor as Class<SketchComponent<unknown>>) as SketchComponentFactory<SketchComponent<unknown>>;
            const componentJSON = {
                type: component.constructor.name,
                json: factory.toJSON(component)
            };
            
            save.components.push(componentJSON);
        })

        console.log(JSON.stringify(save));
    }

    private getComponents(): Array<SketchComponent<unknown>> {
        const components: Set<SketchComponent<unknown>> = new Set();
        this.workflow.edges.forEach((map, comp) => components.add(comp));
        this.workflow.children.forEach((map, comp) => components.add(comp));
        this.workflow.orphanComponents.forEach(comp => components.add(comp));
        return Array.from(components);
    }

    private getFactoriesByComponentClass(components: Array<SketchComponent<unknown>>) : Map<Class<SketchComponent<unknown>>, SketchComponentFactory<SketchComponent<unknown>>> {
        const factories : Map<Class<SketchComponent<unknown>>, SketchComponentFactory<SketchComponent<unknown>>> = new Map();

        components.forEach((component) => {
            const componentClass = component.constructor as Class<SketchComponent<unknown>>;
            const configuration = getConfigurationOf(componentClass);
            if (!factories.has(componentClass)) {
                factories.set(componentClass, new configuration.factory());
            }
        })

        return factories;
    }
}
import SketchComponent from "@/sketch/api/sketch-component";
import { Class } from '@/sketch/api/types';
import SketchComponentWorkflow from "./sketch-component-workflow";

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
}
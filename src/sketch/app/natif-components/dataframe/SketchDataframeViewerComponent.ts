import { SketchComponent } from "konect-api-types";
import DataFrame from "dataframe-js";
import { ComponentConfiguration } from "konect-api-types";
import { SketchWrapper } from "konect-api-types";
import { faTable } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will display a dataframe in a table
 * 
 * @since 1.0
 */
export class SketchDataframeViewerComponent extends SketchComponent<void> {
    
    private _wrapper: SketchWrapper<DataFrame>;

    constructor() {
        super();
        this._wrapper = new SketchWrapper();
    }

    execute(): void {
        throw new Error("Method not implemented.");
    }
    copy(): SketchComponent<void> {
        throw new Error("Method not implemented.");
    }

    get wrapper(): SketchWrapper<DataFrame> { return this._wrapper; }

    setData(data: DataFrame): void {
        this._wrapper.setData(data);
    }
}

export const configuration: ComponentConfiguration = {
    namespace: 'Dataframe',
    name: 'Dataframe viewer',
    slotsConfigurations: [{
        type: DataFrame,
        entryName: 'dataframe',
        methodName: 'setData'
    }],
    icon: {
        name: 'fa-table',
        fa: faTable
    }
}
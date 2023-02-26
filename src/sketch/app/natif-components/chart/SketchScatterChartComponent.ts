import { SketchComponent } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import { SketchWrapper } from "konect-api-types-ts";
import { ComponentConfiguration } from "konect-api-types-ts";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

/**
 * @author Dorian TERBAH
 * 
 * This component will display a scatter chart
 * 
 * @since 1.0
 */
export class SketchScatterChartComponent extends SketchComponent<void> {
    
    private _wrapper: SketchWrapper<DataFrame>;
    
    constructor() {
        super();
        this._wrapper = new SketchWrapper<DataFrame>();
    }

    execute(): void {
        throw new Error("Method not implemented.");
    }
    copy(): SketchComponent<void> {
        throw new Error("Method not implemented.");
    }

    get wrapper() : SketchWrapper<DataFrame> { return this._wrapper; }

    setData(data: DataFrame) {
        this.wrapper.setData(data);
    }
}

export const configuration : ComponentConfiguration = {
    namespace: 'Chart',
    name: 'Scatter chart',
    slotsConfigurations: [{
        entryName: 'data',
        methodName: 'setData',
        type: DataFrame
    }],
    icon: {
        name: 'fa-ellipsis',
        fa: faEllipsis
    }
}
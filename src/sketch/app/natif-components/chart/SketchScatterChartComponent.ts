import { Component, Entry, SketchComponent } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import { SketchWrapper } from "konect-api-types-ts";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

/**
 * @author Dorian TERBAH
 * 
 * This component will display a scatter chart
 * 
 * @since 1.0
 */

@Component({
    namespace: 'Chart',
    name: 'Scatter chart',
    icon: {
        name: 'fa-ellipsis',
        fa: faEllipsis
    }
})
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

    @Entry("dataframe", DataFrame)
    setData(data: DataFrame) {
        this.wrapper.setData(data);
    }
}
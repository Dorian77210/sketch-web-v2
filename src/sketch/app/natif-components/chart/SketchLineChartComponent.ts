import { Component, Entry, SketchComponent } from "konect-api-types-ts";
import { SketchWrapper } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

/**
 * @author Dorian TERBAH 
 * 
 * This component will display a line chart
 * 
 * @since 1.0
 */

@Component({
    namespace: 'Chart',
    name: 'Line chart',
    icon: {
        name: 'fa-chart-line',
        fa: faChartLine
    }
})
export class SketchLineChartComponent extends SketchComponent<void> {

    private dataWrapper: SketchWrapper<DataFrame>;

    constructor() {
        super();
        this.dataWrapper = new SketchWrapper<DataFrame>();
    }

    execute(): void {
        throw new Error("Method not implemented.");
    }
    copy(): SketchComponent<void> {
        throw new Error("Method not implemented.");
    }

    @Entry("dataframe", DataFrame)
    setData(data: DataFrame) {
        this.dataWrapper.setData(data);
    }

    get wrapper() : SketchWrapper<DataFrame> { return this.dataWrapper; }
}
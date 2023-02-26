import { SketchComponent } from "konect-api-types-ts";
import { ComponentConfiguration } from "konect-api-types-ts";
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

    setData(data: DataFrame) {
        this.dataWrapper.setData(data);
    }

    get wrapper() : SketchWrapper<DataFrame> { return this.dataWrapper; }
}

export const configuration: ComponentConfiguration = {
    namespace: 'Chart',
    name: 'Line chart',
    slotsConfigurations: [{
        entryName: 'data',
        methodName: 'setData',
        type: DataFrame
    }],
    icon: {
        name: 'fa-chart-line',
        fa: faChartLine
    }
}
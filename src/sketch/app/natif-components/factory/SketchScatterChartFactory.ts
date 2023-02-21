/* eslint-disable @typescript-eslint/no-unused-vars */
import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { SketchScatterChartComponent } from "../chart/SketchScatterChartComponent";

export default class SketchScatterChartFactory implements SketchComponentFactory<SketchScatterChartComponent> {
    
    fromJSON(json: object): SketchScatterChartComponent {
        return new SketchScatterChartComponent();
    }

    toJSON(component: SketchScatterChartComponent): object {
        return {};
    }
}
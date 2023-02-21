import SketchComponent from "@/sketch/api/sketch-component";

import SketchScatterChartPopup from '@/sketch/app/natif-components/ui/chart/SketchScatterChartPopup.vue';

import DataFrame from "dataframe-js";

import SketchWrapper from "@/sketch/api/sketch-wrapper";
import { ComponentConfiguration } from "@/sketch/api/component-configuration";

import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import SketchScatterChartFactory from "../factory/SketchScatterChartFactory";

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
    popup: SketchScatterChartPopup,
    factory: SketchScatterChartFactory,
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
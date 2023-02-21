import SketchComponent from "@/sketch/api/sketch-component";
import SketchWrapper from "@/sketch/api/sketch-wrapper";

import DataFrame from "dataframe-js";
import DataframeService from "../services/dataframe/DataframeService";

import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { ComponentConfiguration } from "@/sketch/api/component-configuration";

import SketchElbowMethodPopup from '@/sketch/app/natif-components/ui/dataframe/SketchElbowMethodPopup.vue';

import SketchElbowMethodFactory from "../factory/dataframe/SketchElbowMethodFactory";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will compute elbow method on the data
 * 
 * @since 1.0
 */
export class SketchElbowMethodComponent extends SketchComponent<DataFrame> {

    private _wrapper: SketchWrapper<DataFrame>;

    private _maxClusters = 0;

    private result: DataFrame | undefined;

    constructor() {
        super();
        this._wrapper = new SketchWrapper();
    }

    execute(): DataFrame {
        if (this.result) {
            return this.result;
        }

        throw 'Elbow method cannot be computed';
    }

    get wrapper(): SketchWrapper<DataFrame> { return this._wrapper; }
    get maxClusters(): number { return this._maxClusters; }

    setMaxClusters(maxClusters: number) {
        this._maxClusters = maxClusters;
    }

    async beforeExecute() {
        if (this.wrapper.isDataAvailable() && this._maxClusters > 0) {
            this.result = await DataframeService.elbow(this.wrapper.getData() as DataFrame, this._maxClusters);
        }
    }

    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }

    setData(data: DataFrame) {
        this.wrapper.setData(data);
    }
}

export const configuration: ComponentConfiguration = {
    namespace: 'Dataframe',
    name: 'Elbow method',
    popup: SketchElbowMethodPopup,
    returnType: DataFrame,
    factory: SketchElbowMethodFactory,
    slotsConfigurations: [{
        entryName: 'dataframe',
        methodName: 'setData',
        type: DataFrame
    }],
    icon: {
        name: 'fa-magnifying-glass-chart',
        fa: faMagnifyingGlassChart
    }
}
import { Component, Entry, SketchComponent } from "konect-api-types-ts";
import { SketchWrapper } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import DataframeService from "../services/dataframe/DataframeService";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will compute elbow method on the data
 * 
 * @since 1.0
 */

@Component({
    namespace: 'Dataframe',
    name: 'Elbow method',
    icon: {
        name: 'fa-magnifying-glass-chart',
        fa: faMagnifyingGlassChart
    }
})
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

    @Entry("dataframe", DataFrame)
    setData(data: DataFrame) {
        this.wrapper.setData(data);
    }
}
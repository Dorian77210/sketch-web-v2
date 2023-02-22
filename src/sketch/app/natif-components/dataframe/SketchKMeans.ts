import SketchComponent from "@/sketch/api/sketch-component";
import DataFrame from "dataframe-js";
import { faCircleNodes } from "@fortawesome/free-solid-svg-icons";
import { ComponentConfiguration } from "@/sketch/api/component-configuration";
import SketchWrapper from "@/sketch/api/sketch-wrapper";
import DataframeService from "../services/dataframe/DataframeService";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will compute KMeans algorithm
 * 
 * @since 1.0
 */
export class SketchKMeansComponent extends SketchComponent<DataFrame> {

    private _wrapper : SketchWrapper<DataFrame>;

    private _clusters = 0;

    private result: DataFrame | undefined;

    constructor() {
        super();
        this._wrapper = new SketchWrapper();
    }

    execute(): DataFrame {
        if (this.result) {
            return this.result;
        }

        throw 'KMeans cannot be computed. An error occurred';
    }

    async beforeExecute()  {
        if (this.wrapper.isDataAvailable() && this.clusters > 0) {
            this.result = await DataframeService.kmeans(this.wrapper.getData() as DataFrame, this.clusters);
        }
    }


    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }
    
    get wrapper(): SketchWrapper<DataFrame> { return this._wrapper; }
    get clusters(): number { return this._clusters; }

    setClusters(clusters: number) {
        this._clusters = clusters;
    }


    setData(data: DataFrame): void {
        this.wrapper.setData(data);
    }
}

export const configuration: ComponentConfiguration = {
    namespace: 'Dataframe',
    name: 'KMeans',
    returnType: DataFrame,
    slotsConfigurations: [{
        entryName: 'dataframe',
        methodName: 'setData',
        type: DataFrame
    }],
    icon: {
        name: 'fa-circle-nodes',
        fa: faCircleNodes
    }
}
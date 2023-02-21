import SketchComponent from "@/sketch/api/sketch-component";
import DataFrame from "dataframe-js";

import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { ComponentConfiguration } from "@/sketch/api/component-configuration";

import SketchDataframeFromCSVPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeFromCSVPopup.vue';
import SketchWrapper from "@/sketch/api/sketch-wrapper";

import SketchDataframeFromCSVFactory from "../factory/dataframe/SketchDataframeFromCSVFactory";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will load a dataframe from
 * a csv file
 * 
 * @since 1.0
 */

export class SketchDataframeFromCSVComponent extends SketchComponent<DataFrame> {
    
    private _wrapper: SketchWrapper<File>;

    private data: DataFrame | undefined;

    constructor() {
        super();
        this._wrapper = new SketchWrapper();
    }

    execute(): DataFrame {
        if (!this.wrapper.isDataAvailable()) {
            throw 'No file set to load dataframe';
        }

        if (this.data) {
            return this.data as DataFrame;
        }

        throw 'No data set to load dataframe';
    }

    async beforeExecute() {
        if (this.wrapper.isDataAvailable()) {
            DataFrame.fromCSV(this.wrapper.getData()).then(data => this.data = data);
        }
    }

    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }

    get wrapper(): SketchWrapper<File> { return this._wrapper; }
    
    async setCSVFile(file: File) {
        this.wrapper.setData(file);
        this.data = await DataFrame.fromCSV(file);
    }
}

export const configuration: ComponentConfiguration = {
    namespace: 'Dataframe',
    name: 'CSV Loader',
    popup: SketchDataframeFromCSVPopup,
    factory: SketchDataframeFromCSVFactory,
    returnType: DataFrame,
    icon: {
        name: 'fa-file-csv',
        fa: faFileCsv
    }
}
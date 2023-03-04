import { Component, Entry, SketchComponent } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import {saveFile} from "konect-api-types-ts";
import { SketchWrapper } from "konect-api-types-ts";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will save a dataframe in a CSV file
 * 
 * @since 1.0
 */

@Component({
    namespace: 'Dataframe',
    name: 'Save as CSV',
    icon: {
        name: 'fa-file-csv',
        fa: faFileCsv
    }
})
export class SketchDataframeToCSVComponent extends SketchComponent<DataFrame> {
    
    private _wrapper: SketchWrapper<DataFrame>;

    private _filename = '';

    constructor() {
        super();
        this._wrapper = new SketchWrapper();
    }

    get wrapper(): SketchWrapper<DataFrame> { return this._wrapper; }
    get filename(): string { return this._filename; }

    setFilename(filename: string) {
        this._filename = filename;
    }

    execute(): DataFrame {
        if (!this.filename) {
            throw 'None filename was specified for saving dataframe';
        }

        if (!this.wrapper.isDataAvailable()) {
            throw 'No data available for saving dataframe';
        }

        const dataframe = this.wrapper.getData() as DataFrame;

        saveFile(dataframe.toCSV(), 'csv', this.filename);

        return dataframe;
    }

    @Entry("dataframe", DataFrame)
    setData(data: DataFrame) {
        this.wrapper.setData(data);
    }


    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }
    
}
import SketchComponent from "@/sketch/api/sketch-component";
import DataFrame from "dataframe-js";

import { ComponentConfiguration } from "@/sketch/api/component-configuration";

import SketchDataframeFilterColumnsPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeFilterColumnsPopup.vue';

import { faFilter } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will filter the columns of a dataframe
 * 
 * @since 1.0
 */
export class SketchDataframeFilterColumnsComponent extends SketchComponent<DataFrame> {
    
    private _selectedColumns: Array<string>;

    private _dataframe: DataFrame | undefined;

    constructor() {
        super();
        this._selectedColumns = []
    }

    execute(): DataFrame {
        throw new Error("Method not implemented.");
    }
    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }

    get selectedColumns(): Array<string> { return this._selectedColumns; }
    get dataframe(): DataFrame | undefined { return this._dataframe; }

    setData(data: DataFrame) {
        this._dataframe = data;
    }
}

export const configuration: ComponentConfiguration = {
    namespace: 'Dataframe',
    name: 'Filter columns',
    popup: SketchDataframeFilterColumnsPopup,
    returnType: DataFrame,
    slotsConfigurations: [{
        entryName: 'dataframe',
        methodName: 'setData',
        type: DataFrame
    }],
    icon: {
        name: 'fa-filter',
        fa: faFilter
    }
}
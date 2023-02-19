import SketchComponent from "@/sketch/api/sketch-component";
import SketchWrapper from "@/sketch/api/sketch-wrapper";

import DataFrame from "dataframe-js";

import SketchDataframeShufflePopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeShufflePopup.vue';

import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { ComponentConfiguration } from "@/sketch/api/component-configuration";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will shuffle a dataframe
 * 
 * @since 1.0
 */
export class SketchDataframeShuffleComponent extends SketchComponent<DataFrame> {

    private _wrapper: SketchWrapper<DataFrame>;

    constructor() {
        super();
        this._wrapper = new SketchWrapper();
    }

    get wrapper(): SketchWrapper<DataFrame> { return this._wrapper; }

    execute(): DataFrame {
        if (!this.wrapper.isDataAvailable()) {
            throw 'No data available for shuffling';
        }

        const dataframe = this.wrapper.getData() as DataFrame;

        return dataframe.shuffle();
    }

    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }
    
    setData(data: DataFrame) {
        this.wrapper.setData(data);
    }
}

export const configuration : ComponentConfiguration = {
    namespace : 'Dataframe',
    name: 'Dataframe Shuffler',
    returnType: DataFrame,
    popup: SketchDataframeShufflePopup,
    slotsConfigurations: [{
        entryName: 'dataframe',
        methodName: 'setData',
        type: DataFrame
    }],
    icon: {
        name: 'fa-shuffle',
        fa: faShuffle
    }
}
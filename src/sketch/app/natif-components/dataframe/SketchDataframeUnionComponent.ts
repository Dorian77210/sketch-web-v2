import SketchComponent from "@/sketch/api/sketch-component";
import SketchWrapper from "@/sketch/api/sketch-wrapper";

import DataFrame from "dataframe-js";

import { faCodeMerge } from "@fortawesome/free-solid-svg-icons";
import { ComponentConfiguration } from "@/sketch/api/component-configuration";

import SketchDataframeUnionPopup from '@/sketch/app/natif-components/ui/dataframe/SketchDataframeUnionPopup.vue';

/**
 * @author Dorian TERBAH
 * 
 * This component will compute the union of two dataframes which has the same headers
 * 
 * @version 1.0
 */
export class SketchDataframeUnionComponent extends SketchComponent<DataFrame> {

    private _leftDataframeWrapper: SketchWrapper<DataFrame>;

    private _rightDataframeWrapper: SketchWrapper<DataFrame>;

    constructor() {
        super();
        this._leftDataframeWrapper = new SketchWrapper<DataFrame>();
        this._rightDataframeWrapper = new SketchWrapper<DataFrame>();
    }

    get leftWrapper(): SketchWrapper<DataFrame> { return this._leftDataframeWrapper; }
    get rightWrapper(): SketchWrapper<DataFrame> { return this._rightDataframeWrapper; }

    setLeftDataframe(data: DataFrame) {
        this.leftWrapper.setData(data);
    }

    setRightDataframe(data: DataFrame) {
        this.rightWrapper.setData(data);
    }

    execute(): DataFrame {
        if (!this.rightWrapper.isDataAvailable()) {
            throw 'The right dataframe is not available';
        }

        if (!this.leftWrapper.isDataAvailable()) {
            throw 'The left dataframe is not available';
        }

        const leftDataframe = this.leftWrapper.getData() as DataFrame;
        const rightDataframe = this.rightWrapper.getData() as DataFrame

        return leftDataframe.union(rightDataframe);
    }

    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }
}

export const configuration: ComponentConfiguration = {
    namespace: 'Dataframe',
    name: 'Dataframe union',
    returnType: DataFrame,
    popup: SketchDataframeUnionPopup,
    slotsConfigurations: [{
        entryName: 'left dataframe',
        methodName: 'setLeftDataframe',
        type: DataFrame
    }, {
        entryName: 'right dataframe',
        methodName: 'setRightDataframe',
        type: DataFrame
    }],
    icon: {
        name: 'fa-code-merge',
        fa: faCodeMerge
    }
}
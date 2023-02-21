import { ComponentConfiguration } from "@/sketch/api/component-configuration";

import SketchComponent from "@/sketch/api/sketch-component";

import SketchSequencePopup from "@/sketch/app/natif-components/ui/math/SketchSequencePopup.vue";

import { faArrowDown19 } from "@fortawesome/free-solid-svg-icons";

import SequenceData from "../data/SequenceData";
import { NumberList } from "@/sketch/api/data-structures";

import SketchSequenceFactory from "../factory/math/SketchSequenceFactory";

/**
 * @author Dorian TERBAH
 * 
 * This component will compute a number sequence 
 * between a start abnd an end with a given step.
 * 
 * @since 1.0
 */
export class SketchSequenceComponent extends SketchComponent<Array<number>> {

    private _sequenceData: SequenceData = new SequenceData();

    constructor() {
        super();
    }

    execute(): NumberList {
        const result: NumberList = new NumberList();

        if (!this._sequenceData.isValidStep()) {
            throw "The step is not correctly defined";
        }

        const begin = this._sequenceData.begin;
        const end = this._sequenceData.end;
        const step = this._sequenceData.step;
        let value = begin;

        while ((step > 0.0 ? value < end : value > end)) {
            result.push(value);
            value += step;
        }

        return result;
    }
    
    copy(): SketchComponent<number[]> {
        throw new Error("Method not implemented.");
    }

    setBegin(begin: number) {
        this._sequenceData.begin = begin;
    }

    setEnd(end: number) {
        this._sequenceData.end = end;
    }

    getSequenceData(): SequenceData { return this._sequenceData; }
}

export const configuration: ComponentConfiguration = {
    namespace: 'Math',
    name: 'Sequence number',
    popup: SketchSequencePopup,
    returnType: NumberList,
    factory: SketchSequenceFactory,
    slotsConfigurations: [{
        entryName: 'begin',
        methodName: 'setBegin',
        type: Number
    }, {
        entryName: 'end',
        methodName: 'setEnd',
        type: Number
    }],
    icon: {
        name: 'fa-arrow-down-1-9',
        fa: faArrowDown19
    }
}
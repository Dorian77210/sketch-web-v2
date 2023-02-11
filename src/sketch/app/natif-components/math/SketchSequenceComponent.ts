import { ComponentConfiguration } from "@/sketch/api/component-configuration";

import SketchComponent from "@/sketch/api/sketch-component";

import SketchSequencePopup from "@/sketch/app/natif-components/ui/math/SketchSequencePopup.vue";

import { faArrowDown19 } from "@fortawesome/free-solid-svg-icons";

import SequenceData from "../data/SequenceData";

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

    execute(): number[] {
        throw new Error("Method not implemented.");
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
    returnType: Number,
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
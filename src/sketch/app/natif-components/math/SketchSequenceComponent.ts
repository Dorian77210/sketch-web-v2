import { Component, Documentation, Entry } from "konect-api-types-ts";
import { SketchComponent } from "konect-api-types-ts";
import { faArrowDown19 } from "@fortawesome/free-solid-svg-icons";
import SequenceData from "../data/SequenceData";
import { NumberList } from "konect-api-types-ts";

/**
 * @author Dorian TERBAH
 * 
 * This component will compute a number sequence 
 * between a start abnd an end with a given step.
 * 
 * @since 1.0
 */

@Component({
    namespace: 'Math',
    name: 'Sequence number',
    returnType: NumberList,
    icon: {
        name: 'fa-arrow-down-1-9',
        fa: faArrowDown19
    }
})
@Documentation({
    description: `This component will compute a sequence of number,
    between the begin and the end, with an interval of the step.`,
    slotsDocumentation: [{
        name: 'begin',
        description: 'This corresponds to the begin of the sequence',
        type: 'Number'
    }, {
        name: 'end',
        description: 'This corresponds to the end of the sequence',
        type: 'Number'
    }],
    output: {
        name: 'sequence',
        description: `This corresponds to the computed sequence. If the begin value is greater than the end value, but the step is positive, it will
        show an error. If the begin is less than the end value, but the step is negative, it will also show an error.`,
        type: 'NumberList'
    }
})
export default class SketchSequenceComponent extends SketchComponent<Array<number>> {

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

    @Entry("begin", Number)
    setBegin(begin: number) {
        this._sequenceData.begin = begin;
    }

    @Entry("end", Number)
    setEnd(end: number) {
        this._sequenceData.end = end;
    }

    getSequenceData(): SequenceData { return this._sequenceData; }
}

import { ComponentConfiguration } from "@/sketch/api/component-configuration";

import SketchComponent from "@/sketch/api/sketch-component";

import SketchNumberInputPopup from "@/sketch/app/natif-components/ui/SketchNumberInputPopup.vue";

import { faArrowDown19 } from "@fortawesome/free-solid-svg-icons";

/**
 * @author Dorian TERBAH
 * 
 * This component will compute a number sequence 
 * between a start abnd an end with a given step.
 * 
 * @since 1.0
 */
export class SketchSequenceComponent extends SketchComponent<Array<number>> {
    
    constructor() {
        super();
    }

    execute(): number[] {
        throw new Error("Method not implemented.");
    }
    
    copy(): SketchComponent<number[]> {
        throw new Error("Method not implemented.");
    }
}

export const configuration: ComponentConfiguration = {
    namespace: 'inputs',
    name: 'Sequence number',
    popup: SketchNumberInputPopup,
    returnType: Number,
    slotsConfigurations: [{
        name: 'begin',
        methodName: 'setBegin',
        type: Number
    }, {
        name: 'end',
        methodName: 'setEnd',
        type: Number
    }],
    icon: {
        name: 'fa-arrow-down-1-9',
        fa: faArrowDown19
    }
}
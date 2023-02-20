import { NumberList } from "@/sketch/api/data-structures";
import SketchComponent from "@/sketch/api/sketch-component";
import SketchWrapper from "@/sketch/api/sketch-wrapper";

import DataFrame from "dataframe-js";
import { MathNode, derivative } from "mathjs";

import { faCalculator } from "@fortawesome/free-solid-svg-icons";

import SketchCustomFunctionPopup from '@/sketch/app/natif-components/ui/math/SketchCustomFunctionPopup.vue';
import { ComponentConfiguration } from "@/sketch/api/component-configuration";

/**
 * @author Dorian TERBAH
 * 
 * This component will compute a derivative of function 
 * on a sequence of numbers
 * 
 * @since 1.0
 */

export class SketchDerivativeFunctionComponent extends SketchComponent<DataFrame> {

    private _numbers: SketchWrapper<NumberList>;

    private _customFunction = '';

    constructor() {
        super();
        this._numbers = new SketchWrapper<NumberList>();
    }

    get numbers(): SketchWrapper<NumberList> { return this._numbers; }
    get customFunction(): string { return this._customFunction; }

    setData(list: NumberList) {
        this.numbers.setData(list);
    }

    execute(): DataFrame {
        if (!this.numbers.isDataAvailable()) {
            throw `No data available for the computation of the custom function "${this.customFunction}"`;
        }
    
        const f: MathNode = derivative(this.customFunction, 'x');
        const y: Array<number> = Array<number>();
        const x = this.numbers.getData() as NumberList;

        x.forEach(n => y.push(f.evaluate({ x: n})));

        return new DataFrame({
            x,
            y
        })
    }
    
    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }

    setCustomFunction(fn: string) {
        this._customFunction = fn;
    }
}

export const configuration : ComponentConfiguration = {
    namespace: 'Math',
    name: 'Derivative function',
    popup: SketchCustomFunctionPopup,
    returnType: DataFrame,
    slotsConfigurations: [{
        entryName: 'numbers',
        methodName: 'setData',
        type: NumberList
    }],
    icon: {
        name: 'fa-calculator',
        fa: faCalculator
    }
}
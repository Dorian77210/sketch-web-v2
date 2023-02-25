import { SketchComponent } from "konect-api-types";
import { NumberList } from "konect-api-types";
import DataFrame from "dataframe-js";
import { SketchWrapper } from "konect-api-types";
import { parse, MathNode } from 'mathjs';
import { ComponentConfiguration } from "konect-api-types";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

/**
 * @author Dorian TERBAH
 * 
 * This component will compute a custom function from the user
 * 
 * @since 1.0
 */
export class SketchCustomFunctionComponent extends SketchComponent<DataFrame> {

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
    
        const f: MathNode = parse(this.customFunction);
        const y: Array<number> = Array<number>();
        const x = this.numbers.getData() as NumberList;

        x.forEach(n => y.push(f.evaluate({ x: n})));

        console.log(y);

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
    name: 'Custom function',
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
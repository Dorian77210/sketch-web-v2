import { SketchComponent } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { ComponentConfiguration } from "konect-api-types-ts";
import { NumberList } from "konect-api-types-ts";
import { SketchWrapper } from "konect-api-types-ts";

type MathFunction = (value: number) => number;

/**
 * @author Dorian TERBAH
 * 
 * This component will compute a mathematical function
 * to a sequence of numbers
 * 
 * @since 1.0
 */

export type MathStringFunction = 'cos' | 'sin' | 'tan' | 'acos' | 'atan' | 'abs' | 'exp' | 'log';

export class SketchMathFunctionComponent extends SketchComponent<DataFrame> {

    /**
     * List of all function available
     */
    public static FUNCTIONS_AVAILABLE: Map<MathStringFunction, MathFunction> = new Map([
        [ 'cos', Math.cos ],
        [ 'sin', Math.sin ],
        [ 'tan', Math.tan ],
        [ 'acos', Math.acos ],
        [ 'atan', Math.atan ],
        [ 'abs', Math.abs ],
        [ 'exp', Math.exp ],
        [ 'log', Math.log ]
    ]);

    private dataWrapper: SketchWrapper<NumberList>;

    private _functionName: MathStringFunction;

    constructor() {
        super();
        this.dataWrapper = new SketchWrapper<NumberList>();
        this._functionName = 'cos';
    }    

    execute(): DataFrame {
        if (!this.functionName) {
            throw 'You must choose a function name for the component.';
        }

        if (!this.dataWrapper.isDataAvailable()) {
            throw `No data availble to compute ${this.functionName} function`;
        }

        const y: NumberList = new NumberList();
        const func: MathFunction = SketchMathFunctionComponent.FUNCTIONS_AVAILABLE.get(this.functionName) as MathFunction;
        
        this.dataWrapper.getData()?.forEach(n => {
            y.push(func(n));
        })

        const dataframe: DataFrame = new DataFrame({
            x: this.dataWrapper.getData(),
            y: y
        })

        return dataframe;
    }
    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }

    public setData(data: NumberList) {
        this.dataWrapper.setData(data);
    }    

    setFunctionName(name: MathStringFunction) { this._functionName = name; }
    get functionName() { return this._functionName; }
}


export const configuration: ComponentConfiguration = {
    namespace: 'Math',
    name: 'Math function',
    returnType: DataFrame,
    slotsConfigurations: [{
        entryName: 'data',
        methodName: 'setData',
        type: NumberList
    }],
    icon: {
        name: 'fa-wave-square',
        fa: faWaveSquare
    }
}
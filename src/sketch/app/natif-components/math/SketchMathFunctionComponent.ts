import SketchComponent from "@/sketch/api/sketch-component";
import DataFrame from "dataframe-js";

import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { ComponentConfiguration } from "@/sketch/api/component-configuration";

import SketchMathFunctionPopup from '@/sketch/app/natif-components/ui/math/SketchMathFunctionPopup.vue';
import { NumberList } from "@/sketch/api/data-structures";
import SketchWrapper from "@/sketch/api/sketch-wrapper";

type MathFunction = (value: number) => number;

/**
 * @author Dorian TERBAH
 * 
 * This component will compute a mathematical function
 * to a sequence of numbers
 * 
 * @since 1.0
 */
export class SketchMathFunctionComponent extends SketchComponent<DataFrame> {

    /**
     * List of all function available
     */
    public static FUNCTIONS_AVAILABLE: Map<string, MathFunction> = new Map([
        [ 'cos', Math.cos ],
        [ 'sin', Math.sin ],
        [ 'tan', Math.tan ]
    ]);

    private dataWrapper: SketchWrapper<NumberList>;

    private _functionName: string;

    constructor() {
        super();
        this.dataWrapper = new SketchWrapper<NumberList>();
        this._functionName = '';
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

    setFunctionName(name: string) { this._functionName = name; }
    get functionName() { return this._functionName; }
}


export const configuration: ComponentConfiguration = {
    namespace: 'Math',
    name: 'Math function',
    popup: SketchMathFunctionPopup,
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
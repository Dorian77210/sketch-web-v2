import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { MathStringFunction, SketchMathFunctionComponent } from "../../math/SketchMathFunctionComponent";

type SketchMathFunctionJSON = {
    functionName: MathStringFunction;
}

const DEFAULT_FUNCTION_NAME: MathStringFunction = 'cos';

export default class SketchMathFunctionFactory implements SketchComponentFactory<SketchMathFunctionComponent> {

    private static DEFAULT_FUNCTION_NAME : 'cos';

    fromJSON(rawJson: object): SketchMathFunctionComponent {
        const component = new SketchMathFunctionComponent();
        const json: SketchMathFunctionJSON = rawJson as SketchMathFunctionJSON;
        component.setFunctionName(json.functionName ?? DEFAULT_FUNCTION_NAME);
        return component;
    }


    toJSON(component: SketchMathFunctionComponent): object {
        const json: SketchMathFunctionJSON = {
            functionName: component.functionName ?? ''
        };

        return json;
    }
}
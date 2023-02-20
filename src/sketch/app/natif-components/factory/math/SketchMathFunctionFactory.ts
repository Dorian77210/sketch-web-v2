import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { MathStringFunction, SketchMathFunctionComponent } from "../../math/SketchMathFunctionComponent";

type SketchMathFunctionJSON = {
    functionName: MathStringFunction;
}

const DEFAULT_FUNCTION_NAME: MathStringFunction = 'cos';

export default class SketchMathFunctionFactory implements SketchComponentFactory<SketchMathFunctionComponent> {

    private static DEFAULT_FUNCTION_NAME : 'cos';

    fromJSON(rawJson: string): SketchMathFunctionComponent {
        const component = new SketchMathFunctionComponent();
        const json: SketchMathFunctionJSON = JSON.parse(rawJson);
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
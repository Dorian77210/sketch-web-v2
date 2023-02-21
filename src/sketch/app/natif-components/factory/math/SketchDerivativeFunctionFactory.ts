import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { SketchDerivativeFunctionComponent } from "../../math/SketchDerivativeFunctionComponent";

type SketchCustomFunctionJSON = {
    customFunction: string;
}

export default class SketchDerivativeFunctionFactory implements SketchComponentFactory<SketchDerivativeFunctionComponent> {
    
    fromJSON(rawJson: object): SketchDerivativeFunctionComponent {
        const component = new SketchDerivativeFunctionComponent();
        const json: SketchCustomFunctionJSON = rawJson as SketchCustomFunctionJSON;
        component.setCustomFunction(json.customFunction ?? '');
        return component;
    }
    toJSON(component: SketchDerivativeFunctionComponent): object {
        const json: SketchCustomFunctionJSON = {
            customFunction: component.customFunction ?? ''
        };

        return json;
    }
}
import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { SketchDerivativeFunctionComponent } from "../../math/SketchDerivativeFunctionComponent";

type SketchCustomFunctionJSON = {
    customFunction: string;
}

export default class SketchDerivativeFunctionFactory implements SketchComponentFactory<SketchDerivativeFunctionComponent> {
    
    fromJSON(rawJson: string): SketchDerivativeFunctionComponent {
        const component = new SketchDerivativeFunctionComponent();
        const json: SketchCustomFunctionJSON = JSON.parse(rawJson);
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
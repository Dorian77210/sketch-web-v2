import { Factory, SketchComponentFactory } from "konect-api-types-ts";

import { SketchCustomFunctionComponent } from "../../math/SketchCustomFunctionComponent";

type SketchCustomFunctionJSON = {
    customFunction: string;
}


@Factory(SketchCustomFunctionComponent)
export default class SketchCustomFunctionFactory implements SketchComponentFactory<SketchCustomFunctionComponent> {
    
    fromJSON(rawJson: object): SketchCustomFunctionComponent {
        const component = new SketchCustomFunctionComponent();
        const json: SketchCustomFunctionJSON = rawJson as SketchCustomFunctionJSON;
        component.setCustomFunction(json.customFunction ?? '');
        return component;
    }
    toJSON(component: SketchCustomFunctionComponent): object {
        const json: SketchCustomFunctionJSON = {
            customFunction: component.customFunction ?? ''
        };

        return json;
    }
}
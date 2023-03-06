/* eslint-disable @typescript-eslint/no-unused-vars */
import { Factory, SketchComponentFactory } from "konect-api-types-ts";

import { SketchDataframeUnionComponent } from "../../dataframe/SketchDataframeUnionComponent";

@Factory(SketchDataframeUnionComponent)
export default class SketchDataframeUnionFactory implements SketchComponentFactory<SketchDataframeUnionComponent> {
    
    fromJSON(json: object): SketchDataframeUnionComponent {
        return new SketchDataframeUnionComponent();
    }

    toJSON(component: SketchDataframeUnionComponent): object {
        return {};
    }
}
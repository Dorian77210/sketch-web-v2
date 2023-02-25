/* eslint-disable @typescript-eslint/no-unused-vars */
import { SketchComponentFactory } from "konect-api-types";

import { SketchDataframeUnionComponent } from "../../dataframe/SketchDataframeUnionComponent";

export default class SketchDataframeUnionFactory implements SketchComponentFactory<SketchDataframeUnionComponent> {
    
    fromJSON(json: object): SketchDataframeUnionComponent {
        return new SketchDataframeUnionComponent();
    }

    toJSON(component: SketchDataframeUnionComponent): object {
        return {};
    }
}
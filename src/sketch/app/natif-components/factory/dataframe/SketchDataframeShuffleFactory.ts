import { SketchComponentFactory } from "konect-api-types-ts";

import { SketchDataframeShuffleComponent } from "../../dataframe/SketchDataframeShuffleComponent";

export default class SketchDataframeShuffleFactory implements SketchComponentFactory<SketchDataframeShuffleComponent> {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fromJSON(json: object): SketchDataframeShuffleComponent {
        return new SketchDataframeShuffleComponent();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toJSON(component: SketchDataframeShuffleComponent): object {
        return {};
    }
}
import { SketchComponentFactory } from "konect-api-types";

import { SketchDataframeViewerComponent } from "../../dataframe/SketchDataframeViewerComponent";

export default class SketchDataframeViewerFactory implements SketchComponentFactory<SketchDataframeViewerComponent> {
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fromJSON(_json: object): SketchDataframeViewerComponent {
        return new SketchDataframeViewerComponent();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toJSON(_component: SketchDataframeViewerComponent): object {
        return { };
    }
}
import { Factory, SketchComponentFactory } from "konect-api-types-ts";

import { SketchDataframeViewerComponent } from "../../dataframe/SketchDataframeViewerComponent";

@Factory(SketchDataframeViewerComponent)
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
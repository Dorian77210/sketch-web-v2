import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { SketchDataframeViewerComponent } from "../../dataframe/SketchDataframeViewerComponent";

export default class SketchDataframeViewerFactory implements SketchComponentFactory<SketchDataframeViewerComponent> {
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fromJSON(_json: string): SketchDataframeViewerComponent {
        return new SketchDataframeViewerComponent();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toJSON(_component: SketchDataframeViewerComponent): object {
        return { };
    }
}
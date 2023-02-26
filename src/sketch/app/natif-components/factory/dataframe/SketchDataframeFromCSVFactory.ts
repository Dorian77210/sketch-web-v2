import { SketchComponentFactory } from "konect-api-types-ts";

import { SketchDataframeFromCSVComponent } from "../../dataframe/SketchDataframeFromCSVComponent";

export default class SketchDataframeFromCSVFactory implements SketchComponentFactory<SketchDataframeFromCSVComponent> {
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fromJSON(json: object): SketchDataframeFromCSVComponent {
        return new SketchDataframeFromCSVComponent();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toJSON(component: SketchDataframeFromCSVComponent): object {
        return {};
    }
    
}
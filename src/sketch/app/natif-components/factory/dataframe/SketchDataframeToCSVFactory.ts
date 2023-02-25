import { SketchComponentFactory } from "konect-api-types";

import { SketchDataframeToCSVComponent } from "../../dataframe/SketchDataframeToCSVComponent";

interface SketchDataframeToCSVJSON {
    filename: string;
}

export default class SketchDataframeToCSVFactory implements SketchComponentFactory<SketchDataframeToCSVComponent> {
    
    fromJSON(rawJson: object): SketchDataframeToCSVComponent {
        const component = new SketchDataframeToCSVComponent();
        const json = rawJson as SketchDataframeToCSVJSON;
        component.setFilename(json.filename ?? '');
        return component;
    }
    toJSON(component: SketchDataframeToCSVComponent): object {
        const json: SketchDataframeToCSVJSON = {
            filename: component.filename ?? ''
        };

        return json;
    }
}
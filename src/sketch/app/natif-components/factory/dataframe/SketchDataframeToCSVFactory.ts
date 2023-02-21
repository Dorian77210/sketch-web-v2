import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { SketchDataframeToCSVComponent } from "../../dataframe/SketchDataframeToCSVComponent";

export default class SketchDataframeToCSVFactory implements SketchComponentFactory<SketchDataframeToCSVComponent> {
    
    fromJSON(rawJson: object): SketchDataframeToCSVComponent {
        const component = new SketchDataframeToCSVComponent();
        return component;
    }
    toJSON(component: SketchDataframeToCSVComponent): object {

        throw new Error("Method not implemented.");
    }
    
}
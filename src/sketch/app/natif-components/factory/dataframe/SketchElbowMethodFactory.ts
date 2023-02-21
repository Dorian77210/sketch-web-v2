import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { SketchElbowMethodComponent } from "../../dataframe/SketchElbowMethodComponent";

type SketchElbowMethodJSON = {
    maxClusters: number;
}

export default class SketchElbowMethodFactory implements SketchComponentFactory<SketchElbowMethodComponent> {

    fromJSON(rawJson: string): SketchElbowMethodComponent {
        const component = new SketchElbowMethodComponent();
        const json: SketchElbowMethodJSON = JSON.parse(rawJson);
        component.setMaxClusters(json.maxClusters ?? 0);
        return component;
    }
    toJSON(component: SketchElbowMethodComponent): object {
        const json: SketchElbowMethodJSON = {
            maxClusters: component.maxClusters ?? 0
        };

        return json;
    }
}
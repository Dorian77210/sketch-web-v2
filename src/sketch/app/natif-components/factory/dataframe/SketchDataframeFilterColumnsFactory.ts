import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { SketchDataframeFilterColumnsComponent } from "../../dataframe/SketchDataframeFilterColumnsComponent";

interface SketchDataframeFilterColumnsJSON {
    selectedColumns: Array<string>;
}

export default class  SketchDataframeFilterColumnsFactory implements SketchComponentFactory<SketchDataframeFilterColumnsComponent> {
    
    fromJSON(rawJson: string): SketchDataframeFilterColumnsComponent {
        const component = new SketchDataframeFilterColumnsComponent();
        const json: SketchDataframeFilterColumnsJSON = JSON.parse(rawJson);
        component.setSelectedColumns(json.selectedColumns ?? []);
        return component;
    }
    toJSON(component: SketchDataframeFilterColumnsComponent): object {
        const json: SketchDataframeFilterColumnsJSON = {
            selectedColumns: component.selectedColumns
        };

        return json;
    }
}
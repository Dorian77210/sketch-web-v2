import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

import { SketchSequenceComponent } from "../../math/SketchSequenceComponent";

interface SketchSequenceJSON {
    begin: number;
    end: number;
    step: number;
}

export default class SketchSequenceFactory implements SketchComponentFactory<SketchSequenceComponent> {

    fromJSON(rawJson: string): SketchSequenceComponent {
        const component = new SketchSequenceComponent();
        const json: SketchSequenceJSON = JSON.parse(rawJson);
        component.getSequenceData().begin = json.begin ?? 0;
        component.getSequenceData().end = json.end ?? 0;
        component.getSequenceData().step = json.step ?? 0;
        return component;
    }
    
    toJSON(component: SketchSequenceComponent): object {
        const json: SketchSequenceJSON = {
            begin: component.getSequenceData().begin ?? 0,
            end: component.getSequenceData().end ?? 0,
            step: component.getSequenceData().step ?? 0
        };

        return json;
    }
}
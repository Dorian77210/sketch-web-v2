import { SketchNumberInputComponent } from "../SketchNumberInputComponent";

import SketchComponentFactory from "@/sketch/api/factory/SketchComponentFactory";

interface SketchNumberInputComponentJSON {
    value: number;
} 

export default class SketchNumberFactory implements SketchComponentFactory<SketchNumberInputComponent> {

    fromJSON(rawJson: string) : SketchNumberInputComponent {
        const component = new SketchNumberInputComponent();
        const inputComponentJSON: SketchNumberInputComponentJSON = JSON.parse(rawJson);
        component.setValue(inputComponentJSON.value ?? 0);
        return component;
    }

    toJSON(component: SketchNumberInputComponent) : object {
        let nbr = component.getValue();
        if (nbr === undefined) {
            nbr = 0;
        }

        const json: SketchNumberInputComponentJSON = {
            value: nbr
        };

        return json;
    }
}
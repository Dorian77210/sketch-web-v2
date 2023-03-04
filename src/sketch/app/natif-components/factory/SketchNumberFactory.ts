import SketchNumberInputComponent from "../SketchNumberInputComponent";

import { SketchComponentFactory } from "konect-api-types-ts";

interface SketchNumberInputComponentJSON {
    value: number;
} 

export default class SketchNumberFactory implements SketchComponentFactory<SketchNumberInputComponent> {

    fromJSON(rawJson: object) : SketchNumberInputComponent {
        const component = new SketchNumberInputComponent();
        const inputComponentJSON: SketchNumberInputComponentJSON = rawJson as SketchNumberInputComponentJSON;
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
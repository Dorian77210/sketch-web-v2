import { ComponentConfiguration } from "konect-api-types-ts";
import {SketchComponent} from "konect-api-types-ts";
import {SketchWrapper} from "konect-api-types-ts";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";

export class SketchNumberInputComponent extends SketchComponent<number> {

    private readonly inputWrapper: SketchWrapper<number>;

    constructor() {
        super();
        this.inputWrapper = new SketchWrapper<number>();
    }

    execute(): number {
        if (!this.inputWrapper.isDataAvailable()) {
            throw 'No input set in the component'
        }

        return this.inputWrapper.getData() as number;
    }

    copy(): SketchComponent<number> {
        const component: SketchNumberInputComponent = new SketchNumberInputComponent();
        if (this.inputWrapper.isDataAvailable()) {
            component.inputWrapper.setData(this.inputWrapper.getData());
        }

        return component;
    }

    setValue(value: number) {
        this.inputWrapper.setData(value);
    }

    getValue() : number | undefined {
        return this.inputWrapper.isDataAvailable() ? this.inputWrapper.getData() : undefined;
    }
}

export const configuration: ComponentConfiguration = {
    namespace: 'Inputs',
    name: 'Number input',
    returnType: Number,
    icon: {
        name: 'fa-keyboard',
        fa: faKeyboard
    },
    documentation: {
        description: 'This component will provide the user to enter a numeric value.',
        output: {
            name: 'Number input',
            description: 'This corresponds to the value entered in the popup.'
        }
    }
}
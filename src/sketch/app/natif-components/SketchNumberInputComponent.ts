import { ComponentConfiguration } from "@/sketch/api/component-configuration";
import SketchComponent from "@/sketch/api/sketch-component";
import SketchWrapper from "@/sketch/api/sketch-wrapper";
import SketchNumberInputPopup from "@/sketch/app/natif-components/ui/SketchNumberInputPopup.vue";

import { faKeyboard } from "@fortawesome/free-solid-svg-icons";

export class SketchNumberInputComponent extends SketchComponent<number> {

    private readonly inputWrapper: SketchWrapper<number>;

    constructor() {
        super();
        this.inputWrapper = new SketchWrapper<number>();
    }

    execute(): number {
        throw new Error("Method not implemented.");
    }
    copy(): SketchComponent<number> {
        const component: SketchNumberInputComponent = new SketchNumberInputComponent();
        if (this.inputWrapper.isDataAvailable()) {
            component.inputWrapper.setData(this.inputWrapper.getData());
        }

        return component;
    }
}

export const configuration: ComponentConfiguration = {
    namespace: 'inputs',
    name: 'Number input',
    popup: SketchNumberInputPopup,
    returnType: Number,
    icon: {
        name: 'fa-keyboard',
        fa: faKeyboard
    }
}
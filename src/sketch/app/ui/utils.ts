import { SketchComponent } from "konect-api-types";

export type ComponentUIConfiguration = {
    x: number;
    y: number;
    height: number;
    width: number
};

export type ComponentSlotModel = {
    type: 'in' | 'out';
    isSelected: boolean;
    targetComponent: SketchComponent<unknown>;
    entryName?: string;
}

export type ComponentModelConfig = {
    text: {
        value: string;
        color: string;
    },
    backgroundColor: string;
    iconColor: string;
}

export type ComponentModel = {
    component: SketchComponent<unknown>;
    x: number;
    y: number;
    config: ComponentModelConfig;
};
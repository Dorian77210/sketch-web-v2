import SketchComponent from "@/sketch/api/sketch-component";

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
import { SketchComponent } from "konect-api-types-ts";
import { ComponentModel, ComponentModelConfig } from "../ui/utils";

export interface ComponentSaveConfiguration {
    type: string;
    json: object;
    id: string;
    componentConfiguration: {
        x: number;
        y: number;
        style: ComponentModelConfig
    }
}

export interface ComponentLinkConfiguration {
    parent: string;
    child: string;
    entryName: string;
}

export type ComponentLink = {
    parent: SketchComponent<unknown>;
    child: SketchComponent<unknown>;
    entryName: string;
}
export interface SaveReconstitution {
    componentModels: Array<ComponentModel>;
    links: Array<ComponentLink>;
}

export const SAVE_EXTENSION = 'konect';

export default interface Save {
    components: Array<ComponentSaveConfiguration>;
    links: Array<ComponentLinkConfiguration>;
}
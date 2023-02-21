import { ComponentModelConfig } from "../ui/utils";

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

export default interface Save {
    components: Array<ComponentSaveConfiguration>;
    links: Array<ComponentLinkConfiguration>;
}
import { Class } from './types';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ComponentSlotConfiguration = {
    entryName: string;
    methodName: string;
    type: Class<unknown>;
    order?: number;
}

export type ComponentConfiguration = {
    name: string;
    namespace: string;
    slotsConfigurations?: Array<ComponentSlotConfiguration>;
    returnType?: Class<unknown>;
    icon: {
        name: string;
        fa: IconDefinition
    };
}
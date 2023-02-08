import { Class } from './types';
import { DefineComponent } from 'vue';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type ComponentSlotConfiguration = {
    name: string;
    methodName: string;
    type: Class<unknown>;
    order?: number;
}

export type ComponentConfiguration = {
    name: string;
    namespace: string;
    slotsConfiurations?: Array<ComponentSlotConfiguration>;
    popup: object;
    returnType: Class<unknown>;
    icon: {
        name: string;
        fa: IconDefinition
    };
}
import { Class } from './types';
import { Component } from 'vue';
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
    slotsConfigurations?: Array<ComponentSlotConfiguration>;
    popup: Component;
    returnType?: Class<unknown>;
    icon: {
        name: string;
        fa: IconDefinition
    };
}
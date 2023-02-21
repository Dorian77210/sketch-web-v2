import { Class } from './types';
import { Component } from 'vue';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import SketchComponentFactory from './factory/SketchComponentFactory';
import SketchComponent from './sketch-component';

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
    popup: Component;
    factory: Class<SketchComponentFactory<SketchComponent<unknown>>>;
    returnType?: Class<unknown>;
    icon: {
        name: string;
        fa: IconDefinition
    };
}
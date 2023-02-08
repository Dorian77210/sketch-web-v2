import { Class } from './types';

export type ComponentSlotConfiguration = {
    name: string;
    methodName: string;
    type: Class<unknown>;
    order?: number;
}

export type ComponentConfiguration = {
    name: string;
    namespace: string;
    slotsConfiurations: Array<ComponentSlotConfiguration>;
    popup: object; // type of defineComponent
}
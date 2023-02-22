import { ComponentConfiguration, ComponentSlotConfiguration } from "./component-configuration";
import SketchComponent from "./sketch-component";
import { Class } from "./types";

import { library } from "@fortawesome/fontawesome-svg-core";

export type SketchComponentConfigurations = Map<Class<SketchComponent<unknown>>, ComponentConfiguration>;

const configurations: SketchComponentConfigurations = new Map<Class<SketchComponent<unknown>>, ComponentConfiguration>();

import mapComponentWithConfiguration from "../app/natif-components";

export const registerConfigurations = () => {
    mapComponentWithConfiguration.forEach((config, componentClass) => {
        configurations.set(componentClass, config);
        library.add(config.icon.fa);
    });
}

export function getConfigurationOf(componentClass: Class<SketchComponent<unknown>>) : ComponentConfiguration
{
    return configurations.get(componentClass) as ComponentConfiguration;
}

export function getConfigurations() : SketchComponentConfigurations {
    return configurations;
}

export function getSlotByEntryName(entries: Array<ComponentSlotConfiguration>, entryName: string) : ComponentSlotConfiguration | undefined {
    const results = entries.filter(entry => entry.entryName === entryName);
    return results.length > 0 ? results[0] : undefined;
}

export function canCreateLinkBetween(sourceComponent: SketchComponent<unknown>,
    targetComponent: SketchComponent<unknown>,
    entryName: string) : boolean
{
    if (targetComponent === sourceComponent) {
        return false;
    }
    
    const sourceConfiguration: ComponentConfiguration = getConfigurationOf(sourceComponent.constructor as Class<SketchComponent<unknown>>);
    const targetConfiguration: ComponentConfiguration = getConfigurationOf(targetComponent.constructor as Class<SketchComponent<unknown>>);

    if (!targetConfiguration.slotsConfigurations) {
        return false;
    }

    if (!sourceConfiguration.returnType) {
        return false;
    }

    const targetSlot = getSlotByEntryName(targetConfiguration.slotsConfigurations, entryName);
    if ((targetSlot?.type !== sourceConfiguration.returnType)) {
        return false;
    }

    return true;
}
import { ComponentConfiguration, ComponentSlotConfiguration } from "./component-configuration";
import SketchComponent from "./sketch-component";
import { Class } from "./types";

import { library } from "@fortawesome/fontawesome-svg-core";

export type SketchComponentConfigurations = Map<Class<SketchComponent<unknown>>, ComponentConfiguration>;

const configurations: SketchComponentConfigurations = new Map<Class<SketchComponent<unknown>>, ComponentConfiguration>();

import { SketchNumberInputComponent, configuration as SketchNumberInputConfiguration } from "../app/natif-components/SketchNumberInputComponent";
import { SketchSequenceComponent, configuration as SketchSequenceConfiguration } from "../app/natif-components/math/SketchSequenceComponent";

export const registerConfigurations = () => {
    // Number input component
    configurations.set(SketchNumberInputComponent, SketchNumberInputConfiguration);
    library.add(SketchNumberInputConfiguration.icon.fa);

    // sequence component
    configurations.set(SketchSequenceComponent, SketchSequenceConfiguration);
    library.add(SketchSequenceConfiguration.icon.fa);
}

export function getConfigurationOf(componentClass: Class<SketchComponent<unknown>>) : ComponentConfiguration
{
    return configurations.get(componentClass) as ComponentConfiguration;
}

export function getConfigurations() : SketchComponentConfigurations {
    return configurations;
}

function getSlotByEntryName(entries: Array<ComponentSlotConfiguration>, entryName: string) : ComponentSlotConfiguration {
    return entries.filter(entry => entry.entryName === entryName)[0];
}

export function canCreateLinkBetween(sourceComponent: SketchComponent<unknown>,
    targetComponent: SketchComponent<unknown>,
    entryName: string) : boolean
{
    const sourceConfiguration: ComponentConfiguration = getConfigurationOf(sourceComponent.constructor as Class<SketchComponent<unknown>>);
    const targetConfiguration: ComponentConfiguration = getConfigurationOf(targetComponent.constructor as Class<SketchComponent<unknown>>);

    if (!targetConfiguration.slotsConfigurations) {
        return false;
    }

    if (!sourceConfiguration.returnType) {
        return false;
    }

    const targetSlot = getSlotByEntryName(targetConfiguration.slotsConfigurations, entryName);
    if (targetSlot.type !== sourceConfiguration.returnType) {
        return false;
    }

    return true;
}

import { ComponentConfiguration, ComponentSlotConfiguration, SketchComponent, GenericSketchComponentClass } from "konect-api-types-ts";

import { library } from "@fortawesome/fontawesome-svg-core";

export type SketchComponentConfigurations = Map<GenericSketchComponentClass, ComponentConfiguration>;

const configurations: SketchComponentConfigurations = new Map<GenericSketchComponentClass, ComponentConfiguration>();
const strToComponentClass = new Map<string, GenericSketchComponentClass>();

import { mapComponentWithConfiguration } from "../natif-components";

export const registerConfigurations = () => {
    mapComponentWithConfiguration.forEach((config, componentClass) => {
        configurations.set(componentClass, config);
        library.add(config.icon.fa);

        // we need this when we will load a save
        strToComponentClass.set(componentClass.name, componentClass);
    });
}

/**
 * Get the configuration of a component type
 * @param componentClass The component type
 * @returns The component configuration associated to the class.
 */
export function getConfigurationOf(componentClass: GenericSketchComponentClass) : ComponentConfiguration
{
    return configurations.get(componentClass) as ComponentConfiguration;
}

export function getDocumentationOf(componentClass: string) {
    const clazz = getSketchComponentClassByString(componentClass);
    if (!clazz) {
        return undefined;
    }
    
    const configuration = getConfigurationOf(clazz);
    return configuration.documentation;
}

/**
 * 
 * @returns All the registered configurations.
 */
export function getConfigurations() : SketchComponentConfigurations {
    return configurations;
}

/**
 * Get the component class associated to a string
 * @param componentClass The string which represents the component class
 * @returns The class found or undefined if it doesn't exist
 */
export function getSketchComponentClassByString(componentClass: string) : GenericSketchComponentClass | undefined {
    return strToComponentClass.get(componentClass);
}

/**
 * Get a component slot configuration by the entry name
 * @param entries 
 * @param entryName 
 * @returns 
 */
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
    
    const sourceConfiguration: ComponentConfiguration = getConfigurationOf(sourceComponent.constructor as GenericSketchComponentClass);
    const targetConfiguration: ComponentConfiguration = getConfigurationOf(targetComponent.constructor as GenericSketchComponentClass);

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
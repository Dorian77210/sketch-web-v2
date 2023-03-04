import { ComponentConfiguration as _ComponentConfiguration, ComponentEntry, SketchComponent, GenericSketchComponentClass, ComponentDocumentation } from "konect-api-types-ts";

import { library } from "@fortawesome/fontawesome-svg-core";

import natifComponents from '../natif-components';

export type ComponentConfiguration = {
    documentation?: ComponentDocumentation;
    config: _ComponentConfiguration;
    entries?: Array<ComponentEntry>;
}

export type SketchComponentConfigurations = Map<GenericSketchComponentClass, ComponentConfiguration>;

const configurations: SketchComponentConfigurations = new Map<GenericSketchComponentClass, ComponentConfiguration>();
const strToComponentClass = new Map<string, GenericSketchComponentClass>();


export const registerConfigurations = () => {
    // Register natif component
    natifComponents.forEach(componentClass => {
        // get configuration of the component
        if (Reflect.hasMetadata('configuration', componentClass)) {
            const config: _ComponentConfiguration = Reflect.getMetadata('configuration', componentClass);
            library.add(config.icon.fa);

            const documentation: ComponentDocumentation | undefined = Reflect.getMetadata('documentation', componentClass);

            const dummyInstance = new componentClass();

            // find entry configuration
            const entries = Array<ComponentEntry>();

            const methodNames = Reflect.getMetadataKeys(dummyInstance);
            methodNames.forEach(methodName => {
                const entryConfiguration: ComponentEntry = Reflect.getMetadata(methodName, dummyInstance);
                entryConfiguration.methodName = methodName;
                entries.push(entryConfiguration);
            })

            // register now the config

            const componentConfiguration = {
                documentation,
                config,
                entries
            }

            configurations.set(componentClass, componentConfiguration);
        }
    });
}

/**
 * Get the configuration of a component type
 * @param componentClass The component type
 * @returns The component configuration associated to the class.
 */
export function getConfigurationOf(componentClass: GenericSketchComponentClass) 
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
export function getSlotByEntryName(entries: Array<ComponentEntry>, entryName: string) : ComponentEntry | undefined {
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
    
    const sourceConfiguration = getConfigurationOf(sourceComponent.constructor as GenericSketchComponentClass);
    const targetConfiguration = getConfigurationOf(targetComponent.constructor as GenericSketchComponentClass);

    if (!targetConfiguration.entries) {
        return false;
    }

    if (!sourceConfiguration.config.returnType) {
        return false;
    }

    const targetSlot = getSlotByEntryName(targetConfiguration.entries, entryName);
    if ((targetSlot?.type !== sourceConfiguration.config.returnType)) {
        return false;
    }

    return true;
}
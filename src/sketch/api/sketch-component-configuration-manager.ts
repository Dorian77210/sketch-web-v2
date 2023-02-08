import { ComponentConfiguration } from "./component-configuration";
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


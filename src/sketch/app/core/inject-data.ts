import { getConfigurationOf, getSlotByEntryName } from "@/sketch/app/core/sketch-component-configuration-manager";
import { GenericSketchComponentClass, SketchComponent } from "konect-api-types-ts";

export default function injectData(component: SketchComponent<unknown>, entryName: string, parentResult: any) : boolean {
    const configuration = getConfigurationOf(component.constructor as GenericSketchComponentClass);
    if (!configuration.slotsConfigurations) {
        return false;
    }
    
    const slotConfiguration = getSlotByEntryName(configuration.slotsConfigurations, entryName);
    if (!slotConfiguration) {
        return false;
    }

    (component as any)[slotConfiguration.methodName](parentResult);
    return true;
}
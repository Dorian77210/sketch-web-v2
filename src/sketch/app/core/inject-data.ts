import { getConfigurationOf, getSlotByEntryName } from "@/sketch/app/core/sketch-component-configuration-manager";
import { GenericSketchComponentClass, SketchComponent } from "konect-api-types-ts";

export default function injectData(component: SketchComponent<unknown>, entryName: string, parentResult: unknown) : boolean {
    const configuration = getConfigurationOf(component.constructor as GenericSketchComponentClass);
    if (!configuration.entries) {
        return false;
    }
    
    const slotConfiguration = getSlotByEntryName(configuration.entries, entryName);
    if (!slotConfiguration) {
        return false;
    }

    (component as any)[slotConfiguration.methodName](parentResult);
    return true;
}
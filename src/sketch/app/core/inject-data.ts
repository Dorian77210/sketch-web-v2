import { getConfigurationOf, getSlotByEntryName } from "@/sketch/api/sketch-component-configuration-manager";
import { Class } from "../../api/types";
import SketchComponent from "../../api/sketch-component";

export default function injectData(component: SketchComponent<unknown>, entryName: string, parentResult: any) : boolean {
    const configuration = getConfigurationOf(component.constructor as Class<SketchComponent<unknown>>);
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
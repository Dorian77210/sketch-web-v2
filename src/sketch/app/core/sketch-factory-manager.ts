import { GenericSketchComponentClass } from "@/sketch/api/types";

import { mapComponentWithFactory } from "../natif-components";

export default function getFactoryFor(componentClass: GenericSketchComponentClass) {
    return mapComponentWithFactory.get(componentClass);
}
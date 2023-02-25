import { mapComponentWithPopup } from "../natif-components";

import { GenericSketchComponentClass } from "konect-api-types";

export default function getPopupByComponentClass(componentClass: GenericSketchComponentClass) {
    return mapComponentWithPopup.get(componentClass);
}
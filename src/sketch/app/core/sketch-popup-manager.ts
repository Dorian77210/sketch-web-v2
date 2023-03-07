import { mapComponentWithPopup } from "../natif-components";
import { GenericSketchComponentClass } from "konect-api-types-ts";
import { Component } from "vue";

import { plugin as MatricesPlugin } from 'konect-matrices' ;

const map: Map<GenericSketchComponentClass, Component> = new Map();
let init = false;

export default function getPopupByComponentClass(componentClass: GenericSketchComponentClass) {
    if (!init) {
        initPlugins();
    }

    return map.get(componentClass);
}

function initPlugins() {
    mapComponentWithPopup.forEach((popup, componentClass) => map.set(componentClass, popup));
    MatricesPlugin.popup.forEach((popup, componentClass) => map.set(componentClass, popup));

    init = true;
}
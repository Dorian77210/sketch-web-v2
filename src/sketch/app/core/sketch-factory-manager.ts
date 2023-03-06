import { GenericSketchComponentClass, SketchComponent, SketchComponentFactory } from "konect-api-types-ts";

import { factories } from "../natif-components";

const factoriesCache = new Map<GenericSketchComponentClass, SketchComponentFactory<SketchComponent<unknown>>>();

export default function getFactoryFor(componentClass: GenericSketchComponentClass) {
    let currentFactory = factoriesCache.get(componentClass);

    if (currentFactory === undefined) {
        // find the corresponding factory
        const factoryClass = factories.filter(clazz => {
            const currentComponentClass = Reflect.getMetadata('factory-for', clazz);
            return currentComponentClass === componentClass;
        })[0];

        currentFactory = new factoryClass();
        factoriesCache.set(componentClass, currentFactory);
    }

    return currentFactory;
}
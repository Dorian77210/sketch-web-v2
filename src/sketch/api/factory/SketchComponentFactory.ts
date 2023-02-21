import SketchComponent from "../sketch-component";

/**
 * @author Dorian TERBAH
 * 
 * This interface will permit to define factory to serialize and deserialize
 * component from JSON data.
 * 
 * @version 1.0
 */

export default interface SketchComponentFactory<U extends SketchComponent<unknown>> {
    fromJSON(json: object): U;
    toJSON(component: U) : object;
}
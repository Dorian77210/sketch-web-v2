import { Component, Entry, SketchComponent } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import { SketchWrapper } from "konect-api-types-ts";
import { faTable } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will display a dataframe in a table
 * 
 * @since 1.0
 */

@Component({
    namespace: 'Dataframe',
    name: 'Dataframe viewer',
    icon: {
        name: 'fa-table',
        fa: faTable
    }
})
export class SketchDataframeViewerComponent extends SketchComponent<void> {
    
    private _wrapper: SketchWrapper<DataFrame>;

    constructor() {
        super();
        this._wrapper = new SketchWrapper();
    }

    execute(): void {
        throw new Error("Method not implemented.");
    }
    copy(): SketchComponent<void> {
        throw new Error("Method not implemented.");
    }

    get wrapper(): SketchWrapper<DataFrame> { return this._wrapper; }

    @Entry("dataframe", DataFrame)
    setData(data: DataFrame): void {
        this._wrapper.setData(data);
    }
}
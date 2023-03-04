import { Component, Entry, SketchComponent } from "konect-api-types-ts";
import { SketchWrapper } from "konect-api-types-ts";
import DataFrame from "dataframe-js";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

/**
 * 
 * @author Dorian TERBAH
 * 
 * This component will shuffle a dataframe
 * 
 * @since 1.0
 */

@Component({
    namespace : 'Dataframe',
    name: 'Dataframe Shuffler',
    returnType: DataFrame,
    icon: {
        name: 'fa-shuffle',
        fa: faShuffle
    }
})
export class SketchDataframeShuffleComponent extends SketchComponent<DataFrame> {

    private _wrapper: SketchWrapper<DataFrame>;

    constructor() {
        super();
        this._wrapper = new SketchWrapper();
    }

    get wrapper(): SketchWrapper<DataFrame> { return this._wrapper; }

    execute(): DataFrame {
        if (!this.wrapper.isDataAvailable()) {
            throw 'No data available for shuffling';
        }

        const dataframe = this.wrapper.getData() as DataFrame;

        return dataframe.shuffle();
    }

    copy(): SketchComponent<DataFrame> {
        throw new Error("Method not implemented.");
    }
    
    @Entry("dataframe", DataFrame)
    setData(data: DataFrame) {
        this.wrapper.setData(data);
    }
}

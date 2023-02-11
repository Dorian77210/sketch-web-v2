export default class SequenceData {

    private _step: number;

    private _begin: number;

    private _end: number;

    constructor() {
        this._step = 0;
        this._begin = 0;
        this._end = 0;
    }

    get step() : number { return this._step; }
    set step(step: number) { this._step = step; }

    get begin() : number { return this._begin; }
    set begin(begin: number) { this._begin = begin; }

    get end() : number { return this._end; }
    set end(end: number) { this._end = end; }

    public isValidStep() : boolean {
        return this.begin > this.end ? this.step < 0.0 : this.step > 0.0
    }
}
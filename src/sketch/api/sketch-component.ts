import { v4 as uuidv4 } from 'uuid';

/**
 * @author Dorian TERBAH
 * 
 * This class defines all the methods that must be implemented by
 * the different components.
 * 
 * @since 1.0
 */
export default abstract class SketchComponent<T>
{
    private __uuid: string;

    /**
     * Variable used to know if the component has to be executed again
     */
    private _isDirty: boolean;

    constructor()
    {
        this.__uuid = uuidv4();
        this._isDirty = false;
    }

    get isDirty(): boolean { return this._isDirty; }
    set isDirty(value: boolean) { this._isDirty = value;}
    setIsDirty(value: boolean) { this._isDirty = value;}

    /**
     * @returns The internal id of the component.
     */
    public getID(): string
    {
        return this.__uuid;
    }

    /**
     * Execute the component.
     * @return The computed result of the component.
     */
    abstract execute(): T;

    async beforeExecute()  {
        // to implement if you want to make any async calls before the execute call
    }

    /**
     * @return A copy of the component.
     */
    abstract copy(): SketchComponent<T>;
}
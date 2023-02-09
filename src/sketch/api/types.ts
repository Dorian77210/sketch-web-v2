export type Class<T> = { new(...args: any[]): T; };
export function opt<T>(): T | undefined {
    return undefined as T | undefined;
}
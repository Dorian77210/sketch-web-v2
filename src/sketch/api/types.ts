export type Class<T> = { new(...args: any[]): T; };
export function opt<T>() {
    return undefined as T | undefined;
}
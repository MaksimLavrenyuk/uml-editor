import ComponentType from '../ComponentType';

export interface ComponentI {
    readonly componentType: ComponentType;
    readonly name: string;
}

export abstract class Component implements ComponentI {
    public abstract readonly componentType: ComponentType;

    public readonly name: string;

    protected constructor(name: string) {
        this.name = name;
    }
}

import { ElementType } from './ElementType';

export interface Element {
    name: string;
    type: ElementType,
}

export abstract class AbstractElement implements Element {
    public readonly abstract type: ElementType;
    public readonly name: string;

    protected constructor(name: string) {
        this.name = name
    }

}

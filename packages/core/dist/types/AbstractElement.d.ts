import { ElementType } from './ElementType';
export interface Element {
    name: string;
    type: ElementType;
}
export declare abstract class AbstractElement implements Element {
    abstract readonly type: ElementType;
    readonly name: string;
    protected constructor(name: string);
}

import { ElementType } from '../types/ElementType';
import { AbstractElement } from '../types/AbstractElement';
export declare class TypeParameter extends AbstractElement {
    readonly type = ElementType.parameter;
    constraint?: string;
}

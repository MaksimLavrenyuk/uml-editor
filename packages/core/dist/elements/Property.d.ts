import { ElementType } from '../types/ElementType';
import { AbstractElement } from '../types/AbstractElement';
import { Modifier } from '../types/Modifier';
export declare class Property extends AbstractElement {
    readonly type = ElementType.property;
    modifier: Modifier;
    returnType: string;
    isAbstract: boolean;
    isOptional: boolean;
    isStatic: boolean;
}

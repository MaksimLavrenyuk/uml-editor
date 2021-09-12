import { AbstractElement, Element } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
import { Modifier } from '../types/Modifier';
export declare class Method extends AbstractElement {
    type: ElementType;
    parameters: Element[];
    returnType: string;
    modifier: Modifier;
    isAbstract: boolean;
    isOptional: boolean;
    isStatic: boolean;
}

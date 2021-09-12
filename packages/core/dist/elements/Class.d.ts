import { AbstractElement, Element } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
/**
 * Describes the metadata for the class.
 */
export declare class Class extends AbstractElement {
    readonly type = ElementType.class;
    isAbstract: boolean;
    isStatic: boolean;
    members: Element[];
    extends?: string;
    implements: string[];
    parameters: Element[];
}

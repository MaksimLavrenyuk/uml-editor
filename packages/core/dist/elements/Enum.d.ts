import { ElementType } from '../types/ElementType';
import { AbstractElement, Element } from '../types/AbstractElement';
/**
 * Describes the metadata for the enum.
 */
export declare class Enum extends AbstractElement {
    readonly type = ElementType.enum;
    values: Element[];
}

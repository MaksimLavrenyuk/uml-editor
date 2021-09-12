import { AbstractElement } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
/**
 * Describes the metadata for the value or enumeration.
 */
export declare class EnumValue extends AbstractElement {
    type: ElementType;
    value?: string;
}

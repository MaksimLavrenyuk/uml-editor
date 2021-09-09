import { AbstractElement } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';

/**
 * Describes the metadata for the value or enumeration
 */
export class EnumValue extends AbstractElement {
    public type = ElementType.property;

    public value?: string;
}

import { ElementType } from '../types/ElementType';
import { AbstractElement, Element } from '../types/AbstractElement';

/**
 * Describes the metadata for the enum
 */
export class Enum extends AbstractElement {
    public readonly type = ElementType.enum;

    public values: Element[] = [];
}

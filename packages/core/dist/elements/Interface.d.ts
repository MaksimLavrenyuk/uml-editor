import { AbstractElement, Element } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
/**
 * Describes the metadata for the interface.
 */
export declare class Interface extends AbstractElement {
    type: ElementType;
    members: Element[];
    extends: string[];
    parameters: Element[];
}

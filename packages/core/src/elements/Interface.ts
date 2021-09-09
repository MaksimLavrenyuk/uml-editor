import { AbstractElement, Element } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';

/**
 * Describes the metadata for the interface
 */
export class Interface extends AbstractElement {
    public type = ElementType.interface;

    public members: Element[] = [];

    public extends: string[] = [];

    public parameters: Element[] = [];
}

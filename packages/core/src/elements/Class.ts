import { AbstractElement, Element } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';

/**
 * Describes the metadata for the class.
 */
export class Class extends AbstractElement {
    public readonly type = ElementType.class;

    public isAbstract = false;

    public isStatic = false;

    public members: Element[] = [];

    public extends?: string;

    public implements: string[] = [];

    public parameters: Element[] = [];
}

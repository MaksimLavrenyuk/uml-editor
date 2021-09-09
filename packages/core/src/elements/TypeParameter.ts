import { ElementType } from '../types/ElementType';
import { AbstractElement } from '../types/AbstractElement';

export class TypeParameter extends AbstractElement {
    public readonly type = ElementType.parameter;

    public constraint?: string;
}

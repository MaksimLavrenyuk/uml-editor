import { AbstractElement, Element } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
import { Modifier } from '../types/Modifier';

export class Method extends AbstractElement {
    public type = ElementType.method;

    public parameters: Element[] = [];

    public returnType = 'any';

    public modifier: Modifier = 'public';

    public isAbstract = false;

    public isOptional = false;

    public isStatic = false;
}

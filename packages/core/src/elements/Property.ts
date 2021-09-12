import { ElementType } from '../types/ElementType';
import { AbstractElement } from '../types/AbstractElement';
import { Modifier } from '../types/Modifier';

export class Property extends AbstractElement {
    public readonly type = ElementType.property;

    public modifier: Modifier = 'public';

    public returnType = 'any';

    public isAbstract = false;

    public isOptional = false;

    public isStatic = false;
}

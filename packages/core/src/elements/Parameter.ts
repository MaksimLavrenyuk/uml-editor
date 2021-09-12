import { AbstractElement } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';

export class Parameter extends AbstractElement {
    public readonly type = ElementType.parameter;

    public hasInitializer = false;

    public isOptional = false;

    public parameterType = 'any';
}

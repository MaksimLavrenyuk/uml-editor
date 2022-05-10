import { Component } from './Component';
import ComponentType from '../ComponentType';
import { Modifier } from '../Modifier';

export class Property extends Component {
    public readonly componentType: ComponentType = ComponentType.PROPERTY;

    public modifier: Modifier = 'public';

    public returnType = 'any';

    public isAbstract = false;

    public isOptional = false;

    public isStatic = false;
}

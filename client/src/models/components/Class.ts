import { Component, ComponentI } from './Component';
import ComponentType from '../ComponentType';

export default class Class extends Component {
    public readonly componentType: ComponentType = ComponentType.CLASS;

    public extends: string | undefined;

    public members: ComponentI[] = [];

    constructor(name: string, extend?: string) {
        super(name);

        this.extends = extend;
    }
}

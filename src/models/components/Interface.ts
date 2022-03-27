import { Component, ComponentI } from './Component';
import ComponentType from '../ComponentType';

export default class Interface extends Component implements ComponentI {
    public readonly componentType: ComponentType = ComponentType.INTERFACE;

    public extends: string | undefined;

    public members: ComponentI[] = [];

    constructor(name: string, extend?: string) {
        super(name);

        this.extends = extend;
    }
}

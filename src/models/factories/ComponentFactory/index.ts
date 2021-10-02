import { Class } from '../../components/Class';
import { ComponentI } from '../../components/Component';

export default class ComponentFactory {
    createClass(name: string, extend?: string): ComponentI {
        return new Class(name, extend);
    }
}

import Class from '../../components/Class';
import { ComponentI } from '../../components/Component';
import Interface from '../../components/Interface';

export default class ComponentFactory {
    createClass(name: string, extend?: string): ComponentI {
        return new Class(name, extend);
    }

    createInterface(name: string, extend?: string): ComponentI {
        return new Interface(name, extend);
    }
}

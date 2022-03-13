import Class from '../../components/Class';
import { ComponentI } from '../../components/Component';
import Interface from '../../components/Interface';
import { Property } from '../../components/Property';
import { Modifier } from '../../Modifier';

export default class ComponentFactory {
    createClass(name: string, extend?: string, members?: ComponentI[]): ComponentI {
        const classComponent = new Class(name, extend);

        if (members) {
            classComponent.members = members;
        }

        return classComponent;
    }

    createInterface(name: string, extend?: string): ComponentI {
        return new Interface(name, extend);
    }

    createProperty(prop: {
        name: string,
        modifier: Modifier,
        returnType: string,
        isAbstract: boolean,
        isOptional: boolean,
        isStatic: boolean,
    }) {
        const property = new Property(prop.name);
        property.returnType = prop.returnType;

        return property;
    }
}

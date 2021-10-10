import { ComponentI } from '../../models/components/Component';
import ComponentType from '../../models/ComponentType';
import Class from '../../models/components/Class';
import isType from '../../utils/guards/isType';
import Interface from '../../models/components/Interface';

class Formatter {
    private static serializeExtends(extendName: string | undefined) {
        return extendName ? ` extends ${extendName} ` : ' ';
    }

    private static serializeClass(component: Class) {
        const extend = Formatter.serializeExtends(component.extends);

        return `
            class ${component.name}${extend}{}
        `.trim();
    }

    private static serializeInterface(component: Interface) {
        const extend = Formatter.serializeExtends(component.extends);

        return `
            interface ${component.name}${extend}{}
        `.trim();
    }

    serialize(component: ComponentI) {
        switch (component.componentType) {
        case ComponentType.CLASS:
            if (isType<Class>(component, 'componentType')) return Formatter.serializeClass(component);
            break;
        case ComponentType.INTERFACE:
            if (isType<Interface>(component, 'componentType')) return Formatter.serializeInterface(component);
            break;
        default:
            return '';
        }

        return '';
    }
}

export default Formatter;

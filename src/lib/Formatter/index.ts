import { ComponentI } from '../../models/components/Component';
import ComponentType from '../../models/ComponentType';
import { Class } from '../../models/components/Class';
import isType from '../../utils/guards/isType';

class Formatter {
    private static serializeClass(component: Class) {
        const extend = component.extends ? ` extend ${component.extends} ` : ' ';

        return `
            class ${component.name}${extend}{}
        `.trim();
    }

    serialize(component: ComponentI) {
        switch (component.componentType) {
        case ComponentType.CLASS:
            if (isType<Class>(component, 'componentType')) return Formatter.serializeClass(component);
            break;
        default:
            return '';
        }

        return '';
    }
}

export default Formatter;

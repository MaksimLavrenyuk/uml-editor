import { ComponentI } from '../../models/components/Component';
import ComponentType from '../../models/ComponentType';
import Class from '../../models/components/Class';
import isType from '../guards/isType';
import Interface from '../../models/components/Interface';
import { Formatter } from '../../models/Formatter';

class FormatterDiagram implements Formatter {
    private static serializeExtends(extendName: string | undefined) {
        return extendName ? ` extends ${extendName} ` : ' ';
    }

    private static serializeClass(component: Class) {
        const extend = FormatterDiagram.serializeExtends(component.extends);

        return `
            class ${component.name}${extend}{}
        `.trim();
    }

    private static serializeInterface(component: Interface) {
        const extend = FormatterDiagram.serializeExtends(component.extends);

        return `
            interface ${component.name}${extend}{}
        `.trim();
    }

    private static serializeCollection(components: ComponentI[]) {
        let result = '';

        components.forEach((component) => {
            result += `${FormatterDiagram.serializeComponent(component)}\n`;
        });

        return result;
    }

    private static serializeComponent(component: ComponentI) {
        switch (component.componentType) {
        case ComponentType.CLASS:
            if (isType<Class>(component, 'componentType')) return FormatterDiagram.serializeClass(component);
            break;
        case ComponentType.INTERFACE:
            if (isType<Interface>(component, 'componentType')) return FormatterDiagram.serializeInterface(component);
            break;
        default:
            return '';
        }

        return '';
    }

    serialize(components: ComponentI | ComponentI[]) {
        if (Array.isArray(components)) {
            return FormatterDiagram.serializeCollection(components);
        }

        return FormatterDiagram.serializeComponent(components);
    }
}

export default FormatterDiagram;

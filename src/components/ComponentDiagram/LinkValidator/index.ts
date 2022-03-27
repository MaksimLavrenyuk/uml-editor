import { INode } from '../elements/Nodes/NodeBasic';
import TypeChecker from '../../../utils/TypeChecker';
import FormatterDiagram from '../../../utils/Formatter';
import Class from '../../../models/components/Class';
import Interface from '../../../models/components/Interface';
import { ComponentI } from '../../../models/components/Component';
import { Property } from '../../../models/components/Property';
import PropertyBasic from '../elements/Properties/Property';

export interface ILinkValidator {
    isValidConnectComponents(fromComponent: ComponentI, toComponent: ComponentI): boolean
}

export default class LinkValidator implements ILinkValidator {
    private typeChecker: TypeChecker;

    private formatter: FormatterDiagram;

    constructor() {
        this.typeChecker = new TypeChecker();
        this.formatter = new FormatterDiagram();
    }

    /**
     * Update the extending of existing components
     * @param fromExtends
     * @param toExtends
     * @param components
     */
    updateComponents(fromExtends: INode, toExtends: INode, components: ComponentI[]) {
        const fromContent = fromExtends.content();
        const targetContent = toExtends.content();

        return components.map((component) => {
            if (targetContent?.name === component.name) {
                if (component instanceof Class || component instanceof Interface) {
                    if (fromContent instanceof Class || fromContent instanceof Interface) {
                        return {
                            ...component,
                            extends: fromContent.name,
                        };
                    }
                }
            }

            return component;
        });
    }

    /**
     * Checking the correctness of inheritance.
     *
     * @param fromExtends - Source extensions.
     * @param toExtends - Target extensions.
     *
     * @description
     * Tries to match input data, set inheritance, check it with type checker.
     * Based on the checks, it returns a boolean value.
     *
     * @example
     * this.isValidLink(
     *    new Node({
     *       type: ComponentType.CLASS,
     *       name: 'test_1',
     *     }),
     *     new Node({
     *         type: ComponentType.CLASS,
     *         name: 'test_2',
     *     })
     * )
     * =>
     * class test_1 {}
     * class test_2 extends test_1 {}
     * => true.
     */
    isValidConnectComponents(fromComponent: ComponentI, toComponent: ComponentI) {
        const isClassFromComponent = fromComponent instanceof Class;
        const isInterfaceFromComponent = fromComponent instanceof Interface;
        const isClassToComponent = toComponent instanceof Class;
        const isInterfaceToComponent = toComponent instanceof Interface;
        let resultStr = '';

        if (isClassFromComponent || isInterfaceFromComponent) {
            if (fromComponent.extends) return false;

            if (isClassToComponent || isInterfaceToComponent) {
                // eslint-disable-next-line no-param-reassign
                fromComponent.extends = toComponent.name;
            }
        }

        if (fromComponent) {
            resultStr += this.formatter.serialize(toComponent);
        }

        if (fromComponent) {
            resultStr += this.formatter.serialize(fromComponent);
        }

        return this.typeChecker.check(resultStr).length === 0;
    }

    isValidConnectNodeProperty(property: Property, fromComponent: ComponentI, toComponent:ComponentI) {
        let resultStr = '';

        if (fromComponent instanceof Class) {
            const existingProperty = fromComponent.members.find((prop) => prop.name === property.name);

            if (existingProperty && existingProperty instanceof Property) {
                existingProperty.returnType = toComponent.name;

                resultStr = this.formatter.serialize([toComponent, fromComponent]);

                return this.typeChecker.check(resultStr).length === 0;
            }
        }

        return false;
    }
}

import { NodeI } from '../elements/Node/Node';
import TypeChecker from '../../../utils/TypeChecker';
import FormatterDiagram from '../../../utils/Formatter';
import Class from '../../../models/components/Class';
import Interface from '../../../models/components/Interface';
import { ComponentI } from '../../../models/components/Component';

export interface ILinkValidator {
    isValidLink(source: NodeI, target: NodeI, currentComponents: ComponentI[]): boolean
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
    updateComponents(fromExtends: NodeI, toExtends: NodeI, components: ComponentI[]) {
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
    isValidLink(fromExtends: NodeI, toExtends: NodeI) {
        const resultSource = fromExtends.content();
        const resultTarget = toExtends.content();
        let resultStr = '';

        if (resultSource instanceof Class) {
            if (resultTarget instanceof Class) {
                if (resultTarget.extends) return false;

                resultTarget.extends = resultSource.name;
            }
        }

        if (resultSource instanceof Interface) {
            if (resultTarget instanceof Interface) {
                if (resultTarget.extends) return false;

                resultTarget.extends = resultSource.name;
            }
        }

        if (resultSource) {
            resultStr += this.formatter.serialize(resultSource);
        }
        if (resultTarget) {
            resultStr += this.formatter.serialize(resultTarget);
        }

        return this.typeChecker.check(resultStr).length === 0;
    }
}

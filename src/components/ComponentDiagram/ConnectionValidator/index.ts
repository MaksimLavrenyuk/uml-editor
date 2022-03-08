import { NodeModel } from '@projectstorm/react-diagrams';
import { NodeI } from '../elements/Node/Node';
import TypeChecker from '../../../utils/TypeChecker';
import FormatterDiagram from '../../../utils/Formatter';
import Class from '../../../models/components/Class';
import Interface from '../../../models/components/Interface';

export interface IConnectionValidator {
    isValidLink(source: NodeModel, target: NodeModel): boolean
}

export default class ConnectionValidator implements IConnectionValidator {
    private typeChecker: TypeChecker;

    private formatter: FormatterDiagram;

    constructor() {
        this.typeChecker = new TypeChecker();
        this.formatter = new FormatterDiagram();
    }

    /**
     * Checking the correctness of inheritance.
     *
     * @param source - Source extensions.
     * @param target - Target extensions.
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
     *       factory: componentFactory,
     *       linkValidator,
     *     }),
     *     new Node({
     *         type: ComponentType.CLASS,
     *         name: 'test_2',
     *         factory: componentFactory,
     *         linkValidator,
     *     })
     * )
     * =>
     * class test_1 {}
     * class test_2 extends test_1 {}
     * => true.
     */
    isValidLink(source: NodeI, target: NodeI) {
        const resultSource = source.content();
        const resultTarget = target.content();
        let resultStr = '';

        if (resultSource instanceof Class) {
            if (resultTarget instanceof Class) {
                resultTarget.extends = resultSource.name;
            }
        }

        if (resultSource instanceof Interface) {
            if (resultTarget instanceof Interface) {
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

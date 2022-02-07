import { NodeModel } from '@projectstorm/react-diagrams';
import { Node } from '../elements/Node/Node';
import TypeChecker from '../../../lib/TypeChecker';
import FormatterDiagram from '../../../lib/Formatter';
import Class from '../../../models/components/Class';
import Interface from '../../../models/components/Interface';

export interface LinkValidatorI {
    isValidLink(source: NodeModel, target: NodeModel): boolean
}

export default class LinkValidator implements LinkValidatorI {
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
    isValidLink(source: Node, target: Node) {
        const sourceComponent = source.content();
        const targetComponent = target.content();
        let resultStr = '';

        if (sourceComponent instanceof Class) {
            if (targetComponent instanceof Class) {
                targetComponent.extends = sourceComponent.name;
            }
        }

        if (sourceComponent instanceof Interface) {
            if (targetComponent instanceof Interface) {
                targetComponent.extends = sourceComponent.name;
            }
        }

        if (sourceComponent) resultStr += this.formatter.serialize(sourceComponent);
        if (targetComponent) resultStr += this.formatter.serialize(targetComponent);

        return this.typeChecker.check(resultStr).length === 0;
    }
}

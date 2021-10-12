import { NodeModel } from '@projectstorm/react-diagrams';
import { Node } from './Node';
import TypeChecker from '../../../../lib/TypeChecker';
import Formatter from '../../../../lib/Formatter';

export interface LinkValidatorI {
    isValidLink(source: NodeModel, target: NodeModel): boolean
}

export default class LinkValidator implements LinkValidatorI {
    private typeChecker: TypeChecker;

    private formatter: Formatter;

    constructor() {
        this.typeChecker = new TypeChecker();
        this.formatter = new Formatter();
    }

    isValidLink(source: Node, target: Node) {
        const sourceComponent = source.content();
        const targetComponent = target.content();
        let resultStr = '';

        if (sourceComponent) resultStr += this.formatter.serialize(sourceComponent);
        if (targetComponent) resultStr += this.formatter.serialize(targetComponent);

        return this.typeChecker.check(resultStr).length === 0;
    }
}

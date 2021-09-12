import { AbstractElement } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
export class Method extends AbstractElement {
    constructor() {
        super(...arguments);
        this.type = ElementType.method;
        this.parameters = [];
        this.returnType = 'any';
        this.modifier = 'public';
        this.isAbstract = false;
        this.isOptional = false;
        this.isStatic = false;
    }
}
//# sourceMappingURL=Method.js.map
import { ElementType } from '../types/ElementType';
import { AbstractElement } from '../types/AbstractElement';
export class TypeParameter extends AbstractElement {
    constructor() {
        super(...arguments);
        this.type = ElementType.parameter;
    }
}
//# sourceMappingURL=TypeParameter.js.map
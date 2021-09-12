import { AbstractElement } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
export class Parameter extends AbstractElement {
    constructor() {
        super(...arguments);
        this.type = ElementType.parameter;
        this.hasInitializer = false;
        this.isOptional = false;
        this.parameterType = 'any';
    }
}
//# sourceMappingURL=Parameter.js.map
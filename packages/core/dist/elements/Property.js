import { ElementType } from '../types/ElementType';
import { AbstractElement } from '../types/AbstractElement';
export class Property extends AbstractElement {
    constructor() {
        super(...arguments);
        this.type = ElementType.property;
        this.modifier = 'public';
        this.returnType = 'any';
        this.isAbstract = false;
        this.isOptional = false;
        this.isStatic = false;
    }
}
//# sourceMappingURL=Property.js.map
import { AbstractElement } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
/**
 * Describes the metadata for the class.
 */
export class Class extends AbstractElement {
    constructor() {
        super(...arguments);
        this.type = ElementType.class;
        this.isAbstract = false;
        this.isStatic = false;
        this.members = [];
        this.implements = [];
        this.parameters = [];
    }
}
//# sourceMappingURL=Class.js.map
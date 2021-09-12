import { ElementType } from '../types/ElementType';
import { AbstractElement } from '../types/AbstractElement';
/**
 * Describes the metadata for the enum.
 */
export class Enum extends AbstractElement {
    constructor() {
        super(...arguments);
        this.type = ElementType.enum;
        this.values = [];
    }
}
//# sourceMappingURL=Enum.js.map
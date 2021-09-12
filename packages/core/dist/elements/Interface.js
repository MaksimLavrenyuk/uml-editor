import { AbstractElement } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
/**
 * Describes the metadata for the interface.
 */
export class Interface extends AbstractElement {
    constructor() {
        super(...arguments);
        this.type = ElementType.interface;
        this.members = [];
        this.extends = [];
        this.parameters = [];
    }
}
//# sourceMappingURL=Interface.js.map
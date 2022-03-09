import LinkValidator from '../index';
import { Node } from '../../elements/Node/Node';
import ComponentType from '../../../../models/ComponentType';

describe('Validation check of node links creation.', () => {
    const linkValidator = new LinkValidator();

    it('Expanding the class with a class.', () => {
        const test1 = new Node({ type: ComponentType.CLASS, name: 'test_1' });
        const test2 = new Node({ type: ComponentType.CLASS, name: 'test_2' });

        /**
         * class test_1 {}
         * class test_2 extends test_1 {}
         */
        expect(linkValidator.isValidLink(test1, test2)).toBeTruthy();
    });

    it('Extend the class with a class with the same name.', () => {
        const test1 = new Node({ type: ComponentType.CLASS, name: 'test_1' });
        const test2 = new Node({ type: ComponentType.CLASS, name: 'test_1' });

        /**
         * class test_1 {}
         * class test_1 extends test_1 {}
         */
        expect(linkValidator.isValidLink(test1, test2)).toBeFalsy();
    });

    it('We extend a class with a class extensible without a name.', () => {
        const node1 = new Node({ type: ComponentType.CLASS, name: '' });
        const node2 = new Node({ type: ComponentType.CLASS, name: 'test_1' });

        /**
         * class  {}
         * class test_1 {}
         */
        expect(linkValidator.isValidLink(node1, node2)).toBeFalsy();
    });

    it('Extend the class with a class, target without a name.', () => {
        const node1 = new Node({ type: ComponentType.CLASS, name: 'test_1' });
        const node2 = new Node({ type: ComponentType.CLASS, name: '' });

        /**
         * class test_1 {}
         * class  extends test_1 {}
         */
        expect(linkValidator.isValidLink(node1, node2)).toBeFalsy();
    });

    it('Extend the interface with a interface with the same name.', () => {
        const node1 = new Node({ type: ComponentType.INTERFACE, name: 'test_1' });
        const node2 = new Node({ type: ComponentType.INTERFACE, name: 'test_1' });

        /**
         * interface test_1 {}
         * interface test_1 extends test_1 {}
         */
        expect(linkValidator.isValidLink(node1, node2)).toBeFalsy();
    });

    it('We extend a interface with a interface extensible without a name.', () => {
        const node1 = new Node({ type: ComponentType.INTERFACE, name: '' });
        const node2 = new Node({ type: ComponentType.INTERFACE, name: 'test_1' });

        /**
         * interface  {}
         * interface test_1 {}
         */
        expect(linkValidator.isValidLink(node1, node2)).toBeFalsy();
    });

    it('Extend the interface with a interface, target without a name.', () => {
        const node1 = new Node({ type: ComponentType.INTERFACE, name: 'test_1' });
        const node2 = new Node({ type: ComponentType.INTERFACE, name: '' });

        /**
         * interface test_1 {}
         * interface  extends test_1 {}
         */
        expect(linkValidator.isValidLink(node1, node2)).toBeFalsy();
    });

    it('Expanding the interface with a interface.', () => {
        const node1 = new Node({ type: ComponentType.INTERFACE, name: 'test_1' });
        const node2 = new Node({ type: ComponentType.INTERFACE, name: 'test_2' });

        /**
         * interface test_1 {}
         * interface test_2 extends test_1 {}
         */
        expect(linkValidator.isValidLink(node1, node2)).toBeTruthy();
    });
});

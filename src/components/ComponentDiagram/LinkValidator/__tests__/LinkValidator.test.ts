import LinkValidator from '../index';
import NodeClass from '../../elements/Node/NodeClass';
import NodeInterface from '../../elements/Node/NodeInterface';
import { Property } from '../../../../models/components/Property';
import Class from '../../../../models/components/Class';

describe('Validation check of class-node links creation.', () => {
    const linkValidator = new LinkValidator();

    it('Expanding the class with a class.', () => {
        const node1 = new NodeClass({ name: 'Class1' });
        const node2 = new NodeClass({ name: 'Class2' });

        /**
         * current components
         *
         * class Class1 {}
         * class Class2 {}
         *
         * result components

         * class Class1 {}
         * class Class2 extends Class1 {}
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeTruthy();
    });

    it('Extend the class with a class with the same name.', () => {
        const node1 = new NodeClass({ name: 'Class1' });
        const node2 = new NodeClass({ name: 'Class1' });

        /**
         * current components
         *
         * class Class1 {}
         * class Class1 {}
         *
         * result components
         *
         * class Class1 {}
         * class Class1 extends Class1 {}
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeFalsy();
    });

    it('We extend a class with a class extensible without a name.', () => {
        const node1 = new NodeClass({ name: '' });
        const node2 = new NodeClass({ name: 'Class1' });

        /**
         * current components
         *
         * class {}
         * class Class1 {}
         *
         * result components
         *
         * class  {}
         * class Class1 {}
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeFalsy();
    });

    it('Extend the class with a class, target without a name.', () => {
        const node1 = new NodeClass({ name: 'Class1' });
        const node2 = new NodeClass({ name: '' });

        /**
         * current components
         *
         * class Class1 {}
         * class {}
         *
         * result components
         *
         * class Class1 {}
         * class  extends Class1 {}
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeFalsy();
    });

    it('re-extends class', () => {
        const node1 = new NodeClass({ name: 'Class1' });
        const node2 = new NodeClass({ name: 'Class2', extends: 'AnotherClass' });

        /**
         * current components
         *
         * class AnotherClass {}
         * class Class1 {}
         * class Class2 extends AnotherClass {}
         *
         * result components
         *
         * class AnotherClass {}
         * class Class1 {}
         * class Class2 extends Class1 {} // Class2 has already extended anotherClass
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeFalsy();
    });
});

describe('Validation check of interface-node links creation.', () => {
    const linkValidator = new LinkValidator();

    it('Extend the interface with a interface with the same name.', () => {
        const node1 = new NodeInterface({ name: 'Interface1' });
        const node2 = new NodeInterface({ name: 'Interface1' });

        /**
         * current components
         *
         * interface Interface1 {}
         * interface Interface1 {}
         *
         * result components
         *
         * interface Interface1 {}
         * interface Interface1 extends Interface1 {}
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeFalsy();
    });

    it('We extend a interface with a interface extensible without a name.', () => {
        const node1 = new NodeInterface({ name: '' });
        const node2 = new NodeInterface({ name: 'Interface1' });

        /**
         * current components
         * interface  {}
         * interface Interface1 {}
         *
         * result components
         * interface  {}
         * interface Interface1 {}
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeFalsy();
    });

    it('Extend the interface with a interface, target without a name.', () => {
        const node1 = new NodeInterface({ name: 'Interface1' });
        const node2 = new NodeInterface({ name: '' });

        /**
         * current components
         * interface Interface1  {}
         * interface  {}
         *
         * result components
         * interface Interface1 {}
         * interface {}
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeFalsy();
    });

    it('Expanding the interface with a interface.', () => {
        const node1 = new NodeInterface({ name: 'Interface1' });
        const node2 = new NodeInterface({ name: 'Interface2' });

        /**
         * current components
         * interface Interface1 {}
         * interface Interface2 {}
         *
         * result components
         * interface Interface1 {}
         * interface Interface2 extends Interface1 {}
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeTruthy();
    });

    it('re-extends interface', () => {
        const node1 = new NodeInterface({ name: 'Interface1' });
        const node2 = new NodeInterface({ name: 'Interface2', extends: 'AnotherInterface' });

        /**
         * current components
         *
         * interface AnotherInterface {}
         * interface Interface1 {}
         * interface Interface2 extends AnotherInterface {}
         *
         * result components
         *
         * interface AnotherInterface {}
         * interface Interface1 {}
         * interface Interface2 extends Interface1 {} // interface2 has already extended anotherInterface
         */
        expect(linkValidator.isValidConnectNodes(node1, node2)).toBeFalsy();
    });
});

describe('Validation of links of class properties with nodes.', () => {
    const linkValidator = new LinkValidator();

    test('Specifying the type of a class property - another class.', () => {
        const property = new Property('property');

        expect(
            linkValidator.isValidConnectNodeProperty(property.name, new Class('Class1'), new Class('Class2')),
        ).toBeTruthy();
    });

    test('Specifying the type of a class property - another class.', () => {
        const property = new Property('property');

        expect(
            linkValidator.isValidConnectNodeProperty(property.name, new Class('Class1'), new Class('Class2')),
        ).toBeTruthy();
    });

    test('pecifying the type of a class property is the same class.', () => {
        const property = new Property('property');
        const class1 = new Class('Class1');

        expect(
            linkValidator.isValidConnectNodeProperty(property.name, class1, class1),
        ).toBeTruthy();
    });
});

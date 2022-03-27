import LinkValidator from '../index';
import { Property } from '../../../../models/components/Property';
import Class from '../../../../models/components/Class';
import Interface from '../../../../models/components/Interface';

describe('Validation check of class-node links creation.', () => {
    const linkValidator = new LinkValidator();

    it('Expanding the class with a class.', () => {
        const class1 = new Class('Class1');
        const class2 = new Class('Class2');

        /**
         * current components
         *
         * class Class1 {}
         * class Class2 {}
         *
         * result components

         * class Class1 extends Class2 {}
         * class Class2 {}
         */
        expect(linkValidator.isValidConnectComponents(class1, class2)).toBeTruthy();
    });

    it('Extend the class with a class with the same name.', () => {
        const class1 = new Class('Class1');
        const class2 = new Class('Class1');

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
        expect(linkValidator.isValidConnectComponents(class1, class2)).toBeFalsy();
    });

    it('We extend a class with a class extensible without a name.', () => {
        const class1 = new Class('');
        const class2 = new Class('Class1');

        /**
         * current components
         *
         * class {}
         * class Class1 {}
         *
         * result components
         *
         * class  extends Class1 {}
         * class Class1 {}
         */
        expect(linkValidator.isValidConnectComponents(class1, class2)).toBeFalsy();
    });

    it('Extend the class with a class, target without a name.', () => {
        const class1 = new Class('Class1');
        const class2 = new Class('');

        /**
         * current components
         *
         * class Class1 {}
         * class {}
         *
         * result components
         *
         * class Class1 extends {}
         * class  {}
         */
        expect(linkValidator.isValidConnectComponents(class1, class2)).toBeFalsy();
    });

    it('re-extends class', () => {
        const class1 = new Class('Class1');
        const class2 = new Class('Class2');
        class1.extends = 'AnotherClass';

        /**
         * current components
         *
         * class AnotherClass {}
         * class Class1 extends AnotherClass {}
         * class Class2 {}
         *
         * result components
         *
         * class AnotherClass {}
         * class Class1 extends AnotherClass {}  Class1 has already extended anotherClass
         * class Class2 {}
         */
        expect(linkValidator.isValidConnectComponents(class1, class2)).toBeFalsy();
    });
});

describe('Validation check of interface-node links creation.', () => {
    const linkValidator = new LinkValidator();

    it('Extend the interface with a interface with the same name.', () => {
        const interface1 = new Interface('Interface1');
        const interface2 = new Interface('Interface1');

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
        expect(linkValidator.isValidConnectComponents(interface1, interface2)).toBeFalsy();
    });

    it('We extend a interface with a interface extensible without a name.', () => {
        const interface1 = new Interface('');
        const interface2 = new Interface('Interface1');

        /**
         * current components
         * interface  {}
         * interface Interface1 {}
         *
         * result components
         * interface  {}
         * interface Interface1 {}
         */
        expect(linkValidator.isValidConnectComponents(interface1, interface2)).toBeFalsy();
    });

    it('Extend the interface with a interface, target without a name.', () => {
        const interface1 = new Interface('Interface1');
        const interface2 = new Interface('');

        /**
         * current components
         * interface Interface1  {}
         * interface  {}
         *
         * result components
         * interface Interface1 {}
         * interface {}
         */
        expect(linkValidator.isValidConnectComponents(interface1, interface2)).toBeFalsy();
    });

    it('Expanding the interface with a interface.', () => {
        const interface1 = new Interface('Interface1');
        const interface2 = new Interface('Interface2');

        /**
         * current components
         * interface Interface1 {}
         * interface Interface2 {}
         *
         * result components
         * interface Interface1 {}
         * interface Interface2 extends Interface1 {}
         */
        expect(linkValidator.isValidConnectComponents(interface1, interface2)).toBeTruthy();
    });

    it('re-extends interface', () => {
        const interface1 = new Interface('Interface1');
        const interface2 = new Interface('Interface2');
        interface2.extends = 'AnotherInterface';
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
        expect(linkValidator.isValidConnectComponents(interface1, interface2)).toBeFalsy();
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

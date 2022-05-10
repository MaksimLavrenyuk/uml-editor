import ComponentFactory from '../../../models/factories/ComponentFactory';
import FormatterDiagram from '../index';
import ComponentType from '../../../models/ComponentType';
import { Modifier } from '../../../models/Modifier';

describe('Serialization component.', () => {
    const formatter = new FormatterDiagram();
    const factory = new ComponentFactory();

    it('Serialization empty Class component', () => {
        expect(formatter.serialize(factory.createClass('Test'))).toBe(
            'class Test {}',
        );
    });

    it('Serialization extends Class component', () => {
        expect(formatter.serialize(factory.createClass('Test', 'TestExtends'))).toBe(
            'class Test extends TestExtends {}',
        );
    });

    it('Serialization extends Class component with properties', () => {
        expect(formatter.serialize(factory.createClass(
            'Test',
            'TestExtends',
            [factory.createProperty({
                name: 'property',
                modifier: 'public',
                returnType: 'string',
                isAbstract: false,
                isOptional: false,
                isStatic: false,
            })],
        ))).toBe(
            'class Test extends TestExtends {'
            + '\n    public property: string;'
            + '\n}',
        );
    });

    it('Serialization Interface component', () => {
        expect(formatter.serialize(factory.createInterface('Test'))).toBe(
            'interface Test {}',
        );
        expect(formatter.serialize(factory.createInterface('Test', 'TestExtends'))).toBe(
            'interface Test extends TestExtends {}',
        );
    });

    it('Serialization of the invalid component', () => {
        expect(formatter.serialize(factory.createInterface('Test'))).toBe(
            'interface Test {}',
        );
        expect(formatter.serialize(factory.createInterface('Test', 'TestExtends'))).toBe(
            'interface Test extends TestExtends {}',
        );
    });
});

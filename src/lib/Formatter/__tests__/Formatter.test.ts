import ComponentFactory from '../../../models/factories/ComponentFactory';
import FormatterDiagram from '../index';

describe('Serialization component.', () => {
    const formatter = new FormatterDiagram();
    const factory = new ComponentFactory();

    it('Serialization Class component', () => {
        expect(formatter.serialize(factory.createClass('Test'))).toBe(
            'class Test {}',
        );
        expect(formatter.serialize(factory.createClass('Test', 'TestExtends'))).toBe(
            'class Test extends TestExtends {}',
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

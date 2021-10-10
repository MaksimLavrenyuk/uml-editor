import ComponentFactory from '../../../models/factories/ComponentFactory';
import Formatter from '../index';

describe('Serialization component.', () => {
    const formatter = new Formatter();
    const factory = new ComponentFactory();

    it('Serialization Class component', () => {
        expect(formatter.serialize(factory.createClass('Test'))).toBe(
            'class Test {}',
        );
        expect(formatter.serialize(factory.createClass('Test', 'TestExtends'))).toBe(
            'class Test extend TestExtends {}',
        );
    });

    it('Serialization Interface component', () => {
        expect(formatter.serialize(factory.createInterface('Test'))).toBe(
            'interface Test {}',
        );
        expect(formatter.serialize(factory.createInterface('Test', 'TestExtends'))).toBe(
            'interface Test extend TestExtends {}',
        );
    });

    it('Serialization of the invalid component', () => {
        expect(formatter.serialize(factory.createInterface('Test'))).toBe(
            'interface Test {}',
        );
        expect(formatter.serialize(factory.createInterface('Test', 'TestExtends'))).toBe(
            'interface Test extend TestExtends {}',
        );
    });
});

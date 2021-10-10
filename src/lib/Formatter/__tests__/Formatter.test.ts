import ComponentFactory from '../../../models/factories/ComponentFactory';
import Formatter from '../index';

describe('Serialize component.', () => {
    const formatter = new Formatter();
    const factory = new ComponentFactory();

    it('Serialize Class component', () => {
        expect(formatter.serialize(factory.createClass('Test'))).toBe(
            'class Test {}',
        );
        expect(formatter.serialize(factory.createClass('Test', 'TestExtends'))).toBe(
            'class Test extend TestExtends {}',
        );
    });
});

import ComponentFactory from '../index';
import Class from '../../../components/Class';
import Interface from '../../../components/Interface';

describe('Check the functionality of the ComponentFactory.', () => {
    const factory = new ComponentFactory();

    it('Create class component', () => {
        expect(factory.createClass('test')).toBeInstanceOf(Class);
    });

    it('Create interface component', () => {
        expect(factory.createInterface('test')).toBeInstanceOf(Interface);
    });
});

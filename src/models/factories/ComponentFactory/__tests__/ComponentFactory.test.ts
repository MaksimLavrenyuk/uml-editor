import ComponentFactory from '../index';
import { Class } from '../../../components/Class';

describe('Check the functionality of the ComponentFactory.', () => {
    const factory = new ComponentFactory();

    it('Create class component', () => {
        expect(factory.createClass('test')).toBeInstanceOf(Class);
    });
});

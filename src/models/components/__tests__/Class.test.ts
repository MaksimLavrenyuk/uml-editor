import { Class } from '../Class';
import ComponentType from '../../ComponentType';

test('Checking class component', () => {
    const testClass = new Class('test');

    expect(testClass.name).toBe('test');
    expect(testClass.componentType).toBe(ComponentType.CLASS);
});

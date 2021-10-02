import DiagramValidator from './index';

describe('Testing validation for diagram nodes', () => {
    it('example', () => {
        const validator = new DiagramValidator();

        expect(validator.validate()).toBe(undefined);
    });
});

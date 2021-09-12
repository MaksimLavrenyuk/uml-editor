import Core from '../index';

describe('Parse basic types.', () => {
    it('Generate Doc for BasicTypes.ts', () => {
        expect(Core.generateDoc(['./types/BasicTypes.ts'])).toBe(undefined);
    });
});

import LinkValidator from '../LinkValidator';
import { Node } from '../Node';
import ComponentType from '../../../../../models/ComponentType';
import ComponentFactory from '../../../../../models/factories/ComponentFactory';

describe('Validation check of node links creation.', () => {
    const linkValidator = new LinkValidator();
    const componentFactory = new ComponentFactory();

    it('Extend the class with a class with the same name.', () => {
        expect(linkValidator.isValidLink(
            new Node({
                type: ComponentType.CLASS,
                name: 'test_1',
                factory: componentFactory,
                linkValidator,
            }), new Node({
                type: ComponentType.CLASS,
                name: 'test_1',
                factory: componentFactory,
                linkValidator,
            }),
        )).toBeFalsy();
    });

    it('We extend a class with a class extensible without a name.', () => {
        expect(linkValidator.isValidLink(
            new Node({
                type: ComponentType.CLASS,
                name: '',
                factory: componentFactory,
                linkValidator,
            }), new Node({
                type: ComponentType.CLASS,
                name: 'test_1',
                factory: componentFactory,
                linkValidator,
            }),
        )).toBeFalsy();
    });

    it('Extend the class with a class, target without a name.', () => {
        expect(linkValidator.isValidLink(
            new Node({
                type: ComponentType.CLASS,
                name: 'test_1',
                factory: componentFactory,
                linkValidator,
            }), new Node({
                type: ComponentType.CLASS,
                name: '',
                factory: componentFactory,
                linkValidator,
            }),
        )).toBeFalsy();
    });

    it('Expanding the class with a class.', () => {
        expect(linkValidator.isValidLink(
            new Node({
                type: ComponentType.CLASS,
                name: 'test_1',
                factory: componentFactory,
                linkValidator,
            }), new Node({
                type: ComponentType.CLASS,
                name: 'test_2',
                factory: componentFactory,
                linkValidator,
            }),
        )).toBeTruthy();
    });
});

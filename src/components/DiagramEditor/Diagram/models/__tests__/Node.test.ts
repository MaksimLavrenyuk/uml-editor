import { PortModelAlignment } from '@projectstorm/react-diagrams';
import ComponentType from '../../../../../models/ComponentType';
import { Node } from '../Node';
import { Port } from '../Port';
import ComponentFactory from '../../../../../models/factories/ComponentFactory';
import Class from '../../../../../models/components/Class';
import LinkValidator from '../LinkValidator';

const componentFactory = new ComponentFactory();
const linkValidator = new LinkValidator();

describe('Check basic functionality of the node.', () => {
    it('Check the overall operation of the unit.', () => {
        const node = new Node({
            type: ComponentType.CLASS,
            name: 'test',
            factory: componentFactory,
            linkValidator,
        });

        expect(node.getType()).toBe(ComponentType.CLASS);
        expect(node.getPort(PortModelAlignment.TOP)).toBeInstanceOf(Port);
        expect(node.getPort(PortModelAlignment.BOTTOM)).toBeInstanceOf(Port);
    });

    it('Creating class node.', () => {
        const node = new Node({
            type: ComponentType.CLASS,
            name: 'test',
            factory: componentFactory,
            linkValidator,
        });

        expect(node.getType()).toBe(ComponentType.CLASS);
    });

    it('Creating interface node.', () => {
        const node = new Node({
            type: ComponentType.INTERFACE,
            name: 'test',
            factory: componentFactory,
            linkValidator,
        });

        expect(node.getType()).toBe(ComponentType.INTERFACE);
    });
});

describe('Check the contents of the node.', () => {
    it('Class node should content correct info.', () => {
        const content = new Node({
            type: ComponentType.CLASS,
            name: 'test',
            factory: componentFactory,
            linkValidator,
        }).content();

        expect(content).toBeInstanceOf(Class);
        expect(content).toEqual({
            name: 'test',
            componentType: ComponentType.CLASS,
            extends: undefined,
        });
    });
});

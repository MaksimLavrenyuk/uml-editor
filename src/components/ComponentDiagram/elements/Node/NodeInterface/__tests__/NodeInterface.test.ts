import { PortModelAlignment } from '@projectstorm/react-diagrams';
import ComponentType from '../../../../../../models/ComponentType';
import NodeInterface from '../index';
import { Port } from '../../../Port/Port';
import Interface from '../../../../../../models/components/Interface';

describe('Check basic functionality of the node.', () => {
    it('Check the overall operation of the unit.', () => {
        const node = new NodeInterface({ name: 'test' });

        expect(node.getType()).toBe(ComponentType.INTERFACE);
        expect(node.getPort(PortModelAlignment.TOP)).toBeInstanceOf(Port);
        expect(node.getPort(PortModelAlignment.BOTTOM)).toBeInstanceOf(Port);
    });
});

describe('Check the contents of the node.', () => {
    it('Interface node should content correct info.', () => {
        const content = new NodeInterface({ name: 'test' }).content();

        expect(content).toBeInstanceOf(Interface);
        expect(content).toEqual({
            name: 'test',
            componentType: ComponentType.INTERFACE,
            extends: undefined,
        });
    });
});

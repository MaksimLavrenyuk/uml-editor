import { PortModelAlignment } from '@projectstorm/react-diagrams';
import ComponentType from '../../../../../../models/ComponentType';
import NodeClass from '../index';
import { Port } from '../../../Port/Port';
import Class from '../../../../../../models/components/Class';

describe('Check basic functionality of the node.', () => {
    // it('Check the overall operation of the unit.', () => {
    //     const node = new NodeClass({ name: 'test' });
    //
    //     expect(node.getType()).toBe(ComponentType.CLASS);
    //     expect(node.getPort(PortModelAlignment.TOP)).toBeInstanceOf(Port);
    //     expect(node.getPort(PortModelAlignment.BOTTOM)).toBeInstanceOf(Port);
    // });
});

describe('Check the contents of the node.', () => {
    // it('Class node should content correct info.', () => {
    //     const content = new NodeClass({ name: 'test' }).content();
    //
    //     expect(content).toBeInstanceOf(Class);
    //     expect(content).toEqual({
    //         name: 'test',
    //         componentType: ComponentType.CLASS,
    //         extends: undefined,
    //     });
    // });
});

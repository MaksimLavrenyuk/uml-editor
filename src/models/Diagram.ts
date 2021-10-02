import { DiagramEngine } from '@projectstorm/react-diagrams';
import { Point } from '@projectstorm/geometry';
import ComponentType from './ComponentType';
import { ComponentI } from './components/Component';

export type DiagramInitialNode = {
    type: ComponentType, name?: string, extend?: string, point?: Point,
};

export default interface Diagram {
    engine(): DiagramEngine
    addNode(node: DiagramInitialNode): void
    content(): ComponentI[]
    fill(components: ComponentI[]): void
}

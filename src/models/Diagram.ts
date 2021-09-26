import { DiagramEngine } from '@projectstorm/react-diagrams';
import { Point } from '@projectstorm/geometry';
import ComponentType from './ComponentType';

export default interface Diagram {
    engine(): DiagramEngine
    addNode(item: ComponentType, point?: Point): void
}

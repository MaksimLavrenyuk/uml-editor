import { DiagramEngine } from '@projectstorm/react-diagrams';
import { Point } from '@projectstorm/geometry';
import { ComponentKind } from 'tplant/dist/Models/ComponentKind';

export default interface Diagram {
    engine(): DiagramEngine
    addNode(item: ComponentKind, point?: Point): void
}

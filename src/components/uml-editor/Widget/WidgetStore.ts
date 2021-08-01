import createEngine, {
    DefaultNodeModel,
    DiagramEngine,
    DiagramModel,
    PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { Point } from '@projectstorm/geometry';
import { ItemStruct } from '../items/types';
import { SimplePortFactory } from './diagram/SimplePortFactory';
import { DiamondPortModel } from './diagram/DiamondPortModel';
import { DiamondNodeFactory } from './diagram/DiamondNodeFactory';
import { DiamondNodeModel } from './diagram/DiamondNodeModel';

export class WidgetStore {
    protected activeModel: DiagramModel | undefined;

    protected diagramEngine: DiagramEngine;

    constructor() {
        this.diagramEngine = createEngine();

        this.registerFactories();
        this.newModel();
    }

    /**
     * Register some other factories as well.
     *
     * @private
     */
    private registerFactories() {
        this.diagramEngine
            .getPortFactories()
            .registerFactory(new SimplePortFactory(
                'diamond', () => new DiamondPortModel(PortModelAlignment.LEFT),
            ));
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new DiamondNodeFactory());
    }

    public newModel() {
        this.activeModel = new DiagramModel();
        this.diagramEngine.setModel(this.activeModel);
        // 3-A) create a default node
        const node1 = new DefaultNodeModel('Item 1', 'rgb(0,192,255)');
        const port = node1.addOutPort('Out');
        node1.setPosition(100, 100);

        // 3-B) create another default node
        const node2 = new DefaultNodeModel('Item 2', 'rgb(192,255,0)');
        const port2 = node2.addInPort('In');
        node2.setPosition(400, 100);

        const node3 = new DiamondNodeModel('class');
        node3.setPosition(250, 108);

        // link the ports
        const link1 = port.link(port2);

        this.activeModel.addAll(node1, node2, node3, link1);
    }

    public newNode = (item: ItemStruct, point: Point) => {
        const { diagramEngine } = this;
        let node: DefaultNodeModel | null = null;

        if (item.type === 'class') {
            node = new DefaultNodeModel(item.name, 'rgb(192,255,0)');
            node.addInPort('In');
        }

        if (node) {
            node.setPosition(point);
            diagramEngine.getModel().addNode(node);
        }

        this.diagramEngine.repaintCanvas();
    };

    public getActiveDiagram(): DiagramModel | undefined {
        return this.activeModel;
    }

    public getDiagramEngine(): DiagramEngine {
        return this.diagramEngine;
    }
}

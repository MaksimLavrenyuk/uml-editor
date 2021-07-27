import _default, {
    DiagramModel, DiagramEngine, DefaultNodeModel,
} from '@projectstorm/react-diagrams';

export class WidgetStore {
    protected activeModel: DiagramModel | undefined;

    protected diagramEngine: DiagramEngine;

    constructor() {
        this.diagramEngine = _default();
        this.newModel();
    }

    public newModel() {
        this.activeModel = new DiagramModel();
        this.diagramEngine.setModel(this.activeModel);
        // 3-A) create a default node
        const node1 = new DefaultNodeModel('Node 1', 'rgb(0,192,255)');
        const port = node1.addOutPort('Out');
        node1.setPosition(100, 100);

        // 3-B) create another default node
        const node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
        const port2 = node2.addInPort('In');
        node2.setPosition(400, 100);

        // link the ports
        const link1 = port.link(port2);

        this.activeModel.addAll(node1, node2, link1);
    }

    public getActiveDiagram(): DiagramModel | undefined {
        return this.activeModel;
    }

    public getDiagramEngine(): DiagramEngine {
        return this.diagramEngine;
    }
}

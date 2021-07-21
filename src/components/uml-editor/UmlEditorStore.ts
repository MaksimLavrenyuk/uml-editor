import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramEngine,
    DiagramModel,
} from '@projectstorm/react-diagrams';

class UmlEditorStore {
    private readonly engine: DiagramEngine;

    public getEngine() {
        return this.engine;
    }

    constructor() {
        this.engine = createEngine();

        const node1 = new DefaultNodeModel({
            name: 'Node 1',
            color: 'rgb(0,192,255)',
        });
        const node2 = new DefaultNodeModel({
            name: 'Node 2',
            color: 'rgb(0,192,255)',
        });

        node1.setPosition(100, 100);
        const port1 = node1.addOutPort('Out');

        node2.setPosition(200, 100);
        const port2 = node2.addOutPort('Out');

        const link = port1.link<DefaultLinkModel>(port2);
        // link.addLabel('Hello World!');

        const model = new DiagramModel();
        model.addAll(node1, node2, link);
        this.engine.setModel(model);
    }
}

export default UmlEditorStore;

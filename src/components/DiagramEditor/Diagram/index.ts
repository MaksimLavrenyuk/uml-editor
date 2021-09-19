import createEngine, {
    DiagramEngine, DiagramModel, NodeModel, PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { I18n } from '@lingui/core';
import { Point } from '@projectstorm/geometry';
import { ComponentKind } from 'tplant/dist/Models/ComponentKind';
import { ClassNodeFactory } from './factories/ClassNodeFactory';
import DiagramStruct from '../../../models/Diagram';
import { ClassNodeModel } from './models/ClassNodeModel';

export class Diagram implements DiagramStruct {
    protected activeModel: DiagramModel | undefined;

    protected diagramEngine: DiagramEngine;

    private readonly i18n: I18n;

    constructor(i18n: I18n) {
        this.diagramEngine = createEngine();
        this.i18n = i18n;
        this.registerFactories();
        this.newModel();
    }

    private newModel() {
        this.activeModel = new DiagramModel();
        this.diagramEngine.setModel(this.activeModel);
    }

    /**
     * Register some other converters as well.
     *
     * @private
     */
    private registerFactories() {
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new ClassNodeFactory({ i18n: this.i18n }));
    }

    public engine(): DiagramEngine {
        return this.diagramEngine;
    }

    addNode(item: ComponentKind, point?: Point) {
        const { diagramEngine } = this;
        let node: NodeModel | null;

        switch (item) {
        case 0:
            node = new ClassNodeModel({ name: this.i18n._('CLASS'), i18n: this.i18n });
            break;
        default:
            node = null;
        }

        if (node) {
            node.setPosition(point || new Point(100, 100));
            diagramEngine.getModel().addNode(node);
        }

        this.diagramEngine.repaintCanvas();
    }
}

export default Diagram;

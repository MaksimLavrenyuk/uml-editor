import createEngine, {
    DiagramEngine, DiagramModel,
} from '@projectstorm/react-diagrams';
import { I18n } from '@lingui/core';
import { Point } from '@projectstorm/geometry';
import { NodeClassFactory } from './factories/NodeClassFactory';
import DiagramStruct from '../../../models/Diagram';
import { Node } from './models/Node';
import ComponentType from '../../../models/ComponentType';
import { COMPONENTS_NAMES } from '../../../locales/lang-constants';
import NodeInterfaceFactory from './factories/NodeInterfaceFactory';

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
        this.diagramEngine.getNodeFactories().registerFactory(new NodeClassFactory());
        this.diagramEngine.getNodeFactories().registerFactory(new NodeInterfaceFactory());
    }

    public engine(): DiagramEngine {
        return this.diagramEngine;
    }

    addNode(type: ComponentType, point?: Point) {
        const { diagramEngine } = this;
        const node = new Node({ type, name: COMPONENTS_NAMES[type] });

        node.setPosition(point || new Point(100, 100));
        diagramEngine.getModel().addNode(node);
        this.diagramEngine.repaintCanvas();
    }
}

export default Diagram;

import createEngine, {
    DiagramEngine,
    DiagramModel, NodeModel,
    PortModelAlignment,
} from '@projectstorm/react-diagrams';
import { I18n } from '@lingui/core';
import { Point } from '@projectstorm/geometry';
import { ItemStruct } from '../items/types';
import { PortFactory } from './diagram/PortFactory';
import { ClassPortModel } from './diagram/nodes/class/ClassPortModel';
import { ClassNodeFactory } from './diagram/nodes/class/ClassNodeFactory';
import { ClassNodeModel } from './diagram/nodes/class/ClassNodeModel';
import { NODE_TYPES } from './diagram/constants';
import { InterfacePortModel } from './diagram/nodes/interface/InterfacePortModel';
import { InterfaceNodeFactory } from './diagram/nodes/interface/InterfaceNodeFactory';
import { InterfaceNodeModel } from './diagram/nodes/interface/InterfaceNodeModel';

export type WidgetStoreProps = {
    i18n: I18n
};

export class WidgetStore {
    protected activeModel: DiagramModel | undefined;

    protected diagramEngine: DiagramEngine;

    private readonly i18n: I18n;

    constructor(props: WidgetStoreProps) {
        this.diagramEngine = createEngine();

        this.i18n = props.i18n;
        this.registerFactories();
        this.newModel();
        this.newNode({ type: 'class', name: 'Class' }, new Point(1500, 500));
    }

    /**
     * Register some other factories as well.
     *
     * @private
     */
    private registerFactories() {
        this.diagramEngine
            .getPortFactories()
            .registerFactory(
                new PortFactory(
                    NODE_TYPES.class,
                    () => new ClassPortModel(PortModelAlignment.LEFT),
                ),
            );
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new ClassNodeFactory({ i18n: this.i18n }));

        this.diagramEngine
            .getPortFactories()
            .registerFactory(
                new PortFactory(
                    NODE_TYPES.interface,
                    () => new InterfacePortModel(PortModelAlignment.LEFT),
                ),
            );
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new InterfaceNodeFactory());
    }

    public newModel() {
        this.activeModel = new DiagramModel();
        this.diagramEngine.setModel(this.activeModel);
    }

    public newNode = (item: ItemStruct, point: Point) => {
        const { diagramEngine } = this;
        let node: NodeModel | null;

        switch (item.type) {
        case 'class':
            node = new ClassNodeModel({ name: item.name, i18n: this.i18n });
            break;
        case 'interface':
            node = new InterfaceNodeModel(item.name);
            break;
        default:
            node = null;
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
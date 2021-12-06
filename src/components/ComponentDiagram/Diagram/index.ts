import createEngine, {
    DefaultDiagramState,
    DiagramEngine,
    DiagramModel,
    NodeModel,
} from '@projectstorm/react-diagrams';
import { I18n } from '@lingui/core';
import { Point } from '@projectstorm/geometry';
import { observable, makeObservable, action } from 'mobx';
import { NodeClassFactory } from './factories/NodeClassFactory';
import DiagramStruct, { DiagramInitialNode } from '../../../models/Diagram';
import { Node, NodeI } from './models/Node';
import NodeInterfaceFactory from './factories/NodeInterfaceFactory';
import ComponentFactory from '../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../models/components/Component';
import isType from '../../../utils/guards/isType';
import Class from '../../../models/components/Class';
import { LinkValidatorI } from './models/LinkValidator';
import ZoomAction from './actions/ZoomAction';
import Observable from '../../../lib/Observable';
import LinkFactory from './factories/LinkFactory';

type DiagramDeps = {
    i18n: I18n,
    linkValidator: LinkValidatorI,
    componentFactory: ComponentFactory,
};

export enum DiagramEvents {
    change = 'change'
}

type EventPayload = {
    [DiagramEvents.change]: ComponentI[]
};

export class Diagram implements DiagramStruct {
    protected activeModel: DiagramModel | undefined;

    protected diagramEngine: DiagramEngine;

    private readonly i18n: I18n;

    private readonly componentFactory: ComponentFactory;

    private readonly linkValidator: LinkValidatorI;

    private observableChange = new Observable<EventPayload[DiagramEvents.change]>();

    @observable
    private connectionMode = false;

    constructor(components: ComponentI[], deps: DiagramDeps) {
        this.diagramEngine = createEngine({
            registerDefaultZoomCanvasAction: false,
        });
        this.i18n = deps.i18n;
        this.componentFactory = deps.componentFactory;
        this.linkValidator = deps.linkValidator;
        this.disableLooseLink();
        this.registerFactories();
        this.registerActions();
        this.newModel();
        this.fill([new Class('example1'), new Class('example2')]);

        makeObservable(this);
    }

    private newModel() {
        this.activeModel = new DiagramModel();
        this.diagramEngine.setModel(this.activeModel);
    }

    @action
    private changeConnectionMode(connection: boolean) {
        this.connectionMode = connection;
    }

    public isConnectionMode = () => this.connectionMode;

    private disableLooseLink() {
        const state = this.diagramEngine.getStateMachine().getCurrentState();
        if (state instanceof DefaultDiagramState) {
            state.dragNewLink.config.allowLooseLinks = false;
        }
    }

    /**
     * Register some other converters as well.
     *
     * @private
     */
    private registerFactories() {
        const nodeFactories = this.diagramEngine.getNodeFactories();
        const linkFactories = this.diagramEngine.getLinkFactories();

        nodeFactories.registerFactory(new NodeClassFactory({
            factory: this.componentFactory,
            linkValidator: this.linkValidator,
            isConnectionMode: this.isConnectionMode,
        }));
        nodeFactories.registerFactory(new NodeInterfaceFactory({
            factory: this.componentFactory,
            linkValidator: this.linkValidator,
            isConnectionMode: this.isConnectionMode,
        }));
        linkFactories.registerFactory(new LinkFactory());
    }

    private registerActions() {
        const actions = [
            new ZoomAction(),
        ];

        actions.forEach((zoomAction) => this.diagramEngine.getActionEventBus().registerAction(zoomAction));
    }

    public addEventListener<T extends DiagramEvents>(event: T, listener: (payload: EventPayload[T]) => void) {
        switch (event) {
        case DiagramEvents.change:
            this.observableChange.registerListener(listener);
            break;
        default:
        }
    }

    public engine(): DiagramEngine {
        return this.diagramEngine;
    }

    /**
     * Add a new diagram node.
     *
     * @param initialNode - Initial node properties.
     */
    addNode(initialNode: DiagramInitialNode) {
        const { diagramEngine } = this;
        const node = new Node({
            type: initialNode.type,
            name: initialNode.name || '',
            extends: initialNode.extends,
            factory: this.componentFactory,
            linkValidator: this.linkValidator,
        });

        node.observableChange.registerListener(() => {
            this.observableChange.emit(this.content());
        });

        node.observableConnection.registerListener((connection) => {
            this.changeConnectionMode(connection);
        });

        node.setPosition(initialNode.point || new Point(100, 100));
        diagramEngine.getModel().addNode(node);
        this.diagramEngine.repaintCanvas();

        this.observableChange.emit(this.content());

        return node.getID();
    }

    /**
     * Fill the diagram with nodes.
     *
     * @param components - Components to pass on to the diagram.
     */
    fill(components: ComponentI[]) {
        components.forEach((component) => {
            let extendsComponent;

            if (isType<Class>(component, 'extends')) extendsComponent = component.extends;

            this.addNode({
                type: component.componentType,
                name: component.name,
                extends: extendsComponent,
            });
        });
    }

    /**
     * Extracting useful data from a diagram.
     */
    content() {
        const content: ComponentI[] = [];

        this.activeModel?.getNodes()?.forEach((node: NodeModel) => {
            if (isType<NodeI>(node, 'name')) {
                const nodeContent = node.content();

                if (nodeContent) content.push(nodeContent);
            }
        });

        return content;
    }
}

export default Diagram;

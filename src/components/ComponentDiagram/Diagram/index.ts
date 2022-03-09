import createEngine, {
    DefaultDiagramState,
    DiagramEngine,
    DiagramModel,
    NodeModel, PortModel,
} from '@projectstorm/react-diagrams';
import { I18n } from '@lingui/core';
import { Point } from '@projectstorm/geometry';
import { observable, makeObservable, action } from 'mobx';
import EventEmitter from 'simple-typed-emitter';
import { NodeClassFactory } from '../elements/Node/NodeClass/NodeClassFactory';
import DiagramStruct, { DiagramInitialNode } from '../../../models/Diagram';
import { Node, NodeI } from '../elements/Node/Node';
import NodeInterfaceFactory from '../elements/Node/NodeInterface/NodeInterfaceFactory';
import ComponentFactory from '../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../models/components/Component';
import isType from '../../../utils/guards/isType';
import Class from '../../../models/components/Class';
import LinkValidator from '../LinkValidator';
import ZoomAction from '../actions/ZoomAction';
import LinkFactory from '../elements/Link/LinkFactory';
import DeleteItemsAction from '../actions/DeleteItemsAction';
import DiagramContext from './DiagramContext/DiagramContext';

type DiagramDeps = {
    i18n: I18n,
};

export type CreateLink = (
    (sourceNode: NodeI, targetNode: NodeI) => boolean
);

export type RemoveLinkHandler = (
    (sourceNode: NodeI, targetNode: NodeI) => void
);

export type SetPort = (
    (port: PortModel | null) => void
);

export type ActiveLink = {
    sourcePort: null | PortModel,
};

export type GetActiveLink = (
    () => ActiveLink
);

export type ChangeDiagramHandler = () => void;

type DiagramEvents = {
    change: ((components: ComponentI[]) => void)[]
};

export class Diagram implements DiagramStruct {
    protected activeModel: DiagramModel | undefined;

    protected diagramEngine: DiagramEngine;

    private readonly i18n: I18n;

    /**
     * This is where the data about the currently connected ports of the nodes is stored.
     * @private
     */
    @observable
    private activeLink: ActiveLink = { sourcePort: null };

    private linkValidator: LinkValidator;

    private readonly diagramContext: DiagramContext;

    public readonly events: EventEmitter<DiagramEvents>;

    constructor(components: ComponentI[], deps: DiagramDeps) {
        this.diagramEngine = createEngine({
            registerDefaultZoomCanvasAction: false,
            registerDefaultDeleteItemsAction: false,
        });
        this.i18n = deps.i18n;
        this.diagramContext = new DiagramContext({
            createLink: this.createLink,
            setPort: this.setSourcePort,
            removeLinkHandler: this.removeLinkHandler,
            getActiveLink: this.getActiveLink,
            changeHandler: this.changeDiagramHandler,
        });
        this.linkValidator = new LinkValidator();
        this.events = new EventEmitter<DiagramEvents>();
        this.disableLooseLink();
        this.registerFactories();
        this.registerActions();
        this.newModel();
        this.fill([new Class('example1'), new Class('example2')]);

        makeObservable(this);
    }

    private createLink: CreateLink = (
        sourceNode,
        targetNode,
    ) => this.linkValidator.isValidLink(sourceNode, targetNode);

    @action
    private setSourcePort: SetPort = (port) => {
        this.activeLink.sourcePort = port;
    };

    private getActiveLink = () => this.activeLink;

    private removeLinkHandler: RemoveLinkHandler = (sourceNode: NodeI, targetNode: NodeI) => {
        /**
         * The Link is inheritance. When you delete a link, you need to null the inheritance.
         */
        sourceNode.removeExtends();
        this.changeDiagramHandler();
    };

    private changeDiagramHandler: ChangeDiagramHandler = () => {
        this.events.emit('change', this.content());
    };

    private newModel() {
        this.activeModel = new DiagramModel();
        this.diagramEngine.setModel(this.activeModel);
    }

    /**
     * Turn off free-hanging (not connected to 2 nodes at once) links.
     * @private
     */
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
            context: this.diagramContext,
        }));
        nodeFactories.registerFactory(new NodeInterfaceFactory({
            context: this.diagramContext,
        }));
        linkFactories.registerFactory(new LinkFactory({ context: this.diagramContext }));
    }

    private registerActions() {
        const actions = [
            new DeleteItemsAction(),
            new ZoomAction(),
        ];

        actions.forEach((zoomAction) => this.diagramEngine.getActionEventBus().registerAction(zoomAction));
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
            context: this.diagramContext,
        });

        node.setPosition(initialNode.point || new Point(100, 100));
        diagramEngine.getModel().addNode(node);
        this.diagramEngine.repaintCanvas();

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

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
import NodeClassFactory from '../elements/Nodes/NodeClass/NodeClassFactory';
import DiagramStruct, { DiagramInitialNode } from '../../../models/Diagram';
import NodeBasic, { INode } from '../elements/Nodes/NodeBasic';
import NodeInterfaceFactory from '../elements/Nodes/NodeInterface/NodeInterfaceFactory';
import { ComponentI } from '../../../models/components/Component';
import isType from '../../../utils/guards/isType';
import Class from '../../../models/components/Class';
import Interface from '../../../models/components/Interface';
import LinkValidator from '../LinkValidator';
import ZoomAction from '../actions/ZoomAction';
import DeleteItemsAction from '../actions/DeleteItemsAction';
import NodeClass from '../elements/Nodes/NodeClass';
import NodeInterface from '../elements/Nodes/NodeInterface';
import ComponentType from '../../../models/ComponentType';
import LinkExtendsFactory from '../elements/Links/LinkExtends/LinkExtendsFactory';
import { LinkTargetPortChanged, RemoveLink } from '../elements/Links/LinkBasic';
import LinkAssociationFactory from '../elements/Links/LinkAssociation/LinkAssociationFactory';
import { COMPONENTS_NAMES } from '../../../locales/lang-constants';
import PropertyBasic from '../elements/Properties/Property';

type DiagramDeps = {
    i18n: I18n,
};

export type ActivePort = {
    sourcePort: null | PortModel,
};

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
    private activeNodePort: ActivePort = { sourcePort: null };

    /**
     * This is where the data about the currently connected ports of the nodes is stored.
     * @private
     */
    @observable
    private activePropertyPort: ActivePort = { sourcePort: null };

    private linkValidator: LinkValidator;

    public readonly events: EventEmitter<DiagramEvents>;

    constructor(components: ComponentI[], deps: DiagramDeps) {
        this.diagramEngine = createEngine({
            registerDefaultZoomCanvasAction: false,
            registerDefaultDeleteItemsAction: false,
        });
        this.i18n = deps.i18n;
        this.linkValidator = new LinkValidator();
        this.events = new EventEmitter<DiagramEvents>();
        this.disableLooseLink();
        this.registerFactories();
        this.registerActions();
        this.newModel();
        this.fill([new Class('example1'), new Class('example2')]);

        makeObservable(this);
    }

    private connectNodes = (
        sourceNode: INode,
        targetNode: INode,
    ) => {
        const isClassFromComponent = sourceNode instanceof NodeClass;
        const isInterfaceFromComponent = sourceNode instanceof NodeInterface;
        const isClassToComponent = targetNode instanceof NodeClass;
        const isInterfaceToComponent = targetNode instanceof NodeInterface;
        const from = sourceNode.content();
        const to = targetNode.content();
        const isValid = this.linkValidator.isValidConnectComponents(from, to);

        if (isValid) {
            if (
                (isClassFromComponent || isInterfaceFromComponent)
                && (isClassToComponent || isInterfaceToComponent)
            ) {
                sourceNode.extend(targetNode.content());
                this.emitChangeEvent();

                return isValid;
            }
        }

        return isValid;
    };

    private connectPropertyToNode(property: PropertyBasic, sourceNode: INode, targetNode: INode) {
        let isValidLink = false;

        if (sourceNode instanceof NodeClass) {
            const sourceComponent = sourceNode.content();
            const targetComponent = targetNode.content();

            if (property && sourceComponent && targetComponent) {
                isValidLink = this.linkValidator.isValidConnectNodeProperty(
                    property.content(),
                    sourceComponent,
                    targetComponent,
                );

                if (isValidLink) {
                    property.changeReturnType(targetComponent.name);

                    return isValidLink;
                }
            }
        }

        return isValidLink;
    }

    @action
    private setActivePropertyPort = (port: PortModel) => {
        this.activePropertyPort.sourcePort = port;
    };

    private getActivePropertyPort = () => this.activePropertyPort;

    @action
    private setActiveNodePort = (port: PortModel | null) => {
        this.activeNodePort.sourcePort = port;
    };

    private getActiveNodePort = () => this.activeNodePort;

    private removeLinkNodes = (sourceNode: INode, targetNode: INode) => {
        /**
         * The Link is inheritance. When you delete a link, you need to null the inheritance.
         */
        if (sourceNode instanceof NodeClass || sourceNode instanceof NodeInterface) {
            sourceNode.removeExtends();
        }

        this.emitChangeEvent();
    };

    private emitChangeEvent = () => {
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
            diagramEngine: this.diagramEngine,
            linkProps: {
                onRemoveLink: this.removeLinkHandler,
                onLinkSourcePortChanged: this.changeLinkExtendsSourcePort,
                onLinkTargetPortChanged: this.linkCreationHandler,
            },
        }));
        nodeFactories.registerFactory(new NodeInterfaceFactory({
            diagramEngine: this.diagramEngine,
            linkProps: {
                onRemoveLink: this.removeLinkHandler,
                onLinkSourcePortChanged: this.changeLinkExtendsSourcePort,
                onLinkTargetPortChanged: this.linkCreationHandler,
            },
        }));
        linkFactories.registerFactory(new LinkExtendsFactory({
            onRemoveLink: this.removeLinkHandler,
            onLinkSourcePortChanged: this.changeLinkExtendsSourcePort,
            onLinkTargetPortChanged: this.linkCreationHandler,
        }));
        linkFactories.registerFactory(new LinkAssociationFactory({
            onRemoveLink: this.removeLinkHandler,
            onLinkSourcePortChanged: this.changeLinkExtendsSourcePort,
            onLinkTargetPortChanged: this.linkCreationHandler,
        }));
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

    private removeLinkHandler: RemoveLink = (link) => {
        const sourcePort = link.getSourcePort();
        const targetPort = link.getTargetPort();
        const sourceNode = sourcePort?.getNode();
        const targetNode = targetPort?.getNode();

        if (
            (sourceNode instanceof NodeClass || sourceNode instanceof NodeInterface)
            && (targetNode instanceof NodeClass || targetNode instanceof NodeInterface)
        ) {
            const sourceProperty = sourceNode.getPropertyByPort(sourcePort);

            if (sourceProperty) {
                sourceProperty.changeReturnType(undefined);
            } else {
                const targetProperty = targetNode.getPropertyByPort(targetPort);

                if (targetProperty) {
                    targetProperty.changeReturnType(undefined);
                } else {
                    this.removeLinkNodes(sourceNode, targetNode);
                }
            }
        }
    };

    private changeLinkExtendsSourcePort = (port: PortModel | null) => {
        this.setActiveNodePort(port);
    };

    private linkCreationHandler: LinkTargetPortChanged = (link) => {
        const sourcePort = link.getSourcePort();
        const targetPort = link.getTargetPort();
        const sourceNode = sourcePort.getNode();
        const targetNode = targetPort.getNode();
        let isValidLink;

        if (
            (sourceNode instanceof NodeClass || sourceNode instanceof NodeInterface)
            && (targetNode instanceof NodeClass || targetNode instanceof NodeInterface)
        ) {
            const sourceProperty = sourceNode.getPropertyByPort(sourcePort);

            if (sourceProperty) {
                isValidLink = this.connectPropertyToNode(sourceProperty, sourceNode, targetNode);
            } else {
                const targetProperty = targetNode.getPropertyByPort(targetPort);

                if (targetProperty) {
                    isValidLink = this.connectPropertyToNode(targetProperty, targetNode, sourceNode);
                } else {
                    isValidLink = this.connectNodes(sourceNode, targetNode);
                }
            }
        }

        if (!isValidLink) {
            link.remove();
        } else {
            /**
             * After successfully connecting the nodes, set the source node as not selected.
             * This prevents an error:
             * - drag and drop node
             * - node in the focus state
             * - link a node to another node
             * - the link and the node become selected
             * - Pressing the "Delete" button, deletes along with the created link also the node.
             */
            sourceNode.setSelected(false);
            targetNode.setSelected(false);
        }

        this.setActiveNodePort(null);

        return isValidLink;
    };

    /**
     * Add a new diagram node.
     *
     * @param initialNode - Initial node properties.
     */
    addNode(initialNode: DiagramInitialNode) {
        const { diagramEngine } = this;
        let node: NodeBasic | null = null;

        switch (initialNode.type) {
        case ComponentType.CLASS:
            node = new NodeClass({
                component: new Class(initialNode.name || COMPONENTS_NAMES.CLASS),
                linkProps: {
                    onRemoveLink: this.removeLinkHandler,
                    onLinkSourcePortChanged: this.changeLinkExtendsSourcePort,
                    onLinkTargetPortChanged: this.linkCreationHandler,
                },
            });
            break;
        case ComponentType.INTERFACE:
            node = new NodeInterface({
                component: new Interface(initialNode.name || COMPONENTS_NAMES.INTERFACE),
                linkProps: {
                    onRemoveLink: this.removeLinkHandler,
                    onLinkSourcePortChanged: this.changeLinkExtendsSourcePort,
                    onLinkTargetPortChanged: this.linkCreationHandler,
                },
            });
            break;
        default:
            break;
        }

        if (node) {
            node.setPosition(initialNode.point || new Point(100, 100));
            diagramEngine.getModel().addNode(node);
            this.diagramEngine.repaintCanvas();

            node.events.registerListener('change', this.emitChangeEvent);
            this.emitChangeEvent();
            // return node.getID();
        }

        this.emitChangeEvent();
        return undefined;
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
            if (isType<INode>(node, 'name')) {
                const nodeContent = node.content();

                if (nodeContent) content.push(nodeContent);
            }
        });

        return content;
    }
}

export default Diagram;

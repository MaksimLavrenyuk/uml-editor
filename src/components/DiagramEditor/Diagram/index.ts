import createEngine, { DiagramEngine, DiagramModel, NodeModel } from '@projectstorm/react-diagrams';
import { I18n } from '@lingui/core';
import { Point } from '@projectstorm/geometry';
import { NodeClassFactory } from './factories/NodeClassFactory';
import DiagramStruct, { DiagramInitialNode } from '../../../models/Diagram';
import { Node, NodeI } from './models/Node';
import NodeInterfaceFactory from './factories/NodeInterfaceFactory';
import ComponentFactory from '../../../models/factories/ComponentFactory';
import { ComponentI } from '../../../models/components/Component';
import isType from '../../../utils/guards/isType';
import Class from '../../../models/components/Class';
import { LinkValidatorI } from './models/LinkValidator';

type DiagramDeps = {
    i18n: I18n,
    linkValidator: LinkValidatorI,
    componentFactory: ComponentFactory,
};

export class Diagram implements DiagramStruct {
    protected activeModel: DiagramModel | undefined;

    protected diagramEngine: DiagramEngine;

    private readonly i18n: I18n;

    private readonly componentFactory: ComponentFactory;

    private readonly linkValidator: LinkValidatorI;

    constructor(components: ComponentI[], deps: DiagramDeps) {
        this.diagramEngine = createEngine();
        this.i18n = deps.i18n;
        this.componentFactory = deps.componentFactory;
        this.linkValidator = deps.linkValidator;
        this.registerFactories();
        this.newModel();
        this.fill(components);
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
            .registerFactory(new NodeClassFactory({
                factory: this.componentFactory, linkValidator: this.linkValidator,
            }));
        this.diagramEngine
            .getNodeFactories()
            .registerFactory(new NodeInterfaceFactory({
                factory: this.componentFactory, linkValidator: this.linkValidator,
            }));
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
            extend: initialNode.extend,
            factory: this.componentFactory,
            linkValidator: this.linkValidator,
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
            let extend;

            if (isType<Class>(component, 'extends')) extend = component.extends;

            this.addNode({
                type: component.componentType,
                name: component.name,
                extend,
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

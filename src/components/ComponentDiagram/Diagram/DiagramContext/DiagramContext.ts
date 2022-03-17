import { DiagramEngine } from '@projectstorm/react-diagrams';
import {
    ConnectNodes, RemoveLinkNodes, SetActivePort, GetActivePort, EmitChangeEv, ConnectNodeProperty,
} from '../index';

type DiagramContextProps = {
    connectNodes: ConnectNodes
    connectNodeProperty: ConnectNodeProperty
    removeLinkNodes: RemoveLinkNodes
    setActiveNodePort: SetActivePort
    getActiveNodePort: GetActivePort
    setActivePropertyPort: SetActivePort
    getActivePropertyPort: GetActivePort
    changeHandler: EmitChangeEv,
    diagramEngine: DiagramEngine
};

class DiagramContext {
    public readonly connectNodes: ConnectNodes;

    public readonly removeLinkNodes: RemoveLinkNodes;

    public readonly setActiveNodePort: SetActivePort;

    public readonly getActiveNodePort: GetActivePort;

    public readonly onChange: EmitChangeEv;

    public readonly diagramEngine: DiagramEngine;

    public readonly setActivePropertyPort: SetActivePort;

    public readonly getActivePropertyPort: GetActivePort;

    public readonly connectNodeProperty: ConnectNodeProperty;

    constructor(props: DiagramContextProps) {
        this.connectNodes = props.connectNodes;
        this.removeLinkNodes = props.removeLinkNodes;
        this.setActiveNodePort = props.setActiveNodePort;
        this.getActiveNodePort = props.getActiveNodePort;
        this.onChange = props.changeHandler;
        this.diagramEngine = props.diagramEngine;
        this.setActivePropertyPort = props.setActivePropertyPort;
        this.getActivePropertyPort = props.getActivePropertyPort;
        this.connectNodeProperty = props.connectNodeProperty;
    }
}

export default DiagramContext;

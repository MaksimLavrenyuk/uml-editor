import { DiagramEngine } from '@projectstorm/react-diagrams';
import {
    CreateLink, RemoveLinkHandler, SetPort, GetActiveLink, EmitChangeEv,
} from '../index';

type DiagramContextProps = {
    createLink: CreateLink
    removeLinkHandler: RemoveLinkHandler
    setPort: SetPort
    getActiveLink: GetActiveLink
    changeHandler: EmitChangeEv,
    diagramEngine: DiagramEngine
};

class DiagramContext {
    public readonly createLink: CreateLink;

    public readonly removeLinkHandler: RemoveLinkHandler;

    public readonly setPort: SetPort;

    public readonly getActiveLink: GetActiveLink;

    public readonly onChange: EmitChangeEv;

    public readonly diagramEngine: DiagramEngine;

    constructor(props: DiagramContextProps) {
        this.createLink = props.createLink;
        this.removeLinkHandler = props.removeLinkHandler;
        this.setPort = props.setPort;
        this.getActiveLink = props.getActiveLink;
        this.onChange = props.changeHandler;
        this.diagramEngine = props.diagramEngine;
    }
}

export default DiagramContext;

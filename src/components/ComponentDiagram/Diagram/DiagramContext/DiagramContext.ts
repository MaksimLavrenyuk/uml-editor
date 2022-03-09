import {
    CreateLink, RemoveLinkHandler, SetPort, GetActiveLink, ChangeDiagramHandler,
} from '../index';

type DiagramContextProps = {
    createLink: CreateLink
    removeLinkHandler: RemoveLinkHandler
    setPort: SetPort
    getActiveLink: GetActiveLink
    changeHandler: ChangeDiagramHandler,
};

class DiagramContext {
    public readonly createLink: CreateLink;

    public readonly removeLinkHandler: RemoveLinkHandler;

    public readonly setPort: SetPort;

    public readonly getActiveLink: GetActiveLink;

    public readonly onChange: ChangeDiagramHandler;

    constructor(props: DiagramContextProps) {
        this.createLink = props.createLink;
        this.removeLinkHandler = props.removeLinkHandler;
        this.setPort = props.setPort;
        this.getActiveLink = props.getActiveLink;
        this.onChange = props.changeHandler;
    }
}

export default DiagramContext;

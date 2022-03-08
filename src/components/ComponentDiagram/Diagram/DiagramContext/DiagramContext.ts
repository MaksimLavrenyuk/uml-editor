import {
    LinkValidityPredicate, RemoveLinkHandler, SetPort, GetActiveLink, ChangeDiagramHandler,
} from '../index';

type DiagramContextProps = {
    linkValidityPredicate: LinkValidityPredicate
    removeLinkHandler: RemoveLinkHandler
    setPort: SetPort
    getActiveLink: GetActiveLink
    changeHandler: ChangeDiagramHandler,
};

class DiagramContext {
    public readonly linkValidityPredicate: LinkValidityPredicate;

    public readonly removeLinkHandler: RemoveLinkHandler;

    public readonly setPort: SetPort;

    public readonly getActiveLink: GetActiveLink;

    public readonly onChange: ChangeDiagramHandler;

    constructor(props: DiagramContextProps) {
        this.linkValidityPredicate = props.linkValidityPredicate;
        this.removeLinkHandler = props.removeLinkHandler;
        this.setPort = props.setPort;
        this.getActiveLink = props.getActiveLink;
        this.onChange = props.changeHandler;
    }
}

export default DiagramContext;

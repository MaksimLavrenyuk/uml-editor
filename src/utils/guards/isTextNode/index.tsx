export default function isTextNode(node: Element | Text): node is Text {
    return node.nodeType === Node.TEXT_NODE;
}

export default function isHtmlElementNode(node: Element | Text): node is HTMLElement {
    return node.nodeType === Node.ELEMENT_NODE;
}

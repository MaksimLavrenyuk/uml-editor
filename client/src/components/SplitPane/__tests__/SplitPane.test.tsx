import {
    ReactElement, ReactInstance,
} from 'react';
import {
    scryRenderedComponentsWithType,
    renderIntoDocument,
    findRenderedComponentWithType,
    isDOMComponent,
} from 'react-dom/test-utils';
import { render, findDOMNode } from 'react-dom';
import SplitPane from '../index';
import Pane from '../Pane';
import Resizer from '../Resizer';
import isTextNode from '../../../utils/guards/isTextNode';
import objectKeys from '../../../utils/objectKeys';
import isHtmlElementNode from '../../../utils/guards/isHtmlElementNode';

type MousePositionDifference = {
    x: number
};

const renderComponent = (jsx: ReactElement, renderToDOM: boolean) => {
    if (renderToDOM) {
        const testDiv = document.createElement('div');
        document.body.appendChild(testDiv);
        return render(jsx, testDiv);
    }

    return renderIntoDocument(jsx);
};

function asserter(jsx: ReactElement, renderToDom = false) {
    const splitPane = renderComponent(jsx, renderToDom);
    let component: SplitPane | null = null;

    const findPanes = () => component && scryRenderedComponentsWithType(component, Pane);
    const findPane = (index: number) => {
        const panes = findPanes();

        if (panes) return panes[index];

        return undefined;
    };
    const findResizer = () => component && scryRenderedComponentsWithType(component, Resizer);
    const assertClass = (comp: ReactInstance | null | undefined, expectedClassName: string) => {
        const node = findDOMNode(comp);

        if (node && 'className' in node) {
            expect(node.className.includes(expectedClassName)).toBeTruthy();
        }
    };
    const getResizerPosition = () => {
        const resizer = findResizer();

        if (resizer) {
            const resizerNode = findDOMNode(resizer[0]);
            if (resizerNode && !isTextNode(resizerNode) && isDOMComponent(resizerNode)) {
                return resizerNode.getBoundingClientRect();
            }
        }

        return null;
    };
    const calculateMouseMove = (mousePositionDifference: MousePositionDifference) => {
        const resizerPosition = getResizerPosition();

        if (resizerPosition) {
            const mouseMove = {
                start: {
                    clientX: resizerPosition.left,
                    clientY: resizerPosition.top,
                },
                end: {
                    clientX: resizerPosition.left,
                    clientY: resizerPosition.top,
                },
            };

            mouseMove.end.clientX = resizerPosition.left + mousePositionDifference.x;

            return mouseMove;
        }

        return null;
    };
    const assertStyles = (actualStyles: Partial<CSSStyleDeclaration>, expectedStyles: Partial<CSSStyleDeclaration>) => {
        objectKeys(expectedStyles).forEach((prop) => {
            if (expectedStyles[prop] && expectedStyles[prop] !== '') {
                expect(actualStyles[prop]).toBe(
                    expectedStyles[prop],
                );
            }
        });
    };
    const assertPaneStyles = (expectedStyles: Partial<CSSStyleDeclaration>, paneIndex: number) => {
        const pane = findPane(paneIndex);
        const paneNode = findDOMNode(pane);

        if (paneNode && !isTextNode(paneNode) && isHtmlElementNode(paneNode)) {
            assertStyles(
                paneNode.style,
                expectedStyles,
            );
        }
    };
    const simulateDragAndDrop = (mousePositionDifference: MousePositionDifference) => {
        const mouseMove = calculateMouseMove(mousePositionDifference);

        if (mouseMove && component) {
            component.move(mousePositionDifference.x);
        }
    };
    const mockBoundingClientRect = (instance: ReactInstance, rect: DOMRect) => {
        const node = findDOMNode(instance);

        if (node && !isTextNode(node) && isDOMComponent(node)) {
            node.getBoundingClientRect = jest.fn(() => rect);
        }
    };
    const mockOffsetWidth = (instance: ReactInstance, width: number) => {
        const node = findDOMNode(instance);

        if (node && !isTextNode(node) && isHtmlElementNode(node)) {
            Object.defineProperty(node, 'offsetWidth', { configurable: true, value: width });
        }
    };
    const setMocks = () => {
        const splitPaneRect = {
            bottom: 1240,
            height: 1240,
            left: 0,
            right: 1560,
            top: 0,
            width: 1560,
            x: 0,
            y: 0,
            toJSON() {
                return null;
            },
        };
        const splitPaneWidth = 1560;
        const resizerWidth = 20;
        const resizer = findResizer();

        if (component) {
            mockBoundingClientRect(component, splitPaneRect);
            mockOffsetWidth(component, splitPaneWidth);

            if (resizer) mockOffsetWidth(resizer[0], resizerWidth);
        }
    };

    if (splitPane && !isDOMComponent(splitPane)) {
        component = findRenderedComponentWithType(
            splitPane,
            SplitPane,
        );
    }

    setMocks();

    return {
        assertContainsResizer() {
            expect(findResizer()?.length).toBe(1);
            expect(findPanes()?.length).toBe(2);
        },
        assertPaneContents(expectedContents: string[]) {
            const panes = findPanes();
            const values = panes?.map((pane) => findDOMNode(pane)?.textContent);

            expect(values).toEqual(expectedContents);
        },
        assertSplitPaneClass(expectedClassName: string) {
            assertClass(component, expectedClassName);
        },
        assertResizeByDragging(
            mousePositionDifference: MousePositionDifference,
            expectedStyle: Partial<CSSStyleDeclaration>,
        ) {
            simulateDragAndDrop(mousePositionDifference);
            assertPaneStyles(expectedStyle, 0);
        },
    };
}

describe('Default SplitPane.', () => {
    const SplitPaneTest = (
        <SplitPane className="some-class">
            <div>one</div>
            <div>two</div>
        </SplitPane>
    );

    it('Should render the SplitPane.', () => {
        asserter(SplitPaneTest).assertPaneContents(['one', 'two']);
    });

    it('Should contain a Resizer.', () => {
        asserter(SplitPaneTest).assertContainsResizer();
    });

    it('SplitPane can have a specific class.', () => {
        asserter(SplitPaneTest).assertSplitPaneClass('some-class');
    });
});

describe('Resizer move to the right and left', () => {
    const SplitPaneTest = (
        <SplitPane>
            <div>one</div>
            <div>two</div>
        </SplitPane>
    );

    const moveToRight: MousePositionDifference = { x: 200 };

    it('after move to right, the first pane should be larger than before', () => {
        asserter(SplitPaneTest, true).assertResizeByDragging(moveToRight, {
            width: 'calc(12.99% - 10px)',
        });
    });
});

import React, {
    useCallback, useEffect, useMemo, useRef,
} from 'react';
import classes from './Resizer.module.scss';
import getPercent from '../../utils/number/getPercent';

type ResizerProps<
    LeftContainer extends HTMLElement,
    RightContainer extends HTMLElement,
    ParentContainer extends HTMLElement> = {
    leftContainer: React.RefObject<LeftContainer>
    rightContainer: React.RefObject<RightContainer>
    parentContainer: React.RefObject<ParentContainer>
};

const Resizer = <
    L extends HTMLElement,
    R extends HTMLElement,
    P extends HTMLElement
    >(props: ResizerProps<L, R, P>) => {
    const { parentContainer, leftContainer, rightContainer } = props;
    const resizerRef = useRef<HTMLDivElement>(null);

    const dragStartHandler = () => false;

    const move = useCallback((shiftX = 0, mouseMoveClientX = 0) => {
        const resizer = resizerRef.current;
        const parent = parentContainer.current;
        const left = leftContainer.current;
        const right = rightContainer.current;
        let rightPartWidth = 0;
        let leftPartWidth = 0;
        let parentWidth = 0;

        if (resizer && parent && left && right) {
            const rightEdge = parent.offsetWidth - resizer.offsetWidth;
            let newLeft = mouseMoveClientX + shiftX - parent.getBoundingClientRect().left;

            parentWidth = parent.offsetWidth;

            if (newLeft < 0) {
                newLeft = 0;
            }

            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            rightPartWidth = rightEdge - newLeft;
            leftPartWidth = rightEdge - rightPartWidth;

            resizer.style.left = `${getPercent(newLeft, parentWidth)}%`;
            left.style.width = `${getPercent(leftPartWidth, rightEdge)}%`;
            right.style.width = `${getPercent(rightPartWidth, rightEdge)}%`;
        }
    }, [leftContainer, parentContainer, rightContainer]);

    const adjust = useCallback(() => {
        const resizer = resizerRef.current;
        const parent = parentContainer.current;
        let shiftX = 0;

        if (resizer && parent) {
            shiftX = parent.getBoundingClientRect().right - resizer.getBoundingClientRect().right;
        }
        if (parent) {
            move(shiftX);
        }
    }, [move, parentContainer]);

    const mouseDownHandler = (event: React.MouseEvent) => {
        event.preventDefault(); // prevent the selection from starting (browser action)
        const resizer = resizerRef.current;
        let shiftX = 0;

        if (resizer) {
            shiftX = event.clientX - resizer.getBoundingClientRect().left;
        }

        function onMouseMove(e: MouseEvent) {
            move(shiftX, e.clientX);
        }

        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }

        if (resizer) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    };

    const parentResizeObserver = useMemo(() => new ResizeObserver((entries) => {
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];

            if (entry.contentBoxSize) {
                if (entry.contentBoxSize[0]) {
                    adjust();
                } else {
                    adjust();
                }
            }
        }
    }), [adjust]);

    useEffect(() => {
        if (parentContainer.current) parentResizeObserver.observe(parentContainer.current);
    }, [parentContainer, parentResizeObserver]);

    return (
        <div
            role="none"
            ref={resizerRef}
            className={classes.resizer}
            onDragStart={dragStartHandler}
            onMouseDown={mouseDownHandler}
        />
    );
};

export default React.memo(Resizer);

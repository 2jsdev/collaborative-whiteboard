import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import rough from "roughjs";
import { v4 as uuid } from "uuid";
import { selectTool, setAction, selectAction, selectElements, updateElement, setElements, selectSelectedElement, setSelectedElement } from '../slices/whiteboardSlice';
import { actions, tools } from '../../../constants';

import Menu from '../components/Menu';
import CursorOverlay from '../components/CursorOverlay';
import ElementFactory from '../domain/ElementFactory';
import { Element } from '../domain/Element';

const elementFactory = new ElementFactory();

const WhiteboardPage = () => {
    const dispatch = useDispatch();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    const tool = useSelector(selectTool);
    const action = useSelector(selectAction);
    const elements = useSelector(selectElements);
    const selectedElement = useSelector(selectSelectedElement);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        contextRef.current = context;

        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        const roughCanvas = rough.canvas(canvas);

        elements.forEach((element: Element) => {
            elementFactory.drawElement({ roughCanvas, context, element });

            // Draw a rectangle around the selected element if the SELECTION tool is active
            if (tool === tools.SELECTION && selectedElement && element.id === selectedElement.id) {
                context.save();
                context.strokeStyle = 'blue';
                context.lineWidth = 2;
                context.setLineDash([5, 5]);

                // Offset for the rectangle and control points
                const offset = 10;
                const controlPointSize = 6;

                const x = Math.min(selectedElement.x1, selectedElement.x2) - offset;
                const y = Math.min(selectedElement.y1, selectedElement.y2) - offset;
                const width = Math.abs(selectedElement.x2 - selectedElement.x1) + 2 * offset;
                const height = Math.abs(selectedElement.y2 - selectedElement.y1) + 2 * offset;

                // Draw the rectangle
                context.strokeRect(x, y, width, height);

                // Draw control points
                context.fillStyle = 'blue';
                context.fillRect(x - controlPointSize / 2, y - controlPointSize / 2, controlPointSize, controlPointSize); // Top-left
                context.fillRect(x + width - controlPointSize / 2, y - controlPointSize / 2, controlPointSize, controlPointSize); // Top-right
                context.fillRect(x - controlPointSize / 2, y + height - controlPointSize / 2, controlPointSize, controlPointSize); // Bottom-left
                context.fillRect(x + width - controlPointSize / 2, y + height - controlPointSize / 2, controlPointSize, controlPointSize); // Bottom-right

                context.restore();
            }
        });
    }, [elements, selectedElement, tool]);

    const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
        setIsMouseDown(true);
        const { clientX, clientY } = event;

        if (selectedElement && action === actions.WRITING) return;

        const element = elementFactory.createElement({
            id: uuid(),
            type: tool,
            x1: clientX,
            y1: clientY,
            x2: clientX,
            y2: clientY,
        });

        switch (tool) {
            case tools.LINE:
            case tools.RECTANGLE:
            case tools.DIAMOND:
            case tools.ELLIPSE:
            case tools.ARROW:
            case tools.PENCIL:
                dispatch(setAction(actions.DRAWING));
                break;
            case tools.TEXT:
                dispatch(setAction(actions.WRITING))
                break;
            default:
                throw new Error("Something went wrong when updating element");
        }

        dispatch(setSelectedElement(element));
        dispatch(updateElement(element));
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const { clientX, clientY } = event;

        if (selectedElement && action === actions.DRAWING) {
            const index = elements.findIndex((el) => el.id === selectedElement.id);

            if (index !== -1) {
                const updatedElements = elementFactory.updateElement(
                    {
                        ...selectedElement,
                        x2: clientX,
                        y2: clientY,
                        index,
                    },
                    elements,
                    contextRef.current
                );
                dispatch(setElements(updatedElements));
            }
        }
    }


    const handleMouseUp = () => {
        setIsMouseDown(false);

        const selectedElementIndex = elements.findIndex((el) => el.id === selectedElement?.id);

        if (selectedElementIndex !== -1) {
            if (action === actions.DRAWING || action === actions.RESIZING) {
                dispatch(setAction(actions.SELECTING))
                dispatch(setSelectedElement(elements[selectedElementIndex]));
            }

        }

        // dispatch(setSelectedElement(null))
    }

    const handleTextareaBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {

        const index = elements.findIndex((el) => el.id === selectedElement?.id);

        if (index !== -1 && selectedElement) {
            const updatedElements = elementFactory.updateElement(
                {
                    ...selectedElement,
                    text: event.target.value,
                    index,
                },
                elements,
                contextRef.current
            );
            dispatch(setElements(updatedElements));
            dispatch(setSelectedElement(null));
            dispatch(setAction(null));
        }

        event.target.value = '';
    }

    return (
        <>
            <Menu />
            {action === actions.WRITING ? (
                <textarea
                    ref={textAreaRef}
                    onBlur={handleTextareaBlur}
                    className='whiteboard__textarea'
                    style={{
                        top: `${(selectedElement?.y1 || 0) - 3}px`,
                        left: `${selectedElement?.x1 || 0}px`,
                    }}
                />
            ) : null}

            <canvas
                id="canvas"
                ref={canvasRef}
                className="whiteboard"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                width={canvasSize.width}
                height={canvasSize.height}
            />
            <CursorOverlay />
        </>
    );
};

export default WhiteboardPage;

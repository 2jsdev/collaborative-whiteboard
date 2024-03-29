/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createElement } from ".";
import { tools } from "../../../constants";
import store from "../../../store";
import { emitElementUpdate } from "../services/socketConnection";
import { setElements } from "../slices/whiteboardSlice";

export const updatePencilElementWhenMoving = (
  { index, newPoints },
  elements
) => {
  const elementsCopy = [...elements];

  elementsCopy[index] = {
    ...elementsCopy[index],
    points: newPoints,
  };

  console.log("updating pencil element");

  const updatedPencilElement = elementsCopy[index];

  store.dispatch(setElements(elementsCopy));
  emitElementUpdate(updatedPencilElement);
};

export const updateElement = (
  { id, x1, x2, y1, y2, type, index, text },
  elements
) => {
  const elementsCopy = [...elements];

  switch (type) {
    case tools.LINE:
    case tools.RECTANGLE:
      const updatedElement = createElement({
        id,
        x1,
        y1,
        x2,
        y2,
        toolType: type,
      });

      elementsCopy[index] = updatedElement;

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedElement);
      break;
    case tools.PENCIL:
      elementsCopy[index] = {
        ...elementsCopy[index],
        points: [
          ...elementsCopy[index].points,
          {
            x: x2,
            y: y2,
          },
        ],
      };

      const updatedPencilElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedPencilElement);
      break;
    case tools.TEXT:
      const textWidth = document
        .getElementById("canvas")
        .getContext("2d")
        .measureText(text).width;

      const textHeight = 24;

      elementsCopy[index] = {
        ...createElement({
          id,
          x1,
          y1,
          x2: x1 + textWidth,
          y2: y1 + textHeight,
          toolType: type,
          text,
        }),
      };

      const updatedTextElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedTextElement);
      break;
    default:
      throw new Error("Something went wrong when updating element");
  }
};

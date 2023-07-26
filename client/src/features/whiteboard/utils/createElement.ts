/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ToolType, tools } from "../../../constants";
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();

const generateRectangle = ({ x1, y1, x2, y2 }) => {
  return generator.rectangle(x1, y1, x2 - x1, y2 - y1);
};

const generateLine = ({ x1, y1, x2, y2 }) => {
  return generator.line(x1, y1, x2, y2);
};

type Element = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  toolType: ToolType;
  id: string;
  text?: string;
};

export const createElement = ({ x1, y1, x2, y2, toolType, id, text }) => {
  let roughElement;

  switch (toolType) {
    case tools.RECTANGLE:
      roughElement = generateRectangle({ x1, y1, x2, y2 });
      return {
        id: id,
        roughElement,
        type: toolType,
        x1,
        y1,
        x2,
        y2,
      };
    case tools.LINE:
      roughElement = generateLine({ x1, x2, y1, y2 });
      return {
        id: id,
        roughElement,
        type: toolType,
        x1,
        y1,
        x2,
        y2,
      };
    case tools.PENCIL:
      return {
        id,
        type: toolType,
        points: [{ x: x1, y: y1 }],
      };
    case tools.TEXT:
      return { id, type: toolType, x1, y1, x2, y2, text: text || "" };
    default:
      throw new Error("Something went wrong when creating element");
  }
};

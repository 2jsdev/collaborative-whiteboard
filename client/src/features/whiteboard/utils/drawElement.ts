import { getStroke } from "perfect-freehand";
import { tools } from "../../../constants";
import { getSvgPathFromStroke } from ".";

const drawPencilElement = (context, element) => {
  const myStroke = getStroke(element.points, {
    size: 10,
  });

  const pathData = getSvgPathFromStroke(myStroke);

  const myPath = new Path2D(pathData);
  context.fill(myPath);
};

const drawTextElement = (context, element) => {
  context.textBaseline = "top";
  context.font = "24px sans-serif";
  context.fillText(element.text, element.x1, element.y1);
};

export const drawElement = ({ roughCanvas, context, element }) => {
  switch (element.type) {
    case tools.RECTANGLE:
    case tools.LINE:
      return roughCanvas.draw(element.roughElement);
    case tools.PENCIL:
      drawPencilElement(context, element);
      break;
    case tools.TEXT:
      drawTextElement(context, element);
      break;
    default:
      throw new Error("Something went wrong when drawing element");
  }
};

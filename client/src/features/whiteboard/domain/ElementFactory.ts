/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import rough from "roughjs/bundled/rough.esm";
import { RoughCanvas } from "roughjs/bin/canvas";
import { RoughGenerator } from "roughjs/bin/generator";
import { tools } from "../../../constants";
import { ElementProps, Element, ElementUpdateProps, Point } from "./Element";
import Line from "./Line";
import Rectangle from "./Rectangle";
import Pencil from "./Pencil";
import Diamond from "./Diamond";
import Ellipse from "./Ellipse";
import Arrow from "./Arrow";
import Text from "./Text";

class ElementFactory {
  generator: RoughGenerator;

  constructor() {
    this.generator = rough.generator();
  }

  createElement(props: ElementProps): Element {
    let element: Element;

    switch (props.type) {
      case tools.RECTANGLE:
        element = new Rectangle(props);
        break;
      case tools.LINE:
        element = new Line(props);
        break;
      case tools.PENCIL:
        element = new Pencil(props);
        break;
      case tools.DIAMOND:
        element = new Diamond(props);
        break;
      case tools.ELLIPSE:
        element = new Ellipse(props);
        break;
      case tools.ARROW:
        element = new Arrow(props);
        break;
      case tools.TEXT:
        element = new Text(props);
        break;
      default:
        throw new Error("Tipo de elemento desconocido");
    }

    element.generate(this.generator);
    return element;
  }

  updateElement(
    { index, id, x1, x2, y1, y2, type, text }: ElementUpdateProps,
    elements: Element[],
    context: CanvasRenderingContext2D | null
  ) {
    const elementsCopy = [...elements];

    switch (type) {
      case tools.LINE:
      case tools.RECTANGLE:
      case tools.DIAMOND:
      case tools.ELLIPSE:
      case tools.ARROW: {
        const updatedElement = this.createElement({
          id,
          x1,
          y1,
          x2,
          y2,
          type,
        });

        elementsCopy[index] = updatedElement;

        return elementsCopy;
      }
      case tools.PENCIL: {
        elementsCopy[index].points = [
          ...(elementsCopy[index].points as Point[]),
          { x: x2, y: y2 },
        ];
        return elementsCopy;
      }
      case tools.TEXT: {
        const textWidth = context?.measureText(text || "").width || 24;
        const textHeight = 24;

        const updatedElement = this.createElement({
          id,
          x1,
          y1,
          x2: x1 + textWidth,
          y2: y1 + textHeight,
          type,
          text,
        });

        elementsCopy[index] = updatedElement;

        return elementsCopy;
      }
      default:
        throw new Error("Something went wrong when updating element");
    }
  }

  drawElement({
    roughCanvas,
    context,
    element,
  }: {
    roughCanvas: RoughCanvas;
    context: CanvasRenderingContext2D;
    element: Element;
  }) {
    element.draw(context, roughCanvas);
  }
}

export default ElementFactory;

import { Element, ElementProps } from "./Element";
import { RoughCanvas } from "roughjs/bin/canvas";
import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";

class Rectangle implements Element {
  element: Drawable | null;
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: string;
  text?: string | undefined;

  constructor({ id, type, x1, y1, x2, y2, text }: ElementProps) {
    this.id = id;
    this.type = type;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.text = text || "";
    this.element = null;
  }

  generate(generator: RoughGenerator) {
    this.element = generator.rectangle(
      this.x1,
      this.y1,
      this.x2 - this.x1,
      this.y2 - this.y1
    );
  }

  draw(_context: CanvasRenderingContext2D, roughCanvas: RoughCanvas) {
    if (this.element) {
      roughCanvas.draw(this.element);
    } else {
      throw new Error("Item not generated yet. Please call 'generate' first");
    }
  }
}

export default Rectangle;

import { RoughCanvas } from "roughjs/bin/canvas";
import { Drawable } from "roughjs/bin/core";
import { RoughGenerator } from "roughjs/bin/generator";
import { Element, ElementProps } from "./Element";

class Text implements Element {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: string;
  text: string | undefined;
  element: Drawable | null;

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
  
  generate(_generator: RoughGenerator): void {
    // No es necesario generar nada para el texto
  }
  
  draw(context: CanvasRenderingContext2D, _canvas: RoughCanvas): void {
    context.textBaseline = "top";
    context.font = "24px sans-serif";
    
    if (this.text) {
      context.fillText(this.text, this.x1, this.y1);
    }
  }
}

export default Text;

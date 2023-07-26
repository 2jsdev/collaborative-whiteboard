import { Drawable } from "roughjs/bin/core";
import { RoughCanvas } from "roughjs/bin/canvas";
import { RoughGenerator } from "roughjs/bin/generator";
import { Element, ElementProps, Point } from "./Element";

class Pencil implements Element {
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    type: string;
    text?: string | undefined;
    element: Drawable | null;
    points: Point[];

    constructor({ id, type, x1, y1, x2, y2, text }: ElementProps) {
        this.id = id;
        this.type = type;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.text = text || "";
        this.element = null;
        this.points = [{ x: x1, y: y1 }];
    }

    generate(_generator: RoughGenerator): void {
        // No es necesario generar nada para el lápiz
    }

    draw(context: CanvasRenderingContext2D, _canvas: RoughCanvas): void {
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);
        this.points.forEach(point => {
            context.lineTo(point.x, point.y);
            context.moveTo(point.x, point.y);
        });
        context.stroke();
    }
}

export default Pencil;

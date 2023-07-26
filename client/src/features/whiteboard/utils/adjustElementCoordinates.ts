import { tools } from "../../../constants/toolType";

export const adjustElementCoordinates = (element: any) => {
  const { type, x1, y1, x2, y2 } = element;

  if (type === tools.RECTANGLE) {
    const minX = Math.min(Number(x1), Number(x2));
    const maxX = Math.max(Number(x1), Number(x2));
    const maxY = Math.max(Number(y1), Number(y2));
    const minY = Math.min(Number(y1), Number(y2));

    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  }

  if (type === tools.LINE) {
    if (x1 < x2 || (x1 === x2 && y1 < 2)) {
      // drawing started from left to right
      return { x1, y1, x2, y2 };
    } else {
      return {
        x1: x2,
        y1: y2,
        x2: x1,
        y2: y1,
      };
    }
  }
};

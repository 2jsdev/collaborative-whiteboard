export const toolTypes = {
  SELECTION: "SELECTION",
  RECTANGLE: "RECTANGLE",
  DIAMOND: "DIAMOND",
  ELLIPSE: "ELLIPSE",
  ARROW: "ARROW",
  LINE: "LINE",
  PENCIL: "PENCIL",
  TEXT: "TEXT",
  INSERT_IMAGE: "INSERT_IMAGE",
  ERASER: "ERASER",
};

export const toolTypeNames = {
  [toolTypes.SELECTION]: "Selection",
  [toolTypes.RECTANGLE]: "Rectangle",
  [toolTypes.DIAMOND]: "Diamond",
  [toolTypes.ELLIPSE]: "Ellipse",
  [toolTypes.ARROW]: "Arrow",
  [toolTypes.LINE]: "Line",
  [toolTypes.PENCIL]: "Pencil",
  [toolTypes.TEXT]: "Text",
  [toolTypes.INSERT_IMAGE]: "Insert Image",
  [toolTypes.ERASER]: "Eraser",
};

export type ToolType = (typeof toolTypes)[keyof typeof toolTypes];

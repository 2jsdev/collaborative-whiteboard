import { ToolType, tools } from "../../../constants";

export const adjustmentRequired = (type: ToolType) =>
  [tools.RECTANGLE, tools.LINE].includes(type);

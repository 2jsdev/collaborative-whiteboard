import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToolType, toolTypes } from "../../../constants/toolType";
import { RootState } from "../../../store";

type Element = {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type WhiteboardState = {
  tool: ToolType;
  elements: Element[];
  history: Element[];
};

const initialState: WhiteboardState = {
  tool: toolTypes.SELECTION,
  elements: [],
  history: [],
};

const whiteboardSlice = createSlice({
  name: "whiteboard",
  initialState,
  reducers: {
    setToolType: (state, action: PayloadAction<ToolType>) => {
      state.tool = action.payload;
    },
    addElement: (state, action: PayloadAction<Element>) => {
      state.elements.push(action.payload);
    },
    updateElement: (state, action: PayloadAction<Element>) => {
      const { id } = action.payload;
      const index = state.elements.findIndex((element) => element.id === id);

      if (index !== -1) {
        state.elements[index] = action.payload;
      } else {
        state.elements.push(action.payload);
      }
    },
    setElements: (state, action: PayloadAction<Element[]>) => {
      state.elements = action.payload;
    },
  },
});

export const { setToolType, addElement, updateElement, setElements } =
  whiteboardSlice.actions;

export const selectToolType = (state: RootState) => state.whiteboard.tool;
export const selectElements = (state: RootState) => state.whiteboard.elements;
export const selectHistory = (state: RootState) => state.whiteboard.history;

export default whiteboardSlice.reducer;

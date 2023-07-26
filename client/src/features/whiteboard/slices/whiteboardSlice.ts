import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { Action, actions, Tool, tools } from "../../../constants";
import { Element } from "../domain/Element";

type WhiteboardState = {
  tool: Tool;
  action: Action | null;
  selectedElement: Element | null;
  elements: Element[];
};

const initialState: WhiteboardState = {
  tool: tools.SELECTION,
  action: null,
  elements: [],
  selectedElement: null,
};

const whiteboardSlice = createSlice({
  name: "whiteboard",
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Tool>) => {
      state.tool = action.payload;
    },
    setAction: (state, action: PayloadAction<Action | null>) => {
      state.action = action.payload;

      switch (action.payload) {
        case actions.SELECTING:
          state.tool = tools.SELECTION;
          break;
        default:
          break;
      }
    },
    setSelectedElement: (state, action: PayloadAction<Element | null>) => {
      state.selectedElement = action.payload;
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

export const {
  setTool,
  setAction,
  setSelectedElement,
  updateElement,
  setElements,
} = whiteboardSlice.actions;

export const selectTool = (state: RootState) => state.whiteboard.tool;
export const selectAction = (state: RootState) => state.whiteboard.action;
export const selectElements = (state: RootState) => state.whiteboard.elements;
export const selectSelectedElement = (state: RootState) =>
  state.whiteboard.selectedElement;

export default whiteboardSlice.reducer;

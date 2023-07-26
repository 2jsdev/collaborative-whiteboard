import whiteboardReducer from "../features/whiteboard/slices/whiteboardSlice";
import cursorReducer from "../features/whiteboard/slices/cursorSlice";

const rootReducer = {
  whiteboard: whiteboardReducer,
  cursor: cursorReducer,
};

export default rootReducer;

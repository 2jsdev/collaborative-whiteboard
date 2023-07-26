import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Cursor = {
  userId: string;
  username: string;
  color: string;
  x: number;
  y: number;
};

type CursorState = {
  cursors: Cursor[];
};

const initialState: CursorState = {
  cursors: [],
};

const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    updateCursorPosition: (state, action: PayloadAction<Cursor>) => {
      const { userId, x, y } = action.payload;
      const index = state.cursors.findIndex(
        (cursor) => cursor.userId === userId
      );

      if (index !== -1) {
        state.cursors[index].x = x;
        state.cursors[index].y = y;
      } else {
        state.cursors.push(action.payload);
      }
    },
    removeCursorPosition(state, action: PayloadAction<string>) {
        state.cursors = state.cursors.filter(cursor => cursor.userId !== action.payload)
    }
  },
});

export const { updateCursorPosition, removeCursorPosition } = cursorSlice.actions;

export const selectCursors = (state: { cursor: CursorState }) => state.cursor.cursors;

export default cursorSlice.reducer;
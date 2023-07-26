/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Socket, io } from "socket.io-client";
import store from "../../../store";
import { setElements, updateElement } from "../slices/whiteboardSlice";
import {
  removeCursorPosition,
  updateCursorPosition,
} from "../slices/cursorSlice";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export const connectWithSocketServer = () => {
  socket = io("http://localhost:3003");

  socket.on("connect", () => {
    console.log("connected to socket.io server");
  });

  socket.on("whiteboard-state", (elements) => {
    store.dispatch(setElements(elements));
  });

  socket.on("element-update", (elementData) => {
    store.dispatch(updateElement(elementData));
  });

  socket.on("whiteboard-clear", () => {
    store.dispatch(setElements([]));
  });

  socket.on("cursor-position", (cursorData) => {
    store.dispatch(updateCursorPosition(cursorData));
  });

  socket.on("user-disconnected", (disconnectedUserId) => {
    store.dispatch(removeCursorPosition(disconnectedUserId));
  });
};

export const emitElementUpdate = (element: any) => {
  socket.emit("element-update", element);
};

export const emitClearWhiteboard = () => {
  socket.emit("whiteboard-clear");
};

export const emitCursorPosition = (cursorData: any) => {
  socket.emit("cursor-position", cursorData);
};

import type { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { AppDispatch } from "../../hooks/useAppDispatch";
import { TWSStoreActions } from "../../types/wsTypes";
import { RootState } from "../index";

export const socketMiddleware = (wsActions: TWSStoreActions, wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AnyAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsClose } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };
        // функция, которая вызывается при ошибке соединени
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };
        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({
            type: onMessage,
            payload: JSON.parse(data),
          });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
        if (type === wsSendMessage) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      if (type === wsClose) {
        socket?.close();
      }

      next(action);
    };
  }) as Middleware;
};

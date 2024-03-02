import { IIngredient } from "./types";

export enum wsActionTypes {
  // для создания объекта класса WebSocket:
  WS_CONNECTION_START = "WS_CONNECTION_START",
  // при успешном соединении:
  WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS",
  // в случае ошибки соединения:
  WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR",
  // при закрытии соединения:
  WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED",
  // при получении сообщения от сервера:
  WS_GET_MESSAGE = "WS_GET_MESSAGE",
  WS_GET_ORDERS = "WS_GET_ORDERS",
  // для отправки сообщений на сервер:
  WS_SEND_MESSAGE = "WS_SEND_MESSAGE",
  WS_CLOSE = "WS_CLOSE",
}

export interface IWSOrder {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IWSNewOrder {
  ingredients: IIngredient[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IWSData {
  success: boolean;
  orders: IWSOrder[];
  total: number;
  totalToday: number;
}

export interface IWSConnectionStart {
  readonly type: wsActionTypes.WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWSConnectionSuccessAction {
  readonly type: wsActionTypes.WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: wsActionTypes.WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: wsActionTypes.WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: wsActionTypes.WS_GET_MESSAGE;
  readonly payload: IWSData;
}

export interface IWSGetOrdersAction {
  readonly type: wsActionTypes.WS_GET_ORDERS;
  readonly payload: any;
}

export interface IWSSendMessageAction {
  readonly type: wsActionTypes.WS_SEND_MESSAGE;
  readonly payload: { message: string };
}

export interface IWSCloseAction {
  readonly type: wsActionTypes.WS_CLOSE;
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction
  | IWSGetOrdersAction
  | IWSCloseAction;

export type TWSStoreActions = {
  wsInit: wsActionTypes.WS_CONNECTION_START;
  wsSendMessage: wsActionTypes.WS_SEND_MESSAGE;
  onOpen: wsActionTypes.WS_CONNECTION_SUCCESS;
  onClose: wsActionTypes.WS_CONNECTION_CLOSED;
  onError: wsActionTypes.WS_CONNECTION_ERROR;
  onMessage: wsActionTypes.WS_GET_MESSAGE;
  onOrders: wsActionTypes.WS_GET_ORDERS;
  wsClose: wsActionTypes.WS_CLOSE;
};

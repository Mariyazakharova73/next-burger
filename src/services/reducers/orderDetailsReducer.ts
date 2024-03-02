import { orderActionTypes, IOrder, requestActionTypes } from "../../types/types";
import { IRequestAction, IRequestFailedAction } from "./ingredientsReducer";

export interface IOrderDetailsState {
  order: IOrder;
  dataRequest: boolean;
  dataFailed: boolean;
}

export const initialState: IOrderDetailsState = {
  order: {},
  dataRequest: false,
  dataFailed: false,
};

export interface IOrderDetailsSuccessAction {
  type: orderActionTypes.GET_ORDER_DETAILS;
  payload: IOrder;
}

export type IOrderDetailsAction =
  | IOrderDetailsSuccessAction
  | IRequestAction
  | IRequestFailedAction;

export const orderDetailsReducer = (state = initialState, action: IOrderDetailsAction) => {
  switch (action.type) {
    case orderActionTypes.GET_ORDER_DETAILS:
      return { ...state, order: action.payload };
    case requestActionTypes.GET_DATA_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        dataRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса
        // на случай, если он был и завершился с ошибкой
        dataFailed: false,
      };
    }
    case requestActionTypes.GET_DATA_FAILED: {
      return {
        ...state,
        order: {},
        // Запрос выполнился с ошибкой,
        // выставляем соответсвующие значения в хранилище
        dataFailed: true,
        // Запрос закончил своё выполнение
        dataRequest: false,
      };
    }
    default:
      return state;
  }
};

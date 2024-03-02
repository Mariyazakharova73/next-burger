import { IIngredient, orderItemActionTypes } from "../../types/types";

export interface ISelectedOrderState {
  selectedOrder: IIngredient[];
}

export interface ISelectedOrderShowAction {
  type: orderItemActionTypes.GET_ORDER_ITEM;
  payload: IIngredient[];
}

export interface ISelectedOrderDeleteAction {
  type: orderItemActionTypes.DELETE_ORDER_ITEM;
}

export type ISelectedOrderAction = ISelectedOrderShowAction | ISelectedOrderDeleteAction;

export const initialState: ISelectedOrderState = {
  selectedOrder: [],
};

export const selectedOrderReducer = (state = initialState, action: ISelectedOrderAction) => {
  switch (action.type) {
    case orderItemActionTypes.GET_ORDER_ITEM:
      return { ...state, selectedOrder: action.payload };
    case orderItemActionTypes.DELETE_ORDER_ITEM:
      return { ...state, selectedOrder: [] };
    default:
      return state;
  }
};

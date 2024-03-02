import { IIngredient, requestActionTypes } from "../../types/types";
import { GET_INGREDIENTS } from "../../utils/constants";

export interface IIngredientsState {
  ingredients: IIngredient[];
  dataRequest: boolean;
  dataFailed: boolean;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  dataRequest: false,
  dataFailed: false,
};

export interface IIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS;
  payload: IIngredient[];
}

export interface IRequestAction {
  type: requestActionTypes.GET_DATA_REQUEST;
}

export interface IRequestFailedAction {
  type: requestActionTypes.GET_DATA_FAILED;
}

export type IIngredientsAction = IIngredientsSuccessAction | IRequestAction | IRequestFailedAction;

export const ingredientsReducer = (state = initialState, action: IIngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        // Запрос закончил своё выполнение
        dataRequest: false,
      };
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
        ingredients: [],
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

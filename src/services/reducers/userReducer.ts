import { REMOVE_USER } from "../../utils/constants";
import { IUser, requestActionTypes, updateUserActionTypes } from "../../types/types";
import { GET_USER_SUCCESS, REGISTER_USER_SUCCES } from "../../utils/constants";
import { IRequestAction, IRequestFailedAction } from "./ingredientsReducer";

export interface IUserState {
  user: IUser | null;
  isLoggedIn: boolean;
  dataRequest: boolean;
  dataFailed: boolean;
}

export const initialState: IUserState = {
  user: null,
  isLoggedIn: false,
  dataRequest: false,
  dataFailed: false,
};

export interface IRegisterUserSuccessAction {
  type: typeof REGISTER_USER_SUCCES;
  //payload: IUser;
}

export interface IGetUserAction {
  type: typeof GET_USER_SUCCESS;
  payload: IUser;
}

export interface IUpdateUserRequestAction {
  type: updateUserActionTypes.UPDATE_USER_REQUEST;
}

export interface IUpdateUserAction {
  type: updateUserActionTypes.UPDATE_USER_SUCCESS;
  payload: IUser;
}

export interface IUpdateUserFailedAction {
  type: updateUserActionTypes.UPDATE_USER_FAILED;
}

export interface IRemoveUserAction {
  type: typeof REMOVE_USER;
}

export type IUserAction =
  | IRegisterUserSuccessAction
  | IRequestAction
  | IRequestFailedAction
  | IGetUserAction
  | IUpdateUserAction
  | IUpdateUserRequestAction
  | IUpdateUserFailedAction
  | IRemoveUserAction;

export const userReducer = (state = initialState, action: IUserAction) => {
  switch (action.type) {
    case requestActionTypes.GET_DATA_REQUEST: {
      return {
        ...state,
        dataRequest: true,
        dataFailed: false,
      };
    }
    case REGISTER_USER_SUCCES:
      return { ...state, isLoggedIn: true, dataRequest: false };
    case GET_USER_SUCCESS:
      return { ...state, user: action.payload, isLoggedIn: true, dataRequest: false };

    case updateUserActionTypes.UPDATE_USER_REQUEST:
      return { ...state, dataRequest: true, dataFailed: false };
    case updateUserActionTypes.UPDATE_USER_SUCCESS:
      return { ...state, user: action.payload, dataRequest: false };
    case updateUserActionTypes.UPDATE_USER_FAILED:
      return { ...state, dataFailed: true, dataRequest: false };

    case REMOVE_USER: {
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    }

    case requestActionTypes.GET_DATA_FAILED: {
      return {
        ...state,
        user: null,
        dataFailed: true,
        dataRequest: false,
        isLoggedIn: false,
      };
    }

    default:
      return state;
  }
};

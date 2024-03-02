import {
  IUser,
  requestActionTypes,
  ThunkActionType,
  updateUserActionTypes,
} from "../../types/types";
import {
  ENDPOINT_FOR_LOGIN,
  ENDPOINT_FOR_LOGOUT,
  ENDPOINT_FOR_REGISTER,
  ENDPOINT_FOR_TOKEN,
  ENDPOINT_FOR_USER,
  GET_USER_SUCCESS,
  REGISTER_USER_SUCCES,
  REMOVE_USER,
} from "../../utils/constants";
import {
  getLoginOptions,
  getRegisterOptions,
  getUserOptions,
  logoutOptions,
  refreshTokenOptions,
  request,
  saveTokens,
  updateUserOptions,
} from "../../utils/request";
import { ErrorNotification, InfoNotification } from "../../components/Notifications/Notification";

export function getData() {
  return {
    type: requestActionTypes.GET_DATA_REQUEST,
  };
}

export function getDataFailed() {
  return {
    type: requestActionTypes.GET_DATA_FAILED,
  };
}

// регистрация и авторизация
export function registerUser() {
  return {
    type: REGISTER_USER_SUCCES,
  };
}

export function getUser(user: IUser) {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
}

export function updateUser(user: IUser) {
  return {
    type: updateUserActionTypes.UPDATE_USER_SUCCESS,
    payload: user,
  };
}

export function updateUserRequest() {
  return {
    type: updateUserActionTypes.UPDATE_USER_REQUEST,
  };
}

export function updateUserFailed() {
  return {
    type: updateUserActionTypes.UPDATE_USER_FAILED,
  };
}

export function logout() {
  return {
    type: REMOVE_USER,
  };
}

export const registerUserThunk = (
  name?: string,
  email?: string,
  password?: string
): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData());
    request(ENDPOINT_FOR_REGISTER, getRegisterOptions(name, email, password))
      .then((res) => {
        InfoNotification("Вы успешно зарегистрированы!");
        dispatch(registerUser());
        console.log(res);
        saveTokens(res.refreshToken, res.accessToken);
      })
      .catch((err) => {
        ErrorNotification("Ошибка при регистрации!");
        dispatch(getDataFailed());
        console.log(err);
      });
  };
};

export const authorizeUserThunk = (email?: string, password?: string): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData());
    request(ENDPOINT_FOR_LOGIN, getLoginOptions(email, password))
      .then((res) => {
        InfoNotification("Вы успешно авторизованы!");
        dispatch(registerUser());
        saveTokens(res.refreshToken, res.accessToken);
      })
      .catch((err) => {
        ErrorNotification("Ошибка при входе в профиль!");
        dispatch(getDataFailed());
        console.log(err);
      });
  };
};

export const getUserThunk = (): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData());
    request(ENDPOINT_FOR_USER, getUserOptions())
      .then((res) => {
        // InfoNotification("Получены данные профиля!");
        dispatch(getUser(res.user));
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "jwt expired") {
          ErrorNotification("Токен просрочен!");
          dispatch(refreshTokenThunk(getUserThunk()));
        } else {
          ErrorNotification("Ошибка при получении данных профиля!");
          dispatch(getDataFailed());
        }
      });
  };
};

export const refreshTokenThunk = (action: ThunkActionType): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData());
    request(ENDPOINT_FOR_TOKEN, refreshTokenOptions())
      .then((res) => {
        InfoNotification("Токен обновлен!");
        saveTokens(res.refreshToken, res.accessToken);
        dispatch(action);
      })
      .catch((err) => {
        console.log(err);
        ErrorNotification("Произошла ошибка при обновлении токена!");
        dispatch(getDataFailed());
      });
  };
};

export const updateUserThunk = (user: IUser): ThunkActionType => {
  return (dispatch) => {
    dispatch(updateUserRequest());
    request(ENDPOINT_FOR_USER, updateUserOptions(user))
      .then((res) => {
        InfoNotification("Данные профиля успешно обновлены!");
        dispatch(updateUser(res.user));
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "jwt expired") {
          ErrorNotification("Токен просрочен!");
          dispatch(refreshTokenThunk(updateUserThunk(user)));
        } else {
          ErrorNotification("Ошибка при обновлении данных профиля!");
          dispatch(getDataFailed());
        }
      });
  };
};

export const logoutThunk = (): ThunkActionType => {
  return (dispatch) => {
    dispatch(getData());
    request(ENDPOINT_FOR_LOGOUT, logoutOptions())
      .then(() => {
        InfoNotification("Вы вышли из профиля");
        dispatch(logout());
        saveTokens("", "");
      })
      .catch((err) => {
        console.log(err);
        ErrorNotification("Ошибка выхода из профиля!");
        dispatch(getDataFailed());
      });
  };
};

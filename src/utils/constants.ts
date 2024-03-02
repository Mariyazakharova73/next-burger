export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const WS_URL = "wss://norma.nomoreparties.space/orders";

export const BLANK_CARD = {
  name: "",
  fat: 0,
  proteins: 0,
  carbohydrates: 0,
  calories: 0,
  image_large: "",
};

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const GET_INGREDIENTS = "GET_INGREDIENTS";

export const ENDPOINT_FOR_LOGIN = "auth/login";
export const ENDPOINT_FOR_REGISTER = "auth/register";
export const ENDPOINT_FOR_LOGOUT = "auth/logout";
export const ENDPOINT_FOR_USER = "auth/user";
export const ENDPOINT_FOR_TOKEN = "auth/token";
export const ENDPOINT_FOR_UPDATE_TOKEN = "auth/token";
export const ENDPOINT_FOR_FORGOT_PASSWORD = "password-reset";
export const ENDPOINT_FOR_RESET_PASSWORD = "password-reset/reset";

export const REGISTER_USER_SUCCES = "REGISTER_USER_SUCCES";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const REMOVE_USER = "REMOVE_USER";

export const MAIN_PATH = "/";
export const REGISTER_PATH = "/register";
export const LOGIN_PATH = "/login";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const RESET_PASSWORD_PATH = "/reset-password";
export const PROFILE_PATH = "/profile";
export const PROFILE_ORDERS_PATH = "/profile/orders";
export const PROFILE_ORDER_PATH = "/profile/orders/:id";
export const FEED_PATH = "/feed";
export const FEED_ITEM_PATH = "/feed/:id";
export const INGREDIENT_PATH = "/ingredients/:ingredientId";
export const ERROR_PATH = "*";

import { IUser } from "./../types/types";
import { BASE_URL } from "./constants";
import { getCookie, setCookie } from "./cookie";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const request = (endpoint: RequestInfo | URL, options?: RequestInit | any) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess);
};

export const getOrderOptions = (data: string[]) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  };
};

export const getRegisterOptions = (name?: string, email?: string, password?: string) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  };
};

export const getLoginOptions = (email?: string, password?: string) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
};

export const getFogotPasswordOptions = (email?: string) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  };
};

export const getResetPasswordOptions = (password?: string, code?: string) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  };
};

export const getUserOptions = () => {
  return {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
  };
};

export const refreshTokenOptions = () => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
};

export const saveTokens = (refreshToken: string, accessToken: string) => {
  setCookie("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const updateUserOptions = (user: IUser) => {
  return {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify(user),
  };
};

export const logoutOptions = () => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  };
};

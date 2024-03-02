import { wsActionTypes } from "../../types/wsTypes";
import { getCookie } from "../../utils/cookie";

export function getAllOrders() {
  return { type: wsActionTypes.WS_CONNECTION_START, payload: "/all" };
}

export function getUserOrders() {
  return {
    type: wsActionTypes.WS_CONNECTION_START,
    payload: `?token=${getCookie("accessToken")?.replace("Bearer ", "")}`,
  };
}

export function closeTheConnection() {
  return { type: wsActionTypes.WS_CLOSE };
}

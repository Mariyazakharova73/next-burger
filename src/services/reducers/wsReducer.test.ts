import { wsActionTypes } from "../../types/wsTypes";
import { WS_DATA } from "../../utils/constantsForTests";
import { wsReducer, initialState } from "./wsReducer";

describe("wsReducer", () => {
  it("should return the initial state", () => {
    expect(wsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle WS_CONNECTION_START", () => {
    expect(
      wsReducer(initialState, {
        type: wsActionTypes.WS_CONNECTION_START,
        payload: "",
      })
    ).toEqual({ ...initialState, error: undefined });
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(initialState, {
        type: wsActionTypes.WS_CONNECTION_SUCCESS,
      })
    ).toEqual({ ...initialState, error: undefined, wsConnected: true });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(initialState, {
        type: wsActionTypes.WS_CONNECTION_ERROR,
        payload: {} as any,
      })
    ).toEqual({ ...initialState, error: {}, wsConnected: false });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(initialState, {
        type: wsActionTypes.WS_CONNECTION_CLOSED,
      })
    ).toEqual({ ...initialState, error: undefined, wsConnected: false, data: [] });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(initialState, {
        type: wsActionTypes.WS_GET_MESSAGE,
        payload: WS_DATA,
      })
    ).toEqual({ ...initialState, error: undefined, data: [WS_DATA] });
  });
});

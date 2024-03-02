import { orderActionTypes, requestActionTypes } from "../../types/types";
import { ORDER } from "../../utils/constantsForTests";
import { orderDetailsReducer, initialState } from "./orderDetailsReducer";

describe("orderDetailsReducer", () => {
  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle GET_ORDER_DETAILS", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: orderActionTypes.GET_ORDER_DETAILS,
        payload: ORDER,
      })
    ).toEqual({ ...initialState, order: ORDER });
  });

  it("should handle GET_DATA_REQUEST", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: requestActionTypes.GET_DATA_REQUEST,
      })
    ).toEqual({ ...initialState, dataRequest: true, dataFailed: false });
  });

  it("should handle GET_DATA_FAILED", () => {
    expect(
      orderDetailsReducer(initialState, {
        type: requestActionTypes.GET_DATA_FAILED,
      })
    ).toEqual({ ...initialState, dataFailed: true, dataRequest: false, order: {} });
  });
});

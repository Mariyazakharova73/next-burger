import { orderItemActionTypes } from "../../types/types";
import { INGREDIENT_MAIN, INGREDIENT_SAUSE } from "../../utils/constantsForTests";
import { selectedOrderReducer, initialState } from "./selectedOrderReducer";

describe("selectedOrderReducer", () => {
  it("should return the initial state", () => {
    expect(selectedOrderReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle GET_ORDER_ITEM", () => {
    expect(
      selectedOrderReducer(initialState, {
        type: orderItemActionTypes.GET_ORDER_ITEM,
        payload: [INGREDIENT_SAUSE, INGREDIENT_MAIN],
      })
    ).toEqual({ ...initialState, selectedOrder: [INGREDIENT_SAUSE, INGREDIENT_MAIN] });
  });

  it("should handle DELETE_ORDER_ITEM", () => {
    expect(
      selectedOrderReducer(initialState, {
        type: orderItemActionTypes.DELETE_ORDER_ITEM,
      })
    ).toEqual({ ...initialState, selectedOrder: [] });
  });
});

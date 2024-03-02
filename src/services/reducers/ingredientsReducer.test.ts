import { requestActionTypes } from "../../types/types";
import { GET_INGREDIENTS } from "../../utils/constants";
import { INGREDIENT_MAIN, INGREDIENT_SAUSE } from "../../utils/constantsForTests";
import { ingredientsReducer, initialState } from "./ingredientsReducer";

describe("ingredientsReducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS", () => {
    expect(
      ingredientsReducer(initialState, {
        type: GET_INGREDIENTS,
        payload: [INGREDIENT_SAUSE, INGREDIENT_MAIN],
      })
    ).toEqual({ ...initialState, ingredients: [INGREDIENT_SAUSE, INGREDIENT_MAIN] });
  });

  it("should handle GET_DATA_REQUEST", () => {
    expect(
      ingredientsReducer(initialState, {
        type: requestActionTypes.GET_DATA_REQUEST,
      })
    ).toEqual({ ...initialState, dataRequest: true, dataFailed: false });
  });

  it("should handle GET_DATA_FAILED", () => {
    expect(
      ingredientsReducer(initialState, {
        type: requestActionTypes.GET_DATA_FAILED,
      })
    ).toEqual({ ...initialState, dataFailed: true, dataRequest: false, ingredients: [] });
  });
});

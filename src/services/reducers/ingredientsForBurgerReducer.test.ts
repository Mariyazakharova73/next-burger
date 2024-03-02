import { burgerActionTypes } from "../../types/types";
import { INGREDIENT_SAUSE, INGREDIENT_MAIN } from "../../utils/constantsForTests";
import { ingredientsForBurgerReducer, initialState } from "./ingredientsForBurgerReducer";

describe("ingredientsForBurgerReducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsForBurgerReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle ADD_INGREDIENT", () => {
    expect(
      ingredientsForBurgerReducer(initialState, {  
        type: burgerActionTypes.ADD_INGREDIENT,
        payload: INGREDIENT_SAUSE,
      })
    ).toEqual({
      ...initialState,
      ingredientsForBurger: [...initialState.ingredientsForBurger, INGREDIENT_SAUSE],
    });
  });
 
  it("should handle DELETE_INGREDIENT", () => {
    expect(
      ingredientsForBurgerReducer(initialState, {
        type: burgerActionTypes.DELETE_INGREDIENT,
        payload: "test",
      })
    ).toEqual({
      ...initialState,
      ingredientsForBurger: initialState.ingredientsForBurger.filter(
        (item) => item.dragId !== "test"
      ),
    });
  });

  it("should handle UPDATE_LIST", () => {
    expect(
      ingredientsForBurgerReducer(initialState, {
        type: burgerActionTypes.UPDATE_LIST,
        payload: [INGREDIENT_SAUSE, INGREDIENT_MAIN],
      })
    ).toEqual({
      ...initialState,
      ingredientsForBurger: [INGREDIENT_SAUSE, INGREDIENT_MAIN],
    });
  });

  it("should handle SET_CURRENT_BUN", () => {
    expect(
      ingredientsForBurgerReducer(initialState, {
        type: burgerActionTypes.SET_CURRENT_BUN,
        payload: INGREDIENT_SAUSE,
      })
    ).toEqual({
      ...initialState,
      bun: INGREDIENT_SAUSE,
    });
  });
});

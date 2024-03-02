import { burgerActionTypes, IIngredient } from "../../types/types";

export interface IIngredientsForBurgerState {
  ingredientsForBurger: IIngredient[];
  bun: IIngredient | null;
}

export const initialState: IIngredientsForBurgerState = {
  ingredientsForBurger: [],
  bun: null,
};

export interface IAddIngredientAction {
  type: burgerActionTypes.ADD_INGREDIENT;
  payload: IIngredient;
}

export interface IDeleteIngredientAction {
  type: burgerActionTypes.DELETE_INGREDIENT;
  payload: string;
}

export interface IUpdateListAction {
  type: burgerActionTypes.UPDATE_LIST;
  payload: IIngredient[];
}

export interface ISetCurrentBunAction {
  type: burgerActionTypes.SET_CURRENT_BUN;
  payload: IIngredient;
}

export type IIngredientsForBurgerAction =
  | IAddIngredientAction
  | IUpdateListAction
  | ISetCurrentBunAction
  | IDeleteIngredientAction;

export const ingredientsForBurgerReducer = (
  state = initialState,
  action: IIngredientsForBurgerAction
) => {
  switch (action.type) {
    case burgerActionTypes.ADD_INGREDIENT:
      return { ...state, ingredientsForBurger: [...state.ingredientsForBurger, action.payload] };
    case burgerActionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredientsForBurger: state.ingredientsForBurger.filter(
          (item) => item.dragId !== action.payload
        ),
      };
    case burgerActionTypes.UPDATE_LIST:
      return { ...state, ingredientsForBurger: action.payload };
    case burgerActionTypes.SET_CURRENT_BUN:
      return { ...state, bun: action.payload };
    default:
      return state;
  }
};

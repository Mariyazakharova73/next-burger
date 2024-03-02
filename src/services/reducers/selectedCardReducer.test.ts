import { cardActionTypes } from "../../types/types";
import { BLANK_CARD } from "../../utils/constants";
import { CARD_BUN, CARD_FILLING } from "../../utils/constantsForTests";
import { initialState, selectedCardReducer } from "./selectedCardReducer";

describe("selectedCardReducer", () => {
  it("should return the initial state", () => {
    expect(selectedCardReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle GET_CARD", () => {
    expect(
      selectedCardReducer({} as any, {
        type: cardActionTypes.GET_CARD,
        payload: CARD_BUN,
      })
    ).toEqual({
      selectedCard: CARD_BUN,
    });

    expect(
      selectedCardReducer({} as any, {
        type: cardActionTypes.GET_CARD,
        payload: CARD_FILLING,
      })
    ).toEqual({
      selectedCard: CARD_FILLING,
    });
  });

  it("should handle GET_DELETE", () => {
    expect(
      selectedCardReducer({} as any, {
        type: cardActionTypes.DELETE_CARD,
      })
    ).toEqual({
      selectedCard: BLANK_CARD,
    });
  });
});

import { requestActionTypes, updateUserActionTypes } from "../../types/types";
import { GET_USER_SUCCESS, REGISTER_USER_SUCCES, REMOVE_USER } from "../../utils/constants";
import { USER } from "../../utils/constantsForTests";
import { userReducer, initialState } from "./userReducer";

describe("userReducer", () => {
  it("should return the initial state", () => {
    expect(userReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle GET_DATA_REQUEST", () => {
    expect(
      userReducer(initialState, {
        type: requestActionTypes.GET_DATA_REQUEST,
      })
    ).toEqual({ ...initialState, dataRequest: true, dataFailed: false });
  });

  it("should handle REGISTER_USER_SUCCES", () => {
    expect(
      userReducer(initialState, {
        type: REGISTER_USER_SUCCES,
      })
    ).toEqual({ ...initialState, isLoggedIn: true, dataRequest: false });
  });

  it("should handle GET_USER_SUCCESS", () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_SUCCESS,
        payload: USER,
      })
    ).toEqual({ ...initialState, isLoggedIn: true, user: USER, dataRequest: false });
  });

  it("should handle UPDATE_USER_REQUEST", () => {
    expect(
      userReducer(initialState, {
        type: updateUserActionTypes.UPDATE_USER_REQUEST,
      })
    ).toEqual({ ...initialState, dataRequest: true, dataFailed: false });
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    expect(
      userReducer(initialState, {
        type: updateUserActionTypes.UPDATE_USER_SUCCESS,
        payload: USER,
      })
    ).toEqual({ ...initialState, user: USER, dataRequest: false });
  });

  it("should handle UPDATE_USER_FAILED", () => {
    expect(
      userReducer(initialState, {
        type: updateUserActionTypes.UPDATE_USER_FAILED,
      })
    ).toEqual({ ...initialState, dataFailed: true, dataRequest: false });
  });

  it("should handle REMOVE_USER", () => {
    expect(
      userReducer(initialState, {
        type: REMOVE_USER,
      })
    ).toEqual({ ...initialState, isLoggedIn: false, user: null });
  });

  it("should handle GET_DATA_FAILED", () => {
    expect(
      userReducer(initialState, {
        type: requestActionTypes.GET_DATA_FAILED,
      })
    ).toEqual({
      ...initialState,
      user: null,
      dataFailed: true,
      dataRequest: false,
      isLoggedIn: false,
    });
  });
});

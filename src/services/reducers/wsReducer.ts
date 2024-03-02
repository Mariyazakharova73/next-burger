import { wsActionTypes, TWSActions, IWSData } from "../../types/wsTypes";

interface IWSState {
  wsConnected: boolean;
  data: IWSData[];
  error?: Event;
}

export const initialState: IWSState = {
  wsConnected: false,
  data: [],
};

export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case wsActionTypes.WS_CONNECTION_START:
      return {
        ...state,
        error: undefined,
      };
    case wsActionTypes.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case wsActionTypes.WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case wsActionTypes.WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        data: [],
      };

    case wsActionTypes.WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        data: [action.payload],
      };
    default:
      return state;
  }
};

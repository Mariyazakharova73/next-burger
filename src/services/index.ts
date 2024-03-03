import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { socketMiddleware } from "../services/middleware";
import { TWSStoreActions, wsActionTypes } from "../types/wsTypes";
import { WS_URL } from "../utils/constants";
import { ingredientsForBurgerReducer } from "./reducers/ingredientsForBurgerReducer";
import { ingredientsReducer } from "./reducers/ingredientsReducer";
import { orderDetailsReducer } from "./reducers/orderDetailsReducer";
import { selectedCardReducer } from "./reducers/selectedCardReducer";
import { selectedOrderReducer } from "./reducers/selectedOrderReducer";
import { userReducer } from "./reducers/userReducer";
import { wsReducer } from "./reducers/wsReducer";

export const rootReducer = combineReducers({
  card: selectedCardReducer,
  order: orderDetailsReducer,
  selectedOrder: selectedOrderReducer,
  buy: ingredientsForBurgerReducer,
  ingredients: ingredientsReducer,
  user: userReducer,
  ws: wsReducer,
});

const wsActions: TWSStoreActions = {
  wsInit: wsActionTypes.WS_CONNECTION_START,
  wsSendMessage: wsActionTypes.WS_SEND_MESSAGE,
  onOpen: wsActionTypes.WS_CONNECTION_SUCCESS,
  onClose: wsActionTypes.WS_CONNECTION_CLOSED,
  onError: wsActionTypes.WS_CONNECTION_ERROR,
  onMessage: wsActionTypes.WS_GET_MESSAGE,
  onOrders: wsActionTypes.WS_GET_ORDERS,
  wsClose: wsActionTypes.WS_CLOSE
};


// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(
//     applyMiddleware(thunk, socketMiddleware(wsActions, WS_URL))
//   )
// );

export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;


export const makeStore = () => {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk, socketMiddleware(wsActions, WS_URL))
    )
  );
};

export type AppStore = ReturnType<typeof makeStore>;

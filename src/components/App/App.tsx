import React, { useEffect, useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { deleteCard } from "../../services/actions/actions";
import { getDataIngredients, getDataOrder } from "../../services/actions/actions";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainPage from "../../pages/MainPage/MainPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import FogotPasswordPage from "../../pages/FogotPasswordPage/FogotPasswordPage";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import IngredientDetailsPage from "../../pages/IngredientDetailsPage/IngredientDetailsPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import "react-notifications-component/dist/theme.css";
import { getUserThunk } from "../../services/actions/userActions";
import { getCookie } from "../../utils/cookie";
import { ProtectedRoute } from "../../HOC/ProtectedRoute";
import HistoryOfOrdersPage from "../../pages/HistoryOfOrdersPage/HistoryOfOrdersPage";
import {
  ERROR_PATH,
  FORGOT_PASSWORD_PATH,
  INGREDIENT_PATH,
  LOGIN_PATH,
  MAIN_PATH,
  FEED_PATH,
  FEED_ITEM_PATH,
  PROFILE_ORDERS_PATH,
  PROFILE_ORDER_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  RESET_PASSWORD_PATH,
} from "../../utils/constants";
import FeedItemPage from "../../pages/FeedItemPage/FeedItemPage";
import FeedPage from "../../pages/FeedPage/FeedPage";
import ProfileOrderItemPage from "../../pages/ProfileOrderItemPage/ProfileOrderItemPage";
import { ErrorNotification } from "../Notifications/Notification";

const App: React.FC = () => {
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let background = location.state && location.state.background;
  const ingredientsForBurger = useTypedSelector((state) => state.buy.ingredientsForBurger);
  const bun = useTypedSelector((state) => state.buy.bun);
  const { isLoggedIn } = useTypedSelector((state) => state.user);

  let arrIdWithBuns = React.useMemo<string[]>(() => {
    const arrId = ingredientsForBurger.map((item) => {
      return item._id;
    });
    if (bun) {
      return [...arrId, bun._id, bun._id];
    } else {
      return arrId;
    }
  }, [ingredientsForBurger, bun]);

  useEffect(() => {
    dispatch(getDataIngredients());
    if (getCookie("accessToken")) {
      dispatch(getUserThunk()); // загружаем пользователя
    }
  }, [isLoggedIn]);

  const handleOpenOrder = () => {
    if (isLoggedIn) {
      dispatch(getDataOrder(arrIdWithBuns));
      setIsOpenOrder(true);
    } else {
      ErrorNotification("Необходима авторизация!");
      navigate(LOGIN_PATH);
    }
  };

  const handleClose = () => {
    navigate(-1);
    dispatch(deleteCard());
  };

  const handleOrderModalClose = () => {
    setIsOpenOrder(false);
  };

  return (
    <div className={styles.page}>
      <ReactNotifications />
      <AppHeader />
      <Routes location={background || location}>
        <Route path={MAIN_PATH} element={<MainPage handleOpenOrder={handleOpenOrder} />} />
        <Route
          path={REGISTER_PATH}
          element={
            <ProtectedRoute onlyUnAuth>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={LOGIN_PATH}
          element={
            <ProtectedRoute onlyUnAuth>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={FORGOT_PASSWORD_PATH}
          element={
            <ProtectedRoute onlyUnAuth>
              <FogotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={RESET_PASSWORD_PATH}
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PROFILE_PATH}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PROFILE_ORDERS_PATH}
          element={
            <ProtectedRoute background={background}>
              <HistoryOfOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={PROFILE_ORDER_PATH}
          element={
            <ProtectedRoute>
              <ProfileOrderItemPage />
            </ProtectedRoute>
          }
        />
        <Route path={FEED_PATH} element={<FeedPage />} />
        <Route path={FEED_ITEM_PATH} element={<FeedItemPage />} />
        <Route
          path={INGREDIENT_PATH}
          element={
            <IngredientDetailsPage>
              <IngredientDetails />
            </IngredientDetailsPage>
          }
        />
        <Route path={ERROR_PATH} element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={INGREDIENT_PATH}
            element={
              <Modal onClose={handleClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path={PROFILE_ORDER_PATH}
            element={
              <Modal onClose={handleClose} title="">
                <ProfileOrderItemPage />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path={FEED_ITEM_PATH}
            element={
              <Modal onClose={handleClose} title="">
                <FeedItemPage />
              </Modal>
            }
          />
        </Routes>
      )}
      {isOpenOrder && (
        <Modal onClose={handleOrderModalClose}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default App;

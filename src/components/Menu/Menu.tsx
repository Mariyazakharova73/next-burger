import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PROFILE_ORDERS_PATH, PROFILE_PATH, MAIN_PATH } from "../../utils/constants";
import styles from "../../pages/ProfilePage/ProfilePage.module.css";
import cn from "classnames";
import { logoutThunk } from "../../services/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Menu: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate(MAIN_PATH);
  };
  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        <NavLink
          className={cn(styles.link, "text text_type_main-medium text_color_inactive", {
            [styles.selected]: PROFILE_PATH,
          })}
          to={PROFILE_PATH}
        >
          <p>Профиль</p>
        </NavLink>
        <NavLink
          to={PROFILE_ORDERS_PATH}
          className={cn(styles.link, "text text_type_main-medium text_color_inactive", {
            [styles.selected]: pathname === PROFILE_ORDERS_PATH,
          })}
        >
          <p>История заказов</p>
        </NavLink>
      </nav>
      <button
        className={cn(styles.button, "text text_type_main-medium text_color_inactive")}
        type="button"
        onClick={handleLogout}
      >
        <p>Выход</p>
      </button>
      <p className={cn(styles.text, "text text_type_main-default text_color_inactive mt-20")}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};

export default Menu;

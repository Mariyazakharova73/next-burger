import { useLocation } from "react-router";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { Link } from "react-router-dom";
import cn from "classnames";
import { MAIN_PATH, FEED_PATH, PROFILE_PATH, PROFILE_ORDERS_PATH } from "../../utils/constants";

const AppHeader = () => {
  const { pathname } = useLocation();
  return (
    <header className={cn("pt-4 pb-4", styles.header)}>
      <div className={styles.wrapper}>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link className={styles.link} to={MAIN_PATH}>
                <BurgerIcon type={pathname === MAIN_PATH ? "primary" : "secondary"} />
                <p
                  className={cn("text text_type_main-default text_color_inactive", {
                    [styles.active]: pathname === MAIN_PATH,
                  })}
                >
                  Конструктор
                </p>
              </Link>
            </li>
            <li>
              <Link className={styles.link} to={FEED_PATH}>
                <ListIcon type={pathname === FEED_PATH ? "primary" : "secondary"} />
                <p
                  className={cn("text text_type_main-default text_color_inactive", {
                    [styles.active]: pathname === FEED_PATH,
                  })}
                >
                  Лента заказов
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        <Link to={MAIN_PATH}>
          <div className="ml-33 mr-72">
            <Logo />
          </div>
        </Link>
      </div>
      <Link className={styles.link} to={PROFILE_PATH}>
        <ProfileIcon
          type={
            pathname === PROFILE_PATH || pathname === PROFILE_ORDERS_PATH ? "primary" : "secondary"
          }
        />
        <p
          className={cn("text text_type_main-default text_color_inactive", {
            [styles.active]: pathname === PROFILE_PATH || pathname === PROFILE_ORDERS_PATH,
          })}
        >
          Личный кабинет
        </p>
      </Link>
    </header>
  );
};

export default AppHeader;

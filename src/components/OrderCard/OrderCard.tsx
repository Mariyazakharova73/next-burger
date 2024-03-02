import React from "react";
import styles from "./OrderCard.module.css";
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { IOrderCardProps } from "../../types/types";
import { addDataForIngredients, calculatePrice, getStringDate } from "../../utils/helpers";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getOrderItem } from "../../services/actions/actions";

const OrderCard: React.FC<IOrderCardProps> = ({ item, status }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const ingredients = useTypedSelector((state) => state.ingredients.ingredients);

  const newArr = addDataForIngredients(item.ingredients, ingredients);

  const handleClick = () => {
    dispatch(getOrderItem(newArr));
  };

  return (
    <Link
      key={item._id}
      to={location.pathname === "/feed" ? `/feed/${item._id}` : `/profile/orders/${item._id}`}
      state={{
        background: location,
      }}
      className={cn("", styles.link)}
    >
      <li className={cn("p-6", styles.item)} onClick={handleClick}>
        <div className={cn("mb-6", styles.order)}>
          <p className={cn("text text_type_digits-default", styles.number)}>#{item.number}</p>
          <p className={cn("text text_type_main-small text_color_inactive", styles.date)}>
            {getStringDate(item.createdAt)}
          </p>
        </div>
        <div className="mb-6">
          <h2 className={cn("text text_type_main-medium", styles.title)}>{item.name}</h2>
          {status ? (
            <p
              className={cn("text text_type_main-small mt-2", {
                [styles.done]: item.status,
              })}
            >
              {item.status ? "Выполнен" : "Создан"}
            </p>
          ) : null}
        </div>
        <div className={styles.imageWrapper}>
          <ul className={styles.imageItemWrapper}>
            {newArr?.slice(0, 6).map((ingredient, index: number) => {
              return (
                <li
                  key={index}
                  className={cn(styles.listItem, {
                    [styles.overlay]: item.ingredients?.length > 6 && index === 0,
                  })}
                >
                  <img
                    className={styles.image}
                    src={ingredient?.image}
                    alt={`${ingredient?.name}.`}
                  />
                </li>
              );
            })}
            {item.ingredients?.length > 6 ? (
              <p className={styles.count}>+{item.ingredients?.length - 6}</p>
            ) : null}
          </ul>
          <div className={styles.priceWrapper}>
            <CurrencyIcon type="primary" />
            <p className={cn("text text_type_digits-default", styles.price)}>
              {calculatePrice(newArr)}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default OrderCard;

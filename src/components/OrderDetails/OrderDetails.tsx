import React from "react";
import styles from "./OrderDetails.module.css";
import cn from "classnames";
import image from "../../images/done.svg";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const OrderDetails: React.FC = () => {
  const order = useTypedSelector((state) => state.order.order);
  return (
    order && (
      <div className={styles.wrapper}>
        <h2 className={cn("text text_type_digits-large mt-8", styles.title)}>
          {order.order?.number}
        </h2>
        <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
        <img className="mt-15" src={image} alt="Иконка." />
        <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mt-2 pb-20">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    )
  );
};

export default OrderDetails;

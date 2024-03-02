import React, { useEffect } from "react";
import styles from "./FeedPage.module.css";
import cn from "classnames";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { closeTheConnection, getAllOrders } from "../../services/actions/wsActions";

const FeedPage = () => {
  const allOrders = useTypedSelector((state) => state.ws.data[0]);
  const orders = useTypedSelector((state) => state.ws.data[0]?.orders);
  const dispatch = useAppDispatch();

  const finishedOrders = orders?.filter((item) => {
    return item.status === "done";
  });

  const inWorkOrders = orders?.filter((item) => {
    return item.status !== "done";
  });

  useEffect(() => {
    dispatch(getAllOrders());
    return () => {
      dispatch(closeTheConnection());
    };
  }, []);

  return (
    <main className={cn("pt-10", styles.content)}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <div className={cn("pt-5", styles.wrapper)}>
        <div className={styles.container}>
          <ul className={styles.list}>
            {orders?.map((item) => {
              return <OrderCard key={item.number} item={item} />;
            })}
          </ul>
        </div>

        <div className={styles.digitsContainer}>
          <div className={styles.numbersContainer}>
            <div className={styles.numbersItemContainer}>
              <p className="text text_type_main-medium m-0 pb-6">Готовы:</p>
              <ul className={styles.digitsList}>
                {finishedOrders?.map((item) => {
                  return (
                    <li
                      key={item.number}
                      className={cn("text text_type_digits-default pb-2", styles.digitsText)}
                    >
                      {item.number}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.numbersItemContainer}>
              <p className="text text_type_main-medium m-0 pb-6">В работе:</p>
              <ul className={styles.digitsList}>
                {inWorkOrders?.map((item) => {
                  return (
                    <li key={item.number} className={cn("text text_type_digits-default pb-2")}>
                      {item.number}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium m-0">Выполнено за все время:</p>
            <p className="m-0 text text_type_digits-large">{allOrders?.total}</p>
          </div>
          <div>
            <p className="text text_type_main-medium m-0">Выполнено за сегодня:</p>
            <p className="m-0 text text_type_digits-large">{allOrders?.totalToday}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeedPage;

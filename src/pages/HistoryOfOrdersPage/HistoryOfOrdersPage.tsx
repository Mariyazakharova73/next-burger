import React, { useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import styles from "../HistoryOfOrdersPage/HistoryOfOrdersPage.module.css";
import OrderCard from "../../components/OrderCard/OrderCard";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { closeTheConnection, getUserOrders } from "../../services/actions/wsActions";
import { getCookie } from "../../utils/cookie";

const HistoryOfOrdersPage: React.FC = () => {
  const userOrders = useTypedSelector((state) => state.ws.data[0]);
  const dispatch = useAppDispatch();
  const token = getCookie("accessToken");

  useEffect(() => {
    dispatch(getUserOrders());
    return () => {
      dispatch(closeTheConnection());
    };
  }, [token]);

  return (
    <main className={styles.wrapper}>
      <div className="pt-20">
        <Menu />
      </div>
      <div className={styles.historyCardsWrapper}>
        <ul className={styles.container}>
          {userOrders?.orders?.map((item) => {
            return <OrderCard key={item.number} item={item} status={true} />;
          })}
        </ul>
      </div>
    </main>
  );
};

export default HistoryOfOrdersPage;

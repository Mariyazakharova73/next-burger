import React from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import { ICardListProps } from "../../types/types";

const CardList: React.FC<ICardListProps> = React.forwardRef(({ arr, title }, ref) => {
  return (
    <div className={styles.wrapper}>
      <h2 ref={ref} className="mt-6 text text_type_main-medium">
        {title}
      </h2>
      <ul className={styles.list}>
        {arr.map((item) => {
          return <Card key={item._id} item={item} />;
        })}
      </ul>
    </div>
  );
});

export default CardList;

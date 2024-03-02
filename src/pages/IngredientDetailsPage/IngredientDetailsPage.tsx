import React from "react";
import { IIngredientDetailsPageProps } from "../../types/types";
import styles from "./IngredientDetailsPage.module.css";

const IngredientDetailsPage: React.FC<IIngredientDetailsPageProps> = ({ children }) => {
  return (
    <main className={styles.wrapper}>
      <h1 className="text text_type_main-large">Детали ингредиента</h1>
      {children}
    </main>
  );
};

export default IngredientDetailsPage;

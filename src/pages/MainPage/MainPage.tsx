import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "../../components/App/App.module.css";
import { IBurgerConstructorProps } from "../../types/types";

const MainPage: React.FC<IBurgerConstructorProps> = ({ handleOpenOrder }) => {
  return (
    <main className={styles.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor handleOpenOrder={handleOpenOrder} />
      </DndProvider>
    </main>
  );
};

export default MainPage;

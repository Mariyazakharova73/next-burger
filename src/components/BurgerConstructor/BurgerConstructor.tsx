import React, { useCallback } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructor.module.css";
import cn from "classnames";
import { IBurgerConstructorProps, IIngredient } from "../../types/types";
import uuid from "react-uuid";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { addIngredient, setCurrentBun, updateIngredients } from "../../services/actions/actions";
import OrderedIngredient from "../OrderedIngredient/OrderedIngredient";

const BurgerConstructor: React.FC<IBurgerConstructorProps> = ({ handleOpenOrder }) => {
  const dispatch = useAppDispatch();
  const draggedElements = useTypedSelector((state) => state.buy.ingredientsForBurger);
  const bun = useTypedSelector((state) => state.buy.bun);

  const calculateThePrice = () => {
    const priceOfFillings = draggedElementsWithoutBun.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    if (bun) {
      const priceOfBuns = bun?.price * 2;
      return priceOfFillings + priceOfBuns;
    } else {
      return priceOfFillings;
    }
  };

  const [{ isHover }, dropTargerRef] = useDrop({
    // Такой тип как у перетаскиваемого ингредиента
    accept: "ingredient",
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver(),
    }),
    // выполняем диспатч в стор, в момент "бросания" ингредиента
    drop(item: IIngredient) {
      if (item.type !== "bun") {
        dispatch(addIngredient({ ...item, dragId: uuid() }));
      }
    },
  });

  const [{ isHoverBun }, dropTargerRefBun] = useDrop({
    accept: "ingredient",
    collect: (monitor: DropTargetMonitor) => ({
      isHoverBun: monitor.isOver(),
    }),
    drop(item: IIngredient) {
      if (item.type === "bun") {
        dispatch(setCurrentBun(item));
      }
    },
  });

  // Коллбэк, в котором ингредиенты меняются местами, если один накладывается на другой
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // Получаем перетаскиваемый ингредиент
      const dragCard = draggedElements[dragIndex];
      const newCards = [...draggedElements];
      // Удаляем перетаскиваемый элемент из массива
      newCards.splice(dragIndex, 1);
      // Вставляем элемент на место того элемента, над которым мы навели мышку с "перетаскиванием"
      // создается новый массив, в котором изменен порядок элементов
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch(updateIngredients(newCards));
    },
    [draggedElements, dispatch]
  );

  const draggedElementsWithoutBun = React.useMemo<IIngredient[]>(() => {
    return draggedElements.filter((item) => item.type !== "bun");
  }, [draggedElements]);

  return (
    <section className={cn("pl-4 pt-25", styles.wrapper)}>
      <div
        id="bunContainer"
        ref={dropTargerRefBun}
        className={`${isHoverBun ? styles.onHover : ""}`}
      >
        {bun ? (
          <ConstructorElement
            extraClass={cn("ml-6 mr-2", styles.element)}
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <div className={styles.ingredients}>
            Пожалуйста, перенесите сюда булочку для создания заказа
          </div>
        )}
      </div>
      <ul
        id="list"
        className={cn("pr-2", styles.list, `${isHover ? styles.onHover : ""}`)}
        ref={dropTargerRef}
      >
        {draggedElementsWithoutBun[0] ? (
          draggedElementsWithoutBun.map((item, index) => {
            return (
              <OrderedIngredient key={item.dragId} index={index} item={item} moveCard={moveCard} />
            );
          })
        ) : (
          <div className={styles.ingredients}>Пожалуйста, добавьте ингредиенты</div>
        )}
      </ul>
      {bun && (
        <ConstructorElement
          extraClass={cn("ml-6 mr-2", styles.element)}
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      )}

      <div className={cn("mt-10", styles.container)}>
        <p className={cn("text text_type_digits-medium mr-10", styles.sum)}>
          <>
            {calculateThePrice()}
            <CurrencyIcon type="primary" />
          </>
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={!bun}
          onClick={handleOpenOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;

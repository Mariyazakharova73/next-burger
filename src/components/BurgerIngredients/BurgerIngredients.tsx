import React, { useEffect, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import cn from "classnames";
import CardList from "../CardList/CardList";
import { IIngredient, IOptions } from "../../types/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const BurgerIngredients: React.FC = () => {
  const ingredients = useTypedSelector((state) => state.ingredients.ingredients);

  const [current, setCurrent] = React.useState("Булки");
  const refForBun = useRef<HTMLHeadingElement>(null);
  const refForSause = useRef<HTMLHeadingElement>(null);
  const refForMain = useRef<HTMLHeadingElement>(null);
  const refForContainer = useRef<HTMLHeadingElement>(null);

  const filters = React.useMemo<{
    arrWithBuns: IIngredient[];
    arrWithSauces: IIngredient[];
    arrWithFillings: IIngredient[];
  }>(() => {
    const arrWithBuns = ingredients?.filter((item) => item.type === "bun");
    const arrWithSauces = ingredients?.filter((item) => item.type === "sauce");
    const arrWithFillings = ingredients?.filter((item) => item.type === "main");
    return { arrWithBuns, arrWithSauces, arrWithFillings };
  }, [ingredients]);

  const info = [
    {
      name: "Булки",
      title: refForBun,
      arr: filters.arrWithBuns,
    },
    {
      name: "Соусы",
      title: refForSause,
      arr: filters.arrWithSauces,
    },
    {
      name: "Начинки",
      title: refForMain,
      arr: filters.arrWithFillings,
    },
  ];

  const arr = [refForBun.current, refForSause.current, refForMain.current];

  useEffect(() => {
    let intersectionStatus: IOptions = {};

    const titleObsrever = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectionStatus[entry.target.textContent!] = entry.isIntersecting;
        });
        for (const item in intersectionStatus) {
          if (intersectionStatus[item]) {
            setCurrent(item);
            break;
          }
        }
      },
      { root: refForContainer.current }
    );

    arr.forEach((item) => {
      if (item !== null) {
        titleObsrever.observe(item);
      }
    });
  }, [arr]);

  const handleClick = (refTitle: React.RefObject<HTMLHeadingElement>, textTitle: string) => {
    refTitle.current?.scrollIntoView({
      behavior: "smooth",
    });
    setCurrent(textTitle);
  };

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={cn("pt-5 pb-4", styles.wrapper)}>
        {info.map((item) => {
          return (
            <Tab
              key={item.name}
              value={item.name}
              active={current === item.name}
              onClick={() => {
                handleClick(item.title, item.name);
              }}
            >
              {item.name}
            </Tab>
          );
        })}
      </div>
      <div className={styles.container} ref={refForContainer}>
        {info.map((item) => {
          return <CardList key={item.name} ref={item.title} arr={item.arr} title={item.name} />;
        })}
      </div>
    </section>
  );
};

export default BurgerIngredients;

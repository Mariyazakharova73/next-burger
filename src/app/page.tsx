'use client'

import s from "./page.module.css";

import { ErrorNotification } from '@/components/Notifications/Notification';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getDataOrder } from '@/services/actions/actions';
import { LOGIN_PATH } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";
import { useTypedSelector } from '../hooks/useTypedSelector';

export default function Home() {
  const { isLoggedIn } = useTypedSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { push }= useRouter();
  const ingredientsForBurger = useTypedSelector((state) => state.buy.ingredientsForBurger);
  const bun = useTypedSelector((state) => state.buy.bun);

  let arrIdWithBuns = React.useMemo<string[]>(() => {
    const arrId = ingredientsForBurger.map((item) => {
      return item._id;
    });
    if (bun) {
      return [...arrId, bun._id, bun._id];
    } else {
      return arrId;
    }
  }, [ingredientsForBurger, bun]);

  const handleOpenOrder = () => {
    if (isLoggedIn) {
      dispatch(getDataOrder(arrIdWithBuns));
      setIsOpenOrder(true);
    } else {
      ErrorNotification("Необходима авторизация!");
      push(LOGIN_PATH);
    }
  };


  return (
    <main className={s.content}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor handleOpenOrder={handleOpenOrder} />
      </DndProvider>
    </main>
  );
}
function setIsOpenOrder(arg0: boolean) {
  throw new Error('Function not implemented.');
}


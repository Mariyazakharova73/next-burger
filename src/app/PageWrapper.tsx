"use client";
import { getDataIngredients } from '../services/actions/actions';
import AppHeader from '../components/AppHeader/AppHeader';
import Modal from '../components/Modal/Modal';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useState, type ReactNode, useEffect } from "react";
import { ReactNotifications } from 'react-notifications-component';
import { getCookie } from '../utils/cookie';
import { getUserThunk } from '../services/actions/userActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface Props {
  readonly children: ReactNode;
}

export const PageWrapper = ({ children }: Props) => {

  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useTypedSelector((state) => state.user);
  
  const handleOrderModalClose = () => {
    setIsOpenOrder(false);
  };

  useEffect(() => {
    dispatch(getDataIngredients());
    if (getCookie("accessToken")) {
      dispatch(getUserThunk()); // загружаем пользователя
    }
  }, [dispatch, isLoggedIn]);

  return (
  <div className='page'>
    <ReactNotifications /> 
    <AppHeader />
    {children}
    {isOpenOrder && (
        <Modal onClose={handleOrderModalClose}>
          <OrderDetails />
        </Modal>
      )}
  </div>
  );
};


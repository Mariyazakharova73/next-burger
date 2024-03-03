'use client'

import React, { FormEvent, useEffect } from "react";
import Form from "../../components/Form/Form";
import { ErrorNotification, InfoNotification } from "../../components/Notifications/Notification";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { ENDPOINT_FOR_RESET_PASSWORD, FORGOT_PASSWORD_PATH } from "../../utils/constants";
import { getResetPasswordOptions, request } from "../../utils/request";
import { MAIN_PATH, LOGIN_PATH } from "../../utils/constants";
import { useRouter } from 'next/navigation';

const ResetPasswordPage: React.FC = () => {
  const { push } = useRouter();
  // const location = useLocation();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    request(ENDPOINT_FOR_RESET_PASSWORD, getResetPasswordOptions(values.password, values.code))
      .then(() => {
        InfoNotification("Пароль успешно изменен!");
        push(LOGIN_PATH);
      })
      .catch((err) => {
        ErrorNotification("Произошла ошибка при изменении пароля!");
        console.log(err);
      });
  };

  useEffect(() => {
    // if (location.state !== FORGOT_PASSWORD_PATH) {
    // }
    if (window.history.state !== FORGOT_PASSWORD_PATH) {
      push(MAIN_PATH);
      console.log(window.history.state)
    }
  }, [push]);

  return (
    <main>
      <Form
        title="Изменение пароля"
        buttonText="Сохранить"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors}
      />
    </main>
  );
};

export default ResetPasswordPage;

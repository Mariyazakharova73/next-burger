'use client'

import { useRouter } from 'next/navigation';
import Router from 'next/router';
import React, { FormEvent } from "react";
import { Form } from "../../components/Form/Form";
import { ErrorNotification, InfoNotification } from "../../components/Notifications/Notification";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  ENDPOINT_FOR_FORGOT_PASSWORD,
  FORGOT_PASSWORD_PATH,
  MAIN_PATH,
  RESET_PASSWORD_PATH
} from "../../utils/constants";
import { getFogotPasswordOptions, request } from "../../utils/request";

const FogotPasswordPage: React.FC = () => {
  // const navigate = useNavigate();
  const { push } = useRouter();
  const { isLoggedIn } = useTypedSelector((state) => state.user);
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    request(ENDPOINT_FOR_FORGOT_PASSWORD, getFogotPasswordOptions(values.email))
      .then(() => {
        InfoNotification("Вам на почту отправлено письмо с кодом подтверждения!");
        // navigate(RESET_PASSWORD_PATH, { state: FORGOT_PASSWORD_PATH });
        Router.push({
          pathname: RESET_PASSWORD_PATH
        });
        globalThis.history.pushState(FORGOT_PASSWORD_PATH, "");
      })
      .catch((err) => {
        ErrorNotification("Произошла ошибка при восстановлении пароля!");
        console.log(err);
      });
  };


  if (isLoggedIn) {
    push(MAIN_PATH);
    // return <Navigate to={MAIN_PATH} replace />;
  }

  return (
    <main>
      <Form
        title="Восстановление пароля"
        buttonText="Восстановить"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values || ""}
        isValid={isValid}
        errors={errors}
      />
    </main>
  );
};

export default FogotPasswordPage;

import React, { FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import { ErrorNotification, InfoNotification } from "../../components/Notifications/Notification";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { ENDPOINT_FOR_RESET_PASSWORD, FORGOT_PASSWORD_PATH } from "../../utils/constants";
import { getResetPasswordOptions, request } from "../../utils/request";
import { MAIN_PATH, LOGIN_PATH } from "../../utils/constants";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    request(ENDPOINT_FOR_RESET_PASSWORD, getResetPasswordOptions(values.password, values.code))
      .then(() => {
        InfoNotification("Пароль успешно изменен!");
        navigate(LOGIN_PATH);
      })
      .catch((err) => {
        ErrorNotification("Произошла ошибка при изменении пароля!");
        console.log(err);
      });
  };

  useEffect(() => {
    if (location.state !== FORGOT_PASSWORD_PATH) {
      navigate(MAIN_PATH);
    }
  }, [navigate, location.state]);

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

import React from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import styles from "../Form/Form.module.css";
import { Link, useLocation } from "react-router-dom";
import { IFormProps } from "../../types/types";
import {
  FORGOT_PASSWORD_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  RESET_PASSWORD_PATH,
} from "../../utils/constants";

export const Form: React.FC<IFormProps> = ({
  title,
  buttonText,
  handleSubmit,
  handleChange,
  values,
  errors,
  isValid,
}) => {
  const { pathname } = useLocation();

  const isRegisterPage = pathname === REGISTER_PATH;
  const isLoginPage = pathname === LOGIN_PATH;
  const isFogotPasswordPage = pathname === FORGOT_PASSWORD_PATH;
  const isResetPasswordPage = pathname === RESET_PASSWORD_PATH;

  return (
    <>
      <form className={cn(styles.form, "form")} onSubmit={handleSubmit}>
        <h1 className={cn("text text_type_main-medium", styles.title)}>{title}</h1>
        {isRegisterPage && (
          <Input
            type="text"
            extraClass="mt-6"
            placeholder="Имя"
            name="name"
            size="default"
            onChange={handleChange}
            value={values.name || ""}
            required
            error={!!errors.name}
            errorText={errors.name}
            minLength={2}
          />
        )}
        {isRegisterPage || isLoginPage || isFogotPasswordPage ? (
          <Input
            type="email"
            extraClass="mt-6"
            placeholder={isRegisterPage || isLoginPage ? "E-mail" : "Укажите e-mail"}
            name="email"
            size="default"
            onChange={handleChange}
            value={values.email || ""}
            required
            error={!!errors.email}
            errorText={errors.email}
            minLength={2}
          />
        ) : null}
        {isRegisterPage || isLoginPage || isResetPasswordPage ? (
          <Input
            type="password"
            icon="ShowIcon"
            extraClass="mt-6"
            placeholder={isRegisterPage || isLoginPage ? "Пароль" : "Введите новый пароль"}
            name="password"
            size="default"
            onChange={handleChange}
            value={values.password || ""}
            required
            error={!!errors.password}
            errorText={errors.password}
            minLength={6}
          />
        ) : null}
        {isResetPasswordPage && (
          <Input
            extraClass="mt-6"
            type="text"
            placeholder="Введите код из письма"
            name="code"
            size={"default"}
            onChange={handleChange}
            value={values.code || ""}
            required
            error={!!errors.code}
            errorText={errors.code}
            minLength={2}
          />
        )}
        <Button
          extraClass={cn(styles.button, "mt-6")}
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!isValid}
        >
          {buttonText}
        </Button>
      </form>

      {isRegisterPage && (
        <div className={cn(styles.wrapper, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
          <Link className={styles.link} to={LOGIN_PATH}>
            Войти
          </Link>
        </div>
      )}

      {isLoginPage && (
        <>
          <div className={cn(styles.wrapper, "mt-20")}>
            <p className="text text_type_main-default text_color_inactive">
              Вы - новый пользователь?
            </p>
            <Link className={styles.link} to={REGISTER_PATH}>
              Зарегистрироваться
            </Link>
          </div>
          <div className={cn(styles.wrapper, "mt-4")}>
            <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
            <Link className={styles.link} to={FORGOT_PASSWORD_PATH}>
              Восстановить пароль
            </Link>
          </div>
        </>
      )}
      {isFogotPasswordPage || isResetPasswordPage ? (
        <div className={cn(styles.wrapper, "mt-20")}>
          <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
          <Link className={styles.link} to={LOGIN_PATH}>
            Войти
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Form;

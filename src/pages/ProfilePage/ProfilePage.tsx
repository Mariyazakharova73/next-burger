import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FormEvent, useEffect } from "react";
import styles from "../ProfilePage/ProfilePage.module.css";
import cn from "classnames";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateUserThunk } from "../../services/actions/userActions";
import Menu from "../../components/Menu/Menu";

const ProfilePage: React.FC = () => {
  const [buttonVisible, setButtonVisible] = React.useState(false);
  const [fieldEditing, setFieldEditing] = React.useState({
    name: false,
    email: false,
    password: false,
  });
  const { values, handleChange, errors, isValid, setValues, setErrors } = useFormAndValidation();
  const inputRef = React.useRef(null);
  const { user, isLoggedIn } = useTypedSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(updateUserThunk(values));
    setButtonVisible((prev) => !prev);
  };

  const handleBlur = () => {
    setFieldEditing({ name: false, email: false, password: false });
  };

  useEffect(() => {
    if (isLoggedIn) {
      setValues({ name: user?.name, email: user?.email, password: "******" });
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const handleChangeValue = () => {
      if (
        values.name !== user?.name ||
        values.email !== user?.email ||
        values.password !== "******"
      ) {
        setButtonVisible(true);
      } else {
        setButtonVisible(false);
      }
    };

    if (user) {
      handleChangeValue();
    }
  }, [values]);

  const resetChange = () => {
    setValues({
      name: user?.name,
      email: user?.email,
      password: "******",
    });
    setErrors({});
  };

  return (
    <main className={styles.wrapper}>
      <Menu />
      <form className={cn("form", "ml-15", styles.form)} onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Имя"
          name="name"
          size="default"
          icon={fieldEditing.name ? "CloseIcon" : "EditIcon"}
          onChange={handleChange}
          value={values.name || ""}
          required
          error={!!errors.name}
          errorText={errors.name}
          minLength={2}
          onFocus={() => {
            setFieldEditing({ name: true, email: false, password: false });
          }}
          onBlur={handleBlur}
        />
        <Input
          type="email"
          extraClass="mt-6"
          placeholder="Логин"
          name="email"
          size="default"
          icon={fieldEditing.email ? "CloseIcon" : "EditIcon"}
          onChange={handleChange}
          value={values.email || ""}
          required
          error={!!errors.email}
          errorText={errors.email}
          minLength={2}
          onFocus={() => {
            setFieldEditing({ name: false, email: true, password: false });
          }}
          onBlur={handleBlur}
        />
        <Input
          type="password"
          placeholder="Пароль"
          extraClass="mt-6"
          name="password"
          icon={fieldEditing.password ? "CloseIcon" : "EditIcon"}
          onChange={handleChange}
          value={values.password || ""}
          required
          error={!!errors.password}
          errorText={errors.password}
          minLength={6}
          onFocus={() => {
            setFieldEditing({ name: false, email: false, password: true });
          }}
          onBlur={handleBlur}
        />
        {buttonVisible && (
          <div className={styles.buttonWrapper}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass="mt-6"
              onClick={resetChange}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mt-6"
              disabled={!isValid}
            >
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </main>
  );
};

export default ProfilePage;

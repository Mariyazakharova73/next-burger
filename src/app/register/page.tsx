'use client';
import React, { FormEvent } from "react";
// import { useNavigate } from "react-router";
import Form from "../../components/Form/Form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { registerUserThunk } from "../../services/actions/userActions";
import { MAIN_PATH } from "../../utils/constants";
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useTypedSelector((state) => state.user);
  // const navigate = useNavigate();
  const { push } = useRouter();
  
  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(registerUserThunk(values.name, values.email, values.password));
    if (isLoggedIn) {
      push(MAIN_PATH)
      // navigate(MAIN_PATH);
    }
  };
  console.log(values, 'values')

  return (
    <main>
      <Form
        title="Регистрация"
        buttonText="Зарегистрироваться"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors}
      />
    </main>
  );
};

export default RegisterPage;

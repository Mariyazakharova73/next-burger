'use client';
import React, { FormEvent } from "react";
import { Form } from "../../components/Form/Form";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { authorizeUserThunk } from "../../services/actions/userActions";
import { MAIN_PATH } from "../../utils/constants";
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useTypedSelector((state) => state.user);
  // const navigate = useNavigate();
  const { push } = useRouter();
  
  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(authorizeUserThunk(values.email, values.password));
    if (isLoggedIn) {
      push(MAIN_PATH)
      // navigate(MAIN_PATH);
    }
  };

  return (
    <main>
      <Form
        title="Вход"
        buttonText={"Войти"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        isValid={isValid}
        errors={errors}
      />
    </main>
  );
};

export default LoginPage;
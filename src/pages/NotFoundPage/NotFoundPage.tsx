import React from "react";
import "./NotFoundPage.css";
import { Link } from "react-router-dom";
import { MAIN_PATH } from "../../utils/constants";

const NotFoundPage = () => {
  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link to={MAIN_PATH} className="not-found__link page__link">
        Назад
      </Link>
    </main>
  );
};

export default NotFoundPage;

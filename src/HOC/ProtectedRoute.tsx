import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IProtectedRouteProps } from "../types/types";
import { LOGIN_PATH, MAIN_PATH } from "../utils/constants";

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  onlyUnAuth = false,
  children,
  background = null,
}): ReactElement => {
  const user = useTypedSelector((state) => state.user.user);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: MAIN_PATH } };

  if (background && !user) {
    return <h1>Загрузка...</h1>;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={{ pathname: LOGIN_PATH }} state={{ from: location }} />;
  }

  return children;
};

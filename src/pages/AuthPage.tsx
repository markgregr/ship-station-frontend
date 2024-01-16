// AuthPage.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/AuthForm/AuthForm";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AppDispatch, RootState } from "../redux/store";
import { login } from "../redux/auth/authActions";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";
import { Spin } from "antd"; // Подключаем компонент Spin
import { useNavigate } from "react-router-dom";
import { selectLoading } from "../redux/additional/additionalSelectors";

const AuthPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );
  const loading = useSelector(selectLoading);
  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password, navigate }));
  };

  return (
    <div>
      <NavigationBar />
      {loading ? (
        // Если loading true, отображаем крутилку
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <AuthForm onLogin={handleLogin} isAuthenticated={isAuthenticated} />
      )}
    </div>
  );
};

export default AuthPage;

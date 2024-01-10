// AuthPage.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/AuthForm/AuthForm";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AppDispatch, RootState } from "../redux/store";
import { login } from "../redux/auth/authActions";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";
import { Spin } from "antd"; // Подключаем компонент Spin

const AuthPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );
  const loading = useSelector((state: RootState) => state.auth.loading);
  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password }));
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
        // Иначе отображаем форму входа
        <AuthForm
          onLogin={handleLogin}
          loading={loading}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
};

export default AuthPage;

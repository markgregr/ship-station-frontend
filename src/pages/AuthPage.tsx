// AuthPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom"; // Используем новый хук
import { useDispatch } from "react-redux";
import AuthForm from "../components/AuthForm/AuthForm";
import { login } from "../redux/auth/authActions";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const AuthPage: React.FC = () => {
  const navigate = useNavigate(); // Заменили useHistory на useNavigate
  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password }));
    navigate("/"); // Заменили history.push на navigate
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      <AuthForm onLogin={handleLogin} />
    </div>
  );
};

export default AuthPage;

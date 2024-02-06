import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../components/RegisterForm/RegisterForm.tsx";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { register } from "../redux/auth/authActions";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { selectLoading } from "../redux/additional/additionalSelectors.ts";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const handleRegister = (
    full_name: string,
    email: string,
    password: string
  ) => {
    dispatch(register({ full_name, email, password, navigate }));
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
        <RegisterForm onRegister={handleRegister} />
      )}
    </div>
  );
};

export default RegisterPage;

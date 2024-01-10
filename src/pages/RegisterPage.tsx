import React from "react";
import { useDispatch } from "react-redux";
import RegisterForm from "../components/RegisterForm/RegisterForm.tsx";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { register } from "../redux/auth/authActions";
import { AppDispatch } from "../redux/store";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleRegister = (
    full_name: string,
    email: string,
    password: string
  ) => {
    dispatch(register({ full_name, email, password }));
  };

  return (
    <div>
      <NavigationBar />
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;

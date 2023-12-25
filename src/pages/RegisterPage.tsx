import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "../components/RegisterForm/RegisterForm.tsx";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { register } from "../redux/auth/authActions";
import { AppDispatch } from "../redux/store";
import { selectIsAuthenticated } from "../redux/auth/authSelectors.ts";

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleRegister = (
    full_name: string,
    email: string,
    password: string
  ) => {
    dispatch(register({ full_name, email, password }));
  };

  return (
    <div>
      <NavigationBar
        showConstructor={{
          showConstructorButton: false,
          deliveryID: 0,
        }}
        isAuthenticated={isAuthenticated}
      />
      <RegisterForm onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;

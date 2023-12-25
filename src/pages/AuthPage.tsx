// AuthPage.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/AuthForm/AuthForm";
import { login } from "../redux/auth/authActions";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AppDispatch } from "../redux/store";
import { selectDeliveryID } from "../redux/baggage/baggageListSelectors";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";

const AuthPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password }));
  };
  const deliveryID = useSelector(selectDeliveryID);
  const showConstructor = {
    showConstructorButton: deliveryID > 0,
    deliveryID,
  };
  return (
    <div>
      <NavigationBar
        showConstructor={showConstructor}
        isAuthenticated={isAuthenticated}
      />
      <AuthForm onLogin={handleLogin} />
    </div>
  );
};

export default AuthPage;

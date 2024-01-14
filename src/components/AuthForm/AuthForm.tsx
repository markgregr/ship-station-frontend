import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./AuthForm.module.css";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  onLogin: (email: string, password: string) => void;
  isAuthenticated: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, isAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await onLogin(email, password);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Если вход успешен, переходим на /baggage
      navigate("/baggage");
    }
  }, [navigate]);

  return (
    <Form className={styles.authForm}>
      <Form.Label className={styles.title}>Вход</Form.Label>
      <Form.Group controlId="formEmail" className={styles.formgroup}>
        <Form.Label className={styles.label}>Email:</Form.Label>
        <Form.Control
          className={styles.input}
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className={styles.formgroup}>
        <Form.Label className={styles.label}>Password:</Form.Label>
        <Form.Control
          className={styles.input}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleLogin}
        className={styles.loginButton}
      >
        Вход
      </Button>
      <Button onClick={handleRegister} className={styles.loginButton}>
        Регистрация
      </Button>
    </Form>
  );
};

export default AuthForm;

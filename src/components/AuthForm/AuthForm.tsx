// AuthForm.tsx
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./AuthForm.module.css"; // Путь к файлу стилей

interface AuthFormProps {
  onLogin: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin(email, password);
  };

  return (
    <Form className={styles.authForm}>
      <Form.Label ClassName={styles.title}>Вход</Form.Label>
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
        Login
      </Button>
    </Form>
  );
};

export default AuthForm;
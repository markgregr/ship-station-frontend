// NavbarComponent.tsx
import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import styles from "./NavbarComponent.module.css";

interface NavbarComponentProps {
  onSearch: (shipName: string) => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({ onSearch }) => {
  const [shipName, setShipName] = useState<string>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(shipName);
  };

  const handleShowAllShip = () => {
    setShipName(""); // Очищаем shipName
    onSearch(""); // Вызываем onSearch с пустой строкой
  };

  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Toggle className={styles.toggleButton} />
        <Navbar.Collapse className={styles.collapse}>
          <Nav className={styles.nav}>
            <Nav.Link className={styles.btn} onClick={handleShowAllShip}>
              Весь багаж
            </Nav.Link>
          </Nav>
          <Form className={styles.form} onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Введите код багажа"
              className={styles.searchInput}
              aria-label="Поиск"
              value={shipName}
              onChange={(e) => setShipName(e.target.value)}
            />
            <Button
              variant="outline-success"
              className={styles.btn}
              type="submit"
            >
              Поиск
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

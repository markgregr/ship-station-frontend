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
  onSearch: (searchCode: string) => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({ onSearch }) => {
  const [searchCode, setSearchCode] = useState<string>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchCode);
  };

  const handleShowAllBaggage = () => {
    setSearchCode(""); // Очищаем searchCode
    onSearch(""); // Вызываем onSearch с пустой строкой
  };

  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Toggle className={styles.toggleButton} />
        <Navbar.Collapse className={styles.collapse}>
          <Nav className={styles.nav}>
            <Nav.Link className={styles.navLink} onClick={handleShowAllBaggage}>
              Весь багаж
            </Nav.Link>
          </Nav>
          <Form className={styles.form} onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Введите код багажа"
              className={styles.searchInput}
              aria-label="Поиск"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
            />
            <Button
              variant="outline-success"
              className={styles.searchButton}
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

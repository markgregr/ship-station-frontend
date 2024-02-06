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
import { useDispatch, useSelector } from "react-redux";
import { selectshipName } from "../../redux/ship/shipListSelectors";
import { setshipName } from "../../redux/ship/shipListSlice";

interface NavbarComponentProps {
  onSearch: (shipName: string) => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({ onSearch }) => {
  const dispatch = useDispatch();
  const shipNameRedux = useSelector(selectshipName);
  const initialshipName =
    typeof shipNameRedux === "string" ? shipNameRedux : "";

  const [shipName, setshipNameLocal] = useState<string>(
    decodeURIComponent(initialshipName)
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const encodedshipName = encodeURIComponent(shipName);

    // Передаем cleanedshipName в onSearch
    onSearch(encodedshipName);

    // Сохраняем shipName в Redux (без кодирования)
    dispatch(setshipName(encodedshipName));
  };

  const handleShowAllShip = () => {
    setshipNameLocal("");

    // Передаем пустую строку в onSearch
    onSearch("");

    // Сохраняем пустую строку в Redux и localStorage
    dispatch(setshipName(""));
  };

  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Toggle className={styles.toggleButton} />
        <Navbar.Collapse className={styles.collapse}>
          <Nav className={styles.nav}>
            <Nav.Link className={styles.navLink} onClick={handleShowAllShip}>
              Все суда
            </Nav.Link>
          </Nav>
          <Form className={styles.form} onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Введите название судна"
              className={styles.searchInput}
              aria-label="Поиск"
              value={shipName}
              onChange={(e) => setshipNameLocal(e.target.value)}
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

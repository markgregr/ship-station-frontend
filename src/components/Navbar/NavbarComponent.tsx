// NavbarComponent.tsx
import React, { useState, useEffect } from "react";
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
import { selectSearchCode } from "../../redux/baggage/baggageListSelectors";
import { setSearchCode } from "../../redux/baggage/baggageListSlice";

interface NavbarComponentProps {
  onSearch: (searchCode: string) => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({ onSearch }) => {
  const dispatch = useDispatch();
  const searchCodeRedux = useSelector(selectSearchCode);
  const initialSearchCode =
    typeof searchCodeRedux === "string" ? searchCodeRedux : "";

  const [searchCode, setSearchCodeLocal] = useState<string>(initialSearchCode);

  useEffect(() => {
    // Обновляем локальный state при изменении searchCode в Redux
    setSearchCodeLocal(initialSearchCode);
  }, [initialSearchCode]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchCode);
    // Сохраняем searchCode в Redux и localStorage
    dispatch(setSearchCode(searchCode));
    localStorage.setItem("searchCode", searchCode);
  };

  const handleShowAllBaggage = () => {
    setSearchCodeLocal("");
    onSearch("");
    // Сохраняем searchCode в Redux и localStorage
    dispatch(setSearchCode(""));
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
              placeholder="Поиск"
              className={styles.searchInput}
              aria-label="Поиск"
              value={searchCode}
              onChange={(e) => setSearchCodeLocal(e.target.value)}
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

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

  const [searchCode, setSearchCodeLocal] = useState<string>(
    decodeURIComponent(initialSearchCode)
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const encodedSearchCode = encodeURIComponent(searchCode);

    // Передаем cleanedSearchCode в onSearch
    onSearch(encodedSearchCode);

    // Сохраняем searchCode в Redux (без кодирования)
    dispatch(setSearchCode(encodedSearchCode));
  };

  const handleShowAllBaggage = () => {
    setSearchCodeLocal("");

    // Передаем пустую строку в onSearch
    onSearch("");

    // Сохраняем пустую строку в Redux и localStorage
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

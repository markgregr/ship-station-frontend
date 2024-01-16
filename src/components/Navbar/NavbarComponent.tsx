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
import { selectsearchCode } from "../../redux/baggage/baggageListSelectors";
import { setsearchCode } from "../../redux/baggage/baggageListSlice";

interface NavbarComponentProps {
  onSearch: (searchCode: string) => void;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({ onSearch }) => {
  const dispatch = useDispatch();
  const searchCodeRedux = useSelector(selectsearchCode);
  const initialsearchCode =
    typeof searchCodeRedux === "string" ? searchCodeRedux : "";

  const [searchCode, setsearchCodeLocal] = useState<string>(
    decodeURIComponent(initialsearchCode)
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const encodedsearchCode = encodeURIComponent(searchCode);

    // Передаем cleanedsearchCode в onSearch
    onSearch(encodedsearchCode);

    // Сохраняем searchCode в Redux (без кодирования)
    dispatch(setsearchCode(encodedsearchCode));
  };

  const handleShowAllBaggage = () => {
    setsearchCodeLocal("");

    // Передаем пустую строку в onSearch
    onSearch("");

    // Сохраняем пустую строку в Redux и localStorage
    dispatch(setsearchCode(""));
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
              onChange={(e) => setsearchCodeLocal(e.target.value)}
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

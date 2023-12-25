// NavbarDelivery.tsx
import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import styles from "./NavbarDelivery.module.css"; // Импортируем стили
import { useDispatch } from "react-redux";
import {
  setSearchFlightNumber,
  setStartFormationDate,
  setEndFormationDate,
  setDeliveryStatus,
} from "../../redux/delivery/deliveryListSlice";

interface NavbarDeliveryProps {}

const NavbarDelivery: React.FC<NavbarDeliveryProps> = () => {
  const dispatch = useDispatch();

  const [flightNumber, setFlightNumber] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Сохраняем параметры в Redux
    dispatch(setSearchFlightNumber(flightNumber));
    dispatch(setStartFormationDate(startDate));
    dispatch(setEndFormationDate(endDate));
    dispatch(setDeliveryStatus(status));
  };

  const handleShowAllDeliveries = () => {
    // Очищаем параметры в Redux
    setFlightNumber("");
    setStartDate("");
    setEndDate("");
    setStatus(null);

    dispatch(setSearchFlightNumber(""));
    dispatch(setStartFormationDate(""));
    dispatch(setEndFormationDate(""));
    dispatch(setDeliveryStatus(null));
  };

  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Toggle className={styles.toggleButton} />
        <Navbar.Collapse className={styles.collapse}>
          <Nav className={styles.nav}>
            <Nav.Link
              className={styles.navLink}
              onClick={handleShowAllDeliveries}
            >
              Все доставки
            </Nav.Link>
          </Nav>
          <Form className={styles.form} onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Номер рейса"
              className={`${styles.searchInput} ${styles.datePicker}`} // Применяем стили
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
            <FormControl
              type="date"
              placeholder="Дата начала"
              className={`${styles.searchInput} ${styles.datePicker}`} // Применяем стили
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FormControl
              type="date"
              placeholder="Дата конца"
              className={`${styles.searchInput} ${styles.datePicker}`} // Применяем стили
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Dropdown className={styles.dropdown}>
              <Dropdown.Toggle
                variant="outline-secondary"
                id="dropdown-basic"
                className={styles.dropdownToggle}
              >
                {status || "Выберите статус"}
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles.dropdownContent}>
                <Dropdown.Item
                  onClick={() => setStatus("черновик")}
                  className={styles.dropdownItem}
                >
                  черновик
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setStatus("в работе")}
                  className={styles.dropdownItem}
                >
                  в работе
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setStatus("отклонен")}
                  className={styles.dropdownItem}
                >
                  отклонен
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => setStatus("завершен")}
                  className={styles.dropdownItem}
                >
                  завершен
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-success"
              className={styles.navLink}
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

export default NavbarDelivery;

import React, { useEffect, useRef } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import styles from "./NavbarRequest.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setStartFormationDate,
  setEndFormationDate,
  setRequestStatus,
} from "../../redux/request/requestListSlice";
import debounce from "lodash/debounce";
import {
  selectRequestStatus,
  selectEndFormationDate,
  selectStartFormationDate,
} from "../../redux/request/requestListSelectors";

interface NavbarRequestProps {}

const NavbarRequest: React.FC<NavbarRequestProps> = () => {
  const dispatch = useDispatch();
  const startDate = useSelector(selectStartFormationDate);
  const endDate = useSelector(selectEndFormationDate);
  const status = useSelector(selectRequestStatus);

  const inputRef = useRef<string | null>(null);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    dispatch(setStartFormationDate(newStartDate || null));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    dispatch(setEndFormationDate(newEndDate || null));
  };

  const handleStatusChange = (selectedStatus: string) => {
    if (selectedStatus === "Выберите статус") {
      dispatch(setRequestStatus(null));
    } else {
      dispatch(setRequestStatus(selectedStatus));
    }
  };

  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Form className={styles.form}>
          <FormControl
            type="date"
            placeholder="Дата начала"
            className={`${styles.searchInput} ${styles.datePicker}`}
            value={startDate || ""}
            onChange={handleStartDateChange}
          />
          <FormControl
            type="date"
            placeholder="Дата конца"
            className={`${styles.searchInput} ${styles.datePicker}`}
            value={endDate || ""}
            onChange={handleEndDateChange}
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
              {["в работе", "отклонен", "завершен"].map((s) => (
                <Dropdown.Item
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={styles.dropdownItem}
                >
                  {s}
                </Dropdown.Item>
              ))}
              {status &&
                ["в работе", "отклонен", "завершен"].includes(status) && (
                  <Dropdown.Item
                    key="Выберите статус"
                    onClick={() => handleStatusChange("Выберите статус")}
                    className={styles.dropdownItem}
                  >
                    Выберите статус
                  </Dropdown.Item>
                )}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavbarRequest;

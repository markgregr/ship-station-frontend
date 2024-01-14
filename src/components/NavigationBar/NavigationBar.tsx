// NavigationBar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button"; // Импортируем компонент Button из Bootstrap
import logo from "../../../public/BagTracker.png";
import styles from "./NavigationBar.module.css";
import { logout } from "../../redux/auth/authActions.ts"; // Импортируем экшен для выхода
import {
  selectIsAuthenticated,
  selectfull_name,
} from "../../redux/auth/authSelectors.ts";
import { selectDeliveryID } from "../../redux/baggage/baggageListSelectors.ts";

const NavigationBar: React.FC = () => {
  const dispatch = useDispatch(); // Получаем функцию dispatch из хука useDispatch
  const navigate = useNavigate();
  const full_name = useSelector(selectfull_name);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const deliveryID = useSelector(selectDeliveryID);
  const showConstructor = {
    showConstructorButton: deliveryID > 0,
    deliveryID,
  };
  const handleLogout = () => {
    dispatch(logout()); // Диспатчим экшен для выхода
    navigate("/auth");
  };

  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Collapse className={styles.collapse}>
          <Navbar.Brand as={Link} to="/baggage" className={styles.navbarBrand}>
            <Image src={logo} alt="Logo" className={styles.logo} />
            BagTracker
          </Navbar.Brand>
          <Navbar.Brand className={styles.navbarBrand}>
            {full_name}
          </Navbar.Brand>
          <Nav className={styles.nav}>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/baggage" className={styles.navLink}>
                  Багаж
                </Nav.Link>
                <Nav.Link as={Link} to="/delivery" className={styles.navLink}>
                  Мои заявки
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={`/delivery/${showConstructor.deliveryID}`}
                  disabled={!showConstructor.showConstructorButton}
                  className={`${styles.navLink} ${
                    !showConstructor.showConstructorButton
                      ? styles.disabledLink
                      : ""
                  }`}
                >
                  Конструктор заявки
                </Nav.Link>

                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className={styles.btn}
                >
                  Выйти
                </Button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/baggage" className={styles.navLink}>
                  Багаж
                </Nav.Link>
                <Nav.Link as={Link} to="/auth" className={styles.navLink}>
                  Вход
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

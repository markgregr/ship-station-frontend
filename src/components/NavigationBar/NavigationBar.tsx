// NavigationBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image"; // Добавлен импорт компонента Image
import logo from "./path/to/your/logo.png"; // Замените на путь к вашему логотипу
import styles from "./NavifationBar.module.css";

const NavigationBar: React.FC = () => {
  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Collapse className={styles.collapse}>
          <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
            <Image
              src={"../../../public/BagTracker.png"}
              alt="Logo"
              className={styles.logo}
            />
            BagTracker
          </Navbar.Brand>
          <Nav className={styles.nav}>
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              Главная
            </Nav.Link>
            <Nav.Link as={Link} to="/baggage" className={styles.navLink}>
              Багаж
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
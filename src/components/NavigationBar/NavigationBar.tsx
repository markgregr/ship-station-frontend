// NavigationBar.tsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image"; // Добавлен импорт компонента Image
import logo from "../../../public/ShipStation.png"; // Замените на путь к вашему логотипу
import styles from "./NavifationBar.module.css";

const NavigationBar: React.FC = () => {
  return (
    <Navbar className={styles.navbar}>
      <Container>
        <Navbar.Collapse className={styles.collapse}>
          <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>
            <Image src={logo} alt="Logo" className={styles.logo} />
            ShipStation
          </Navbar.Brand>
          <Nav className={styles.nav}>
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              Суда
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

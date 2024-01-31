// ShipList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./ShipList.module.css";
import { Ship } from "../../types/types";

interface ShipListProps {
  shipData: Ship[];
}

const ShipList: React.FC<ShipListProps> = ({ shipData }) => {
  return (
    <Container>
      <Row className={styles.cards}>
        {shipData.map((item) => (
          <Col key={item.ship_id} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/ship/${item.ship_id}`} className={styles.cardLink}>
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  src={item.photo}
                  className={styles.cardsImg}
                />
                <Card.Body>
                  <Card.Title className={styles.cardsTitle}>
                    {item.ship_name}
                  </Card.Title>
                  <Card.Text className={styles.cardsText}>
                    Страна: {item.flag}
                    <br />
                    Тип: {item.ship_type}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShipList;

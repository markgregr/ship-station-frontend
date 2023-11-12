// BaggageList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./BaggageList.module.css";
import { Baggage } from "../../types/types";

interface BaggageListProps {
  baggageData: Baggage[];
}

const BaggageList: React.FC<BaggageListProps> = ({ baggageData }) => {
  return (
    <Container>
      <Row className={styles.cards}>
        {baggageData.map((item) => (
          <Col key={item.baggage_id} xs={12} sm={6} md={4} lg={3}>
            <Link
              to={`/baggage/${item.baggage_id}`}
              className={styles.cardLink}
            >
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  src={item.photo_url}
                  className={styles.cardsImg}
                />
                <Card.Body>
                  <Card.Title className={styles.cardsTitle}>
                    {item.baggage_code}
                  </Card.Title>
                  <Card.Text className={styles.cardsText}>
                    Авиакомпания: {item.airline} кг
                    <br />
                    Отправитель: {item.owner_name}
                    <br />
                    Тип: {item.baggage_type}
                  </Card.Text>
                  {/* Добавляем кнопку "Удалить багаж" */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BaggageList;

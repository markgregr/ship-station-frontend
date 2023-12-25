// BaggageList.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import styles from "./BaggageList.module.css";
import { Baggage } from "../../redux/baggage/baggageListSlice";
import { combineSlices } from "@reduxjs/toolkit";

interface BaggageListProps {
  baggageData: Baggage[] | { baggages: Baggage[] };
  isDeliveryConstructor: boolean;
  isDeliveryNotDraft: boolean;
  isAuthenticated?: boolean;
  onAddDelivery?: (baggageId: number) => void;
  onRemoveDelivery?: (baggageId: number) => void;
  loading?: boolean;
}

const BaggageList: React.FC<BaggageListProps> = ({
  baggageData,
  isDeliveryConstructor,
  isDeliveryNotDraft,
  isAuthenticated,
  onAddDelivery,
  onRemoveDelivery,
  loading,
}) => {
  return (
    <Container>
      <Row className={styles.cards}>
        {Array.isArray(baggageData) && baggageData.length > 0 ? (
          baggageData.map((item) => (
            <Col key={item.baggage_id} xs={12} sm={6} md={4} lg={3}>
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  src={item.photo}
                  className={styles.cardsImg}
                />
                <Card.Body>
                  <Link
                    to={`/baggage/${item.baggage_id}`}
                    className={styles.cardLink}
                  >
                    <Card.Title className={styles.cardsTitle}>
                      {item.baggage_code}
                    </Card.Title>
                    <Card.Text className={styles.cardsText}>
                      Авиакомпания: {item.airline}
                      <br />
                      Отправитель: {item.owner_name}
                      <br />
                      Тип: {item.baggage_type}
                    </Card.Text>
                  </Link>
                  {isAuthenticated &&
                    !isDeliveryConstructor &&
                    !isDeliveryNotDraft && (
                      <Button
                        variant="success"
                        className={styles.btn}
                        onClick={() =>
                          onAddDelivery && onAddDelivery(item.baggage_id)
                        }
                        disabled={loading}
                      >
                        {loading ? "Добавление..." : "Добавить багаж"}
                      </Button>
                    )}
                  {isDeliveryConstructor && !isDeliveryNotDraft && (
                    <Button
                      variant="danger"
                      className={styles.btn}
                      onClick={() =>
                        onRemoveDelivery && onRemoveDelivery(item.baggage_id)
                      }
                      disabled={loading}
                    >
                      {loading ? "Удаление..." : "Удалить багаж"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No baggage data available</div>
        )}
      </Row>
    </Container>
  );
};

export default BaggageList;

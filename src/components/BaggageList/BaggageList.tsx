// BaggageList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import styles from "./BaggageList.module.css";
import { Baggage } from "../../redux/baggage/baggageListSlice";
import BaggageTable from "../BaggageTable/BaggageTable";

interface BaggageListProps {
  baggageData: Baggage[];
  isDeliveryConstructor: boolean;
  isDeliveryNotDraft: boolean;
  isAuthenticated?: boolean;
  onAddDelivery?: (baggageId: number) => void;
  onRemoveDelivery?: (baggageId: number) => void;
  isAdmin: boolean;
}

const BaggageList: React.FC<BaggageListProps> = ({
  baggageData,
  isDeliveryConstructor,
  isDeliveryNotDraft,
  isAuthenticated,
  onAddDelivery,
  onRemoveDelivery,
  isAdmin,
}) => {
  return (
    <Container>
      {isAdmin ? (
        <BaggageTable
          baggage={baggageData}
          isAdmin={isAdmin}
          isDeliveryConstructor={false}
          isDeliveryNotDraft={false}
          onAddDelivery={onAddDelivery}
        />
      ) : (
        <Row className={styles.cards}>
          {Array.isArray(baggageData) && baggageData.length > 0 ? (
            baggageData.map((item) => (
              <Col key={item.baggage_id} xs={12} sm={6} md={4} lg={3}>
                <Card className={styles.card}>
                  <Card.Img
                    variant="top"
                    src={item.photo_url}
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
                    <div className={styles.buttonsContainer}>
                      {isAuthenticated &&
                        !isDeliveryConstructor &&
                        !isDeliveryNotDraft && (
                          <Button
                            variant="success"
                            className={styles.btn}
                            onClick={() =>
                              onAddDelivery && onAddDelivery(item.baggage_id)
                            }
                          >
                            Добавить багаж
                          </Button>
                        )}
                      {isDeliveryConstructor && !isDeliveryNotDraft && (
                        <Button
                          variant="danger"
                          className={styles.btn}
                          onClick={() =>
                            onRemoveDelivery &&
                            onRemoveDelivery(item.baggage_id)
                          }
                        >
                          Удалить багаж
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Card.Text className={styles.cardsText}>
              Нет доступных багажей
            </Card.Text>
          )}
        </Row>
      )}
    </Container>
  );
};

export default BaggageList;

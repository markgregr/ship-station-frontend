// ShipList.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import styles from "./ShipList.module.css";
import { Ship } from "../../redux/ship/shipListSlice";

interface ShipListProps {
  shipData: Ship[] | undefined;
  isRequestConstructor: boolean;
  isRequestNotDraft: boolean;
  isAuthenticated?: boolean;
  onAddRequest?: (shipId: number) => void;
  onRemoveRequest?: (shipId: number) => void;
}

const ShipList: React.FC<ShipListProps> = ({
  shipData,
  isRequestConstructor,
  isRequestNotDraft,
  isAuthenticated,
  onAddRequest,
  onRemoveRequest,
}) => {
  return (
    <Container>
      <Row className={styles.cards}>
        {Array.isArray(shipData) && shipData.length > 0 ? (
          shipData.map((item) => (
            <Col key={item.ship_id} xs={12} sm={6} md={4} lg={3}>
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  src={item.photo}
                  className={styles.cardsImg}
                />
                <Card.Body>
                  <Link
                    to={`/ship/${item.ship_id}`}
                    className={styles.cardLink}
                  >
                    <Card.Title className={styles.cardsTitle}>
                      {item.ship_name}
                    </Card.Title>
                    <Card.Text className={styles.cardsText}>
                      Флаг: {item.flag}
                      <br />
                      Классификация: {item.classification}
                      <br />
                      Тип судна: {item.ship_type}
                    </Card.Text>
                  </Link>
                  <div className={styles.buttonsContainer}>
                    {isAuthenticated &&
                      !isRequestConstructor &&
                      !isRequestNotDraft && (
                        <Button
                          variant="success"
                          className={styles.btn}
                          onClick={() =>
                            onAddRequest && onAddRequest(item.ship_id)
                          }
                        >
                          Добавить судно
                        </Button>
                      )}
                    {isRequestConstructor && !isRequestNotDraft && (
                      <Button
                        variant="danger"
                        className={styles.btn}
                        onClick={() =>
                          onRemoveRequest && onRemoveRequest(item.ship_id)
                        }
                      >
                        Удалить судно
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Card.Text className={styles.cardsText}>
            Нет доступных судов
          </Card.Text>
        )}
      </Row>
    </Container>
  );
};

export default ShipList;

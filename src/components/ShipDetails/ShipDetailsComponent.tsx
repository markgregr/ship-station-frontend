// ShipDetailsComponent.tsx
import React from "react";
import { Container, Card } from "react-bootstrap";
import styles from "./ShipDetailsComponent.module.css";
import { Ship } from "../../types/types";

interface ShipDetailsComponentProps {
  shipDetails: Ship | null;
}

const ShipDetailsComponent: React.FC<ShipDetailsComponentProps> = ({
  shipDetails,
}) => {
  if (!shipDetails) {
    return <div>Судно недоступно</div>;
  }

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Img
          className={styles.cardImg}
          variant="top"
          src={shipDetails.photo}
        />
        <Card.Body>
          <Card.Title className={styles.cardTitle}>
            {shipDetails.ship_name}
          </Card.Title>
          <Card.Text className={styles.cardText}>
            <strong>Тип судна:</strong> {shipDetails.ship_type}
            <br />
            <strong>Грузоподъемность:</strong> {shipDetails.cargo_capacity} тонн
            <br />
            <strong>Максимальная глубина:</strong> {shipDetails.max_depth} м
            <br />
            <strong>Максимальная длина:</strong> {shipDetails.max_length} м
            <br />
            <strong>Год постройки:</strong> {shipDetails.year_built}
            <br />
            <strong>Флаг:</strong> {shipDetails.flag}
            <br />
            <strong>Классификация:</strong> {shipDetails.classification}
            <br />
            <strong>Экипаж:</strong> {shipDetails.crew_capacity}
            <br />
            <strong>Пассажирская вместимость:</strong>{" "}
            {shipDetails.passenger_capacity}
            <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ShipDetailsComponent;

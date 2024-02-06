// ShipDetailsComponent.tsx
import React from "react";
import { Container, Card } from "react-bootstrap";
import styles from "./ShipDetailsComponent.module.css";
import { ShipDetails } from "../../redux/ship/shipDetailsSlice";

interface ShipDetailsComponentProps {
  shipDetails: ShipDetails | null;
}

const ShipDetailsComponent: React.FC<ShipDetailsComponentProps> = ({
  shipDetails,
}) => {
  if (!shipDetails || !shipDetails) {
    return <div>No ship details available.</div>;
  }

  const {
    flag,
    ship_name,
    classification,
    ship_type,
    cargo_capacity,
    crew_capacity,
    photo,
    passenger_capacity,
    max_depth,
    max_length,
    year_built,
  } = shipDetails;

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Img className={styles.cardImg} variant="top" src={photo} />
        <Card.Body>
          <Card.Title className={styles.cardTitle}>{ship_name}</Card.Title>
          <Card.Text className={styles.cardText}>
            <strong>Флаг:</strong> {flag}
            <br />
            <strong>Тип судна:</strong> {ship_type}
            <br />
            <strong>Классификация:</strong> {classification}
            <br />
            <strong>Вместимость экипажа:</strong> {crew_capacity}
            <br />
            <strong>Вместимость пассажиров:</strong> {passenger_capacity}
            <br />
            <strong>Грузоподъемность:</strong> {cargo_capacity} кг
            <br />
            <strong>Максимальная глубина:</strong> {max_depth}
            <br />
            <strong>Максимальная длина:</strong> {max_length}
            <br />
            <strong>Год постройки:</strong> {year_built}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ShipDetailsComponent;

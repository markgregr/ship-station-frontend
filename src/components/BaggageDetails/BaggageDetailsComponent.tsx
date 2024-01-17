// BaggageDetailsComponent.tsx
import React from "react";
import { Container, Card } from "react-bootstrap";
import styles from "./BaggageDetailsComponent.module.css";
import { BaggageDetails } from "../../redux/baggage/baggageDetailsSlice";

interface BaggageDetailsComponentProps {
  baggageDetails: BaggageDetails | null;
}

const BaggageDetailsComponent: React.FC<BaggageDetailsComponentProps> = ({
  baggageDetails,
}) => {
  if (!baggageDetails || !baggageDetails.baggage) {
    return <div>No baggage details available.</div>;
  }

  const {
    airline,
    baggage_code,
    owner_name,
    pasport_details,
    baggage_type,
    weight,
    size,
    photo_url,
  } = baggageDetails.baggage;

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Img
          className={styles.cardImg}
          variant="top"
          src={photo_url} // используйте photo_url вместо baggageDetails.photo_url
        />
        <Card.Body>
          <Card.Title className={styles.cardTitle}>{baggage_code}</Card.Title>
          <Card.Text className={styles.cardText}>
            <strong>Авиакомпания:</strong> {airline}
            <br />
            <strong>Отправитель:</strong> {owner_name}
            <br />
            <strong>Паспортные данные:</strong> {pasport_details}
            <br />
            <strong>Тип багажа:</strong> {baggage_type}
            <br />
            <strong>Вес:</strong> {weight} kg
            <br />
            <strong>Размер:</strong> {size}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BaggageDetailsComponent;

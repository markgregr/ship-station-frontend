// BaggageDetailsComponent.tsx
import React from "react";
import { Container, Card } from "react-bootstrap";
import styles from "./BaggageDetailsComponent.module.css";
import { Baggage } from "../../types/types";

interface BaggageDetailsComponentProps {
  baggageDetails: Baggage | null;
}

const BaggageDetailsComponent: React.FC<BaggageDetailsComponentProps> = ({
  baggageDetails,
}) => {
  if (!baggageDetails || !baggageDetails.airline) {
    return <div>No baggage details available.</div>;
  }

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Img
          className={styles.cardImg}
          variant="top"
          src={baggageDetails.photo_url}
        />
        <Card.Body>
          <Card.Title className={styles.cardTitle}>
            {baggageDetails.baggage_code}
          </Card.Title>
          <Card.Text className={styles.cardText}>
            <strong>Авиакомпания:</strong> {baggageDetails.airline}
            <br />
            <strong>Отправитель:</strong> {baggageDetails.owner_name}
            <br />
            <strong>Паспортные данные:</strong> {baggageDetails.pasport_details}
            <br />
            <strong>Тип багажа:</strong> {baggageDetails.baggage_type}
            <br />
            <strong>Вес:</strong> {baggageDetails.weight} kg
            <br />
            <strong>Размер:</strong> {baggageDetails.size}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BaggageDetailsComponent;

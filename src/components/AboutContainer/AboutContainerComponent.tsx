// NavigationBar.tsx
import React from "react";
import { Card, Container } from "react-bootstrap";
import styles from "./AboutContainerComponent.module.css";
const AboutContainerComponent: React.FC = () => {
  return (
    <Container className={styles.aboutContainer}>
      <Card>
        <Card.Body>
          <Card.Title className={styles.aboutTitle}>
            Добро пожаловать в BagTracker.
          </Card.Title>
          <Card.Text className={styles.aboutInformation}>
            BagTracker - ваш надежный спутник в мире авиапутешествий. Наш сервис
            позволяет отслеживать текущее местоположение вашего багажа и
            предоставляет информацию о его статусе в реальном времени. Вы также
            можете использовать BagTracker для удобного поиска вашего багажа по
            пункту назначения. С нашим сервисом ваши вещи всегда под вашим
            контролем.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AboutContainerComponent;

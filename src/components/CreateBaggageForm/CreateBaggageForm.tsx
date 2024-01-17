// CreateBaggageForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createBaggage } from "../../redux/baggage/baggageListThunk";
import styles from "./CreateBaggageForm.module.css";
import { useNavigate } from "react-router";
import { selectFormData } from "../../redux/baggage/baggageListSelectors";
import { setFormData } from "../../redux/baggage/baggageListSlice";

interface FormState {
  airline: string;
  baggage_code: string;
  baggage_type: string;
  owner_name: string;
  pasport_details: string;
  size: string;
  weight: number;
}

const CreateBaggageForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const formData = useSelector(selectFormData); // Получаем данные формы из Redux
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Диспетчим действие для обновления данных формы в Redux
    dispatch(
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handlNavigateBaggageList = () => {
    navigate("/baggage");
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      createBaggage({
        airline: formData.airline,
        baggage_code: formData.baggage_code,
        baggage_type: formData.baggage_type,
        owner_name: formData.owner_name,
        pasport_details: formData.pasport_details,
        size: formData.size,
        weight: Number(formData.weight),
        navigate: handlNavigateBaggageList, // Передаем функцию навигации
      })
    );
  };

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.cardTitle}>
            Форма создания багажа
          </Card.Title>
          <Form className={styles.formContainer} onSubmit={handleSubmit}>
            <Form.Group
              className={styles.formGroup}
              controlId="formBaggageCode"
            >
              <Form.Label className={styles.formLabel}>Код багажа</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Enter baggage code"
                name="baggage_code"
                value={formData.baggage_code}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className={styles.formGroup} controlId="formAirline">
              <Form.Label className={styles.formLabel}>Авиакомпания</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Enter airline"
                name="airline"
                value={formData.airline}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="owner_name">
              <Form.Label className={styles.formLabel}>
                ФИО владельца
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Enter owner_name"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group
              className={styles.formGroup}
              controlId="pasport_details"
            >
              <Form.Label className={styles.formLabel}>
                Паспортные данные
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Enter pasport_details"
                name="pasport_details"
                value={formData.pasport_details}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="baggage_type">
              <Form.Label className={styles.formLabel}>Тип багажа</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Enter airline"
                name="baggage_type"
                value={formData.baggage_type}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="weight">
              <Form.Label className={styles.formLabel}>Вес</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Enter weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="size">
              <Form.Label className={styles.formLabel}>Размер</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Enter size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Container className={styles.btnContainer}>
              <Button className={styles.btn} onClick={handleSubmit}>
                Создать багаж
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateBaggageForm;

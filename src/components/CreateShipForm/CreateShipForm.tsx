// CreateShipForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createShip } from "../../redux/ship/shipListThunk";
import styles from "./CreateShipForm.module.css";
import { useNavigate } from "react-router";
import { selectFormData } from "../../redux/ship/shipListSelectors";
import { setFormData } from "../../redux/ship/shipListSlice";

interface FormState {
  flag: string;
  ship_name: string;
  ship_type: string;
  classification: string;
  crew_capacity: number;
  passenger_capacity: number;
  cargo_capacity: number;
  max_depth: number;
  max_length: number;
  year_built: number;
}

const CreateShipForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const formData = useSelector(selectFormData);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handlNavigateShipList = () => {
    navigate("/ship");
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      createShip({
        flag: formData.flag,
        ship_name: formData.ship_name,
        ship_type: formData.ship_type,
        classification: formData.classification,
        crew_capacity: formData.crew_capacity
          ? Number(formData.crew_capacity)
          : 0,
        passenger_capacity: formData.passenger_capacity
          ? Number(formData.passenger_capacity)
          : 0,
        cargo_capacity: formData.cargo_capacity
          ? Number(formData.cargo_capacity)
          : 0,
        max_depth: formData.max_depth ? Number(formData.max_depth) : 0,
        max_length: formData.max_length ? Number(formData.max_length) : 0,
        year_built: formData.year_built ? Number(formData.year_built) : 0,

        navigate: handlNavigateShipList,
      })
    );
  };

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={styles.cardTitle}>
            Форма создания суднa
          </Card.Title>
          <Form className={styles.formContainer} onSubmit={handleSubmit}>
            <Form.Group className={styles.formGroup} controlId="formShipCode">
              <Form.Label className={styles.formLabel}>
                Название судна
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите название"
                name="ship_name"
                value={formData.ship_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className={styles.formGroup} controlId="formFlag">
              <Form.Label className={styles.formLabel}>Флаг</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите флаг"
                name="flag"
                value={formData.flag}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="classification">
              <Form.Label className={styles.formLabel}>
                Классификация
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите классификацию"
                name="classification"
                value={formData.classification}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="ship_type">
              <Form.Label className={styles.formLabel}>Тип судна</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите тип судна"
                name="ship_type"
                value={formData.ship_type}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="cargo_capacity">
              <Form.Label className={styles.formLabel}>
                Грузоподъемность
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите грузоподъемность"
                name="cargo_capacity"
                value={formData.cargo_capacity}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="crew_capacity">
              <Form.Label className={styles.formLabel}>
                Вместимость экипажа
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите вместимость экипажа"
                name="crew_capacity"
                value={formData.crew_capacity}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group
              className={styles.formGroup}
              controlId="passanger_capacity"
            >
              <Form.Label className={styles.formLabel}>
                Вместимость пассажиров
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите вместимость пассажиров"
                name="passenger_capacity" // Здесь должно быть "passenger_capacity"
                value={formData.passenger_capacity}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className={styles.formGroup} controlId="max_depth">
              <Form.Label className={styles.formLabel}>
                Максимальная глубина
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите максимальную глубину"
                name="max_depth"
                value={formData.max_depth}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="max_length">
              <Form.Label className={styles.formLabel}>
                Максимальная длина
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите максимальную длину"
                name="max_length"
                value={formData.max_length}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="year_built">
              <Form.Label className={styles.formLabel}>
                Год постройки
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите год постройки"
                name="year_built"
                value={formData.year_built}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Container className={styles.btnContainer}>
              <Button className={styles.btn} onClick={handleSubmit}>
                Создать судно
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateShipForm;

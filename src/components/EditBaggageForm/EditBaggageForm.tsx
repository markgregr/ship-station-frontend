// EditBaggageForm.jsx
import React from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  BaggageDetails,
  setFormData,
} from "../../redux/baggage/baggageDetailsSlice";
import {
  updateBaggage,
  updateBaggageImage,
} from "../../redux/baggage/baggageDetailsThunk";
import styles from "./EditBaggageForm.module.css";
import { useParams } from "react-router";
import { selectUpdateFormData } from "../../redux/baggage/baggageDetailsSelectors";
import { useNavigate } from "react-router-dom";

interface EditBaggageFormProps {
  baggage: BaggageDetails | null;
}

const EditBaggageForm: React.FC<EditBaggageFormProps> = ({ baggage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const formData = useSelector(selectUpdateFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFile = e.target.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(updateBaggageImage({ id: Number(id), imageData: formData }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightAsNumber = Number(formData.weight);

    if (!isNaN(weightAsNumber)) {
      dispatch(
        updateBaggage({
          id: Number(id) || 0,
          baggage: {
            ...formData,
            weight: weightAsNumber,
          },
          navigate: handlNavigateBaggageList,
        })
      );
    } else {
      console.error("Ошибка: Вес должен быть числом.");
    }
  };

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Body className={styles.cardContent}>
          <Card.Title className={styles.cardTitle}>
            Форма изменения багажа
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className={styles.formGroup} controlId="baggage_code">
              <Form.Label className={styles.formLabel}>Код багажа</Form.Label>
              <Form.Control
                className={`${styles.searchInput}`}
                type="text"
                placeholder="Введите код багажа"
                name="baggage_code"
                value={formData.baggage_code || ""}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="formAirline">
              <Form.Label className={styles.formLabel}>Авиакомпания</Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите авиакомпанию"
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
                placeholder="Введите ФИО владельца"
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
                placeholder="Введите паспортные данные"
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
                placeholder="Введите тип багажа"
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
                placeholder="Введите вес"
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
                placeholder="Введите размер"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className={styles.formGroup} controlId="image">
              <Form.Label className={styles.btnImage}>
                Загрузить изображение
              </Form.Label>
              <div className={styles.customFileInputContainer}>
                <Form.Control
                  className={styles.customFileInput}
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
            </Form.Group>
            <Container className={styles.btnContainer}>
              <Button className={styles.btn} onClick={handleSubmit}>
                Изменить багаж
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditBaggageForm;

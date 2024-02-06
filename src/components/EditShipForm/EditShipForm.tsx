// EditShipForm.jsx
import React from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ShipDetails, setFormData } from "../../redux/ship/shipDetailsSlice";
import { updateShip, updateShipImage } from "../../redux/ship/shipDetailsThunk";
import styles from "./EditShipForm.module.css";
import { useParams } from "react-router";
import { selectUpdateFormData } from "../../redux/ship/shipDetailsSelectors";
import { useNavigate } from "react-router-dom";

interface EditShipFormProps {
  ship: ShipDetails | null;
}

const EditShipForm: React.FC<EditShipFormProps> = ({ ship }) => {
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

  const handlNavigateShipList = () => {
    navigate("/ship");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFile = e.target.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(updateShipImage({ id: Number(id), imageData: formData }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Преобразование числовых значений в числовой тип
    const cargo_capacityAsNumber = Number(formData.cargo_capacity);
    const crew_capacityAsNumber = Number(formData.crew_capacity);
    const passenger_capacityAsNumber = Number(formData.passenger_capacity);
    const max_depthAsNumber = Number(formData.max_depth);
    const max_lengthAsNumber = Number(formData.max_length);
    const year_builtAsNumber = Number(formData.year_built);

    // Проверка, что значения являются числами
    if (
      !isNaN(cargo_capacityAsNumber) &&
      !isNaN(crew_capacityAsNumber) &&
      !isNaN(passenger_capacityAsNumber) &&
      !isNaN(max_depthAsNumber) &&
      !isNaN(max_lengthAsNumber) &&
      !isNaN(year_builtAsNumber)
    ) {
      // Отправка данных с преобразованными числовыми значениями
      dispatch(
        updateShip({
          id: Number(id) || 0,
          ship: {
            ...formData,
            cargo_capacity: cargo_capacityAsNumber,
            crew_capacity: crew_capacityAsNumber,
            passenger_capacity: passenger_capacityAsNumber,
            max_depth: max_depthAsNumber,
            max_length: max_lengthAsNumber,
            year_built: year_builtAsNumber,
          },
          navigate: handlNavigateShipList,
        })
      );
    } else {
      console.error("Ошибка: Все числовые значения должны быть числами.");
    }
  };

  return (
    <Container>
      <Card className={styles.card}>
        <Card.Body className={styles.cardContent}>
          <Card.Title className={styles.cardTitle}>
            Форма изменения судноа
          </Card.Title>
          <Form onSubmit={handleSubmit}>
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
              controlId="passenger_capacity"
            >
              <Form.Label className={styles.formLabel}>
                Вместимость пассажиров
              </Form.Label>
              <Form.Control
                className={`${styles.formGroup} ${styles.searchInput}`}
                type="text"
                placeholder="Введите вместимость пассажиров"
                name="passanger_capacity"
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
                Изменить судно
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditShipForm;

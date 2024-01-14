import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectDeliveryDetails,
  selectError,
} from "../../redux/delivery/deliveryDetailsSelectors";
import { selectDeliveryID } from "../../redux/baggage/baggageListSelectors";
import { AppDispatch } from "../../redux/store";
import {
  deleteDraftDelivery,
  formDelivery,
  getDeliveryDetails,
  updateFlightNumber,
} from "../../redux/delivery/deliveryDetailsThunk";
import { Button, Container, FormControl, Navbar } from "react-bootstrap";
import styles from "./NavbarDeliveryDetails.module.css";
import ErrorAlert from "../Alert/ErrorAlert";

//NavbarDeliveryDetails.tsx
const NavbarDeliveryDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const delivery = useSelector(selectDeliveryDetails);
  const deliveryID = useSelector(selectDeliveryID);
  const error = useSelector(selectError);
  const [loading, setLoading] = useState<boolean>(false);
  const [flight_number, setFlightNumber] = useState("");
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const onFormDelivery = async () => {
    try {
      setLoading(true);
      await dispatch(formDelivery(String(id)));
      console.log(`Delivery formed successfully for id ${id}`);
      navigate("/baggage");
    } catch (error) {
      console.error("Error forming delivery", error);
    } finally {
      setLoading(false);
      // Очистка определенного диспатча (замените YOUR_DISPATCH_ACTION на ваш реальный тип действия)
      dispatch({ type: "setDeliveryDetails", payload: null });
    }
  };
  const onClearDelivery = async () => {
    try {
      setLoading(true);
      await dispatch(deleteDraftDelivery(String(id)));
      navigate("/baggage");
    } catch (error) {
      console.error("Error clearing delivery", error);
    } finally {
      setLoading(false);
      dispatch({ type: "setDeliveryDetails", payload: null });
    }
  };
  const onUpdateFlightNumber = async () => {
    try {
      setLoading(true);

      if (!id) {
        throw new Error("ID не найден");
      }

      // Выполняем новый запрос к серверу для обновления номера рейса
      await dispatch(updateFlightNumber({ id, flight_number }));
      setUpdateStatus("Номер рейса обновлен успешно");

      // После успешного обновления номера рейса, запрашиваем обновленные данные о доставке
      dispatch(getDeliveryDetails(id));
    } catch (error) {
      console.error("Error updating flight number", error);
      setUpdateStatus("Произошла ошибка при обновлении номера рейса");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className={styles.flexContainer}>
      {deliveryID !== 0 && deliveryID === delivery?.delivery_id && (
        <div className={styles.buttonContainer}>
          <Button
            variant="success"
            className={styles.btn}
            onClick={onFormDelivery}
            disabled={loading}
          >
            {loading ? "Сформировать..." : "Сформировать"}
          </Button>
          <Button
            variant="warning"
            className={styles.btn}
            onClick={onClearDelivery}
            disabled={loading}
          >
            {loading ? "Очистить..." : "Очистить"}
          </Button>
          <div className={styles.flightNumberForm}>
            <FormControl
              type="text"
              placeholder="Введите новый номер рейса"
              value={flight_number}
              onChange={(e) => setFlightNumber(e.target.value)}
              className={styles.flightNumberInput}
            />
            <Button
              variant="success"
              className={styles.btn}
              onClick={onUpdateFlightNumber}
              disabled={loading}
            >
              {loading ? "Обновить номер рейса..." : "Обновить номер рейса"}
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};
export default NavbarDeliveryDetails;

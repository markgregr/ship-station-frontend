import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectDeliveryDetails } from "../../redux/delivery/deliveryDetailsSelectors";
import { selectDeliveryID } from "../../redux/baggage/baggageListSelectors";
import { AppDispatch } from "../../redux/store";
import {
  deleteDraftDelivery,
  formDelivery,
  getDeliveryDetails,
  updateFlightNumber,
} from "../../redux/delivery/deliveryDetailsThunk";
import { Button, Container, FormControl } from "react-bootstrap";
import styles from "./NavbarDeliveryDetails.module.css";

//NavbarDeliveryDetails.tsx
const NavbarDeliveryDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const delivery = useSelector(selectDeliveryDetails);
  const deliveryID = useSelector(selectDeliveryID);
  const [loading, setLoading] = useState<boolean>(false);
  const [flight_number, setFlightNumber] = useState("");
  const navigate = useNavigate();
  const onFormDelivery = async () => {
    try {
      setLoading(true);
      await dispatch(formDelivery(String(id)));
    } catch (error) {
      console.error("Error forming delivery", error);
    } finally {
      setLoading(false);
      dispatch({ type: "setDeliveryDetails", payload: null });
    }
  };
  const onClearDelivery = async () => {
    try {
      setLoading(true);
      await dispatch(deleteDraftDelivery(String(id)));
      navigate("/baggage");
    } catch (error) {
    } finally {
      setLoading(false);
      dispatch({ type: "setDeliveryDetails", payload: null });
    }
  };
  const onUpdateFlightNumber = async () => {
    if (!id) {
      throw new Error("ID не найден");
    }
    dispatch(updateFlightNumber({ id, flight_number }));
    dispatch(getDeliveryDetails(id));
  };
  const isFormButtonDisabled =
    loading || !delivery?.baggages || !delivery?.flight_number;
  return (
    <Container className={styles.flexContainer}>
      {deliveryID !== 0 && deliveryID === delivery?.delivery_id && (
        <div className={styles.buttonContainer}>
          <Button
            variant="success"
            className={`${styles.btn} ${
              isFormButtonDisabled ? styles.disabledLink : ""
            }`}
            onClick={onFormDelivery}
            disabled={isFormButtonDisabled}
          >
            {loading ? "Сформировать..." : "Сформировать"}
          </Button>
          <Button
            variant="warning"
            className={styles.btn}
            onClick={onClearDelivery}
            disabled={loading}
          >
            {loading ? "Удалить..." : "Удалить"}
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

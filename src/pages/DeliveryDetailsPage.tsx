// DeliveryDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import {
  formDelivery,
  getDeliveryDetails,
  deleteDraftDelivery,
} from "../redux/delivery/deliveryDetailsThunk";
import { Button, Card, Container } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { selectDeliveryDetails } from "../redux/delivery/deliveryDetailsSelectors";
import { setDeliveryDetails } from "../redux/delivery/deliveryDetailsSlice";
import BaggageList from "../components/BaggageList/BaggageList";
import styles from "../components/BaggageList/BaggageList.module.css";
import { formatDateTime } from "../components/DeliveryTable/Datafunc.ts";
import { selectDeliveryID } from "../redux/baggage/baggageListSelectors.ts";
import { deleteDelivery } from "../redux/baggage/baggageListThunk.ts";
import { selectIsAuthenticated } from "../redux/auth/authSelectors.ts";

const DeliveryDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { id } = useParams<{ id: string | undefined }>();
  const delivery = useSelector(selectDeliveryDetails);
  const deliveryID = useSelector(selectDeliveryID);
  const showConstructor = {
    showConstructorButton: deliveryID > 0,
    deliveryID,
  };
  useEffect(() => {
    if (id) {
      dispatch(getDeliveryDetails(id));
    }

    return () => {
      dispatch(setDeliveryDetails(null));
    };
  }, [dispatch, id]);
  const [loading, setLoading] = useState<boolean>(false);

  const onRemoveDelivery = async (baggageID: number) => {
    try {
      setLoading(true);
      await dispatch(deleteDelivery(baggageID));
      dispatch(getDeliveryDetails(String(deliveryID)));
      console.log(`Delivery deleted successfully for baggage ${baggageID}`);
    } catch (error) {
      console.error("Error deleting delivery", error);
    } finally {
      setLoading(false);
    }
  };

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
      console.log(`Delivery cleared successfully for id ${id}`);
      navigate("/baggage");
    } catch (error) {
      console.error("Error clearing delivery", error);
    } finally {
      setLoading(false);
      // Очистка определенного диспатча (замените YOUR_DISPATCH_ACTION на ваш реальный тип действия)
      dispatch({ type: "setDeliveryDetails", payload: null });
    }
  };

  return (
    <Container>
      <NavigationBar
        showConstructor={showConstructor}
        isAuthenticated={isAuthenticated}
      />
      <Container>
        {delivery && (
          <Card className={styles.cardDel}>
            <Card.Body>
              <Card.Title className={styles.cardsTitleDel}>
                {`ID: ${delivery.delivery_id || ""}`}
              </Card.Title>
              <Card.Text className={styles.cardsTextDel}>
                {`Номер рейса: ${delivery.flight_number || ""}`}
              </Card.Text>
              <Card.Text className={styles.cardsTextDel}>
                {`Статус доставки: ${delivery.delivery_status || ""}`}
              </Card.Text>
              <Card.Text className={styles.cardsTextDel}>
                {`Дата создания: ${formatDateTime(delivery.creation_date)}`}
              </Card.Text>
              <Card.Text className={styles.cardsTextDel}>
                {`Дата формирования: ${formatDateTime(
                  delivery.formation_date
                )}`}
              </Card.Text>
              <Card.Text className={styles.cardsTextDel}>
                {`Дата завершения: ${formatDateTime(delivery.completion_date)}`}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>

      <BaggageList
        baggageData={delivery?.baggages}
        isDeliveryConstructor={deliveryID != 0}
        isDeliveryNotDraft={deliveryID !== delivery?.delivery_id}
        onRemoveDelivery={onRemoveDelivery}
        loading={loading}
      />
      {deliveryID !== 0 && deliveryID === delivery?.delivery_id && (
        <div>
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
        </div>
      )}
    </Container>
  );
};

export default DeliveryDetailsPage;

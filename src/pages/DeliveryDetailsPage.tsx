// DeliveryDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { getDeliveryDetails } from "../redux/delivery/deliveryDetailsThunk";
import { Card, Container } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {
  selectDeliveryDetails,
  selectError,
  selectloading,
} from "../redux/delivery/deliveryDetailsSelectors";
import { setDeliveryDetails } from "../redux/delivery/deliveryDetailsSlice";
import BaggageList from "../components/BaggageList/BaggageList";
import styles from "../components/BaggageList/BaggageList.module.css";
import { formatDateTime } from "../components/DeliveryTable/Datafunc.ts";
import { selectDeliveryID } from "../redux/baggage/baggageListSelectors.ts";
import { deleteDelivery } from "../redux/baggage/baggageListThunk.ts";
import NavbarDeliveryDetails from "../components/NavbarDeliveryDetails/NavbarDeliveryDetails.tsx";
import { Spin } from "antd";
import ErrorAlert from "../components/Alert/ErrorAlert.tsx";

const DeliveryDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const delivery = useSelector(selectDeliveryDetails);
  const deliveryID = useSelector(selectDeliveryID);
  const loading = useSelector(selectloading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (id) {
      dispatch(getDeliveryDetails(id));
    }

    return () => {
      dispatch(setDeliveryDetails(null));
    };
  }, [dispatch, id]);

  const onRemoveDelivery = async (baggageID: number) => {
    try {
      await dispatch(deleteDelivery(baggageID));
      dispatch(getDeliveryDetails(String(deliveryID)));

      console.log(`Delivery deleted successfully for baggage ${baggageID}`);
    } catch (error) {
      console.error("Error deleting delivery", error);
    } finally {
    }
  };

  return (
    <Container>
      <NavigationBar />
      <NavbarDeliveryDetails />
      {error && <ErrorAlert message={error} />}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
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
                  {`Дата завершения: ${formatDateTime(
                    delivery.completion_date
                  )}`}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
      <BaggageList
        baggageData={delivery?.baggages}
        isDeliveryConstructor={deliveryID != 0}
        isDeliveryNotDraft={deliveryID !== delivery?.delivery_id}
        onRemoveDelivery={onRemoveDelivery}
      />
    </Container>
  );
};

export default DeliveryDetailsPage;

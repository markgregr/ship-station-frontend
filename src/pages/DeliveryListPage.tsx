// DeliveryListPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getDeliveries } from "../redux/delivery/deliveryListThunk";
import { Container } from "react-bootstrap";
import DeliveryTable from "../components/DeliveryTable/DeliveryTable";
import styles from "../components/DeliveryTable/DeliveryTable.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {
  selectStartFormationDate,
  selectEndFormationDate,
  selectDeliveryStatus,
  selectSearchFlightNumber,
  selectDeliveries,
  selectloading,
} from "../redux/delivery/deliveryListSelectors";
import { Spin } from "antd";

const DeliveryListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const startFormationDate = useSelector(selectStartFormationDate);
  const endFormationDate = useSelector(selectEndFormationDate);
  const deliveryStatus = useSelector(selectDeliveryStatus);
  const searchFlightNumber = useSelector(selectSearchFlightNumber);
  const deliveries = useSelector(selectDeliveries);
  const loading = useSelector(selectloading);
  const filteredDeliveries = deliveries.filter(
    (deliveries) => deliveries.delivery_status !== "черновик"
  );
  useEffect(() => {
    // Используем параметры для выполнения запроса
    dispatch(
      getDeliveries({
        startFormationDate,
        endFormationDate,
        deliveryStatus,
        searchFlightNumber,
      })
    );
  }, [
    dispatch,
    startFormationDate,
    endFormationDate,
    deliveryStatus,
    searchFlightNumber,
  ]);

  return (
    <Container>
      <NavigationBar />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <section className={styles.section}>
          <DeliveryTable delivery={filteredDeliveries} />
        </section>
      )}
    </Container>
  );
};

export default DeliveryListPage;

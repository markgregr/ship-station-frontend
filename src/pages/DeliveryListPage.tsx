// DeliveryListPage.tsx
import React, { useEffect, useState } from "react";
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
  selectsearchFlightNumber,
  selectDeliveries,
} from "../redux/delivery/deliveryListSelectors";
import { Spin } from "antd";
import { selectLoading } from "../redux/additional/additionalSelectors";
import NavbarDelivery from "../components/NavbarDelivery/NavbarDelivery";

const DeliveryListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const startFormationDate = useSelector(selectStartFormationDate);
  const endFormationDate = useSelector(selectEndFormationDate);
  const deliveryStatus = useSelector(selectDeliveryStatus);
  const searchFlightNumber = useSelector(selectsearchFlightNumber);
  const deliveries = useSelector(selectDeliveries);
  const loading = useSelector(selectLoading);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    setIsFetching(true);
    await dispatch(
      getDeliveries({
        startFormationDate,
        endFormationDate,
        deliveryStatus,
        searchFlightNumber,
      })
    );
    setIsFetching(false);
  };

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchData();
    }, 150);
    return () => clearInterval(fetchInterval);
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
      <NavbarDelivery />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <section className={styles.section}>
          <DeliveryTable delivery={deliveries} />
        </section>
      )}
    </Container>
  );
};

export default DeliveryListPage;

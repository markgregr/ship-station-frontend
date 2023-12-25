// DeliveryListPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
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
} from "../redux/delivery/deliveryListSelectors";
import NavbarDelivery from "../components/NavbarDelivery/NavbarDelivery";
import { selectDeliveryID } from "../redux/baggage/baggageListSelectors";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";

const DeliveryListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const startFormationDate = useSelector(selectStartFormationDate);
  const endFormationDate = useSelector(selectEndFormationDate);
  const deliveryStatus = useSelector(selectDeliveryStatus);
  const searchFlightNumber = useSelector(selectSearchFlightNumber);
  const deliveries = useSelector(selectDeliveries);
  const deliveryID = useSelector(selectDeliveryID);
  const showConstructor = {
    showConstructorButton: deliveryID > 0,
    deliveryID,
  };
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
      <NavigationBar
        showConstructor={showConstructor}
        isAuthenticated={isAuthenticated}
      />
      {/* <NavbarDelivery /> */}
      <section className={styles.section}>
        <DeliveryTable delivery={filteredDeliveries} />
      </section>
    </Container>
  );
};

export default DeliveryListPage;

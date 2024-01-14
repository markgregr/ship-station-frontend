// BaggageListPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../components/Navbar/NavbarComponent";
import BaggageList from "../components/BaggageList/BaggageList";
import styles from "../App.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AppDispatch } from "../redux/store";
import { addDelivery, getBaggageList } from "../redux/baggage/baggageListThunk";
import {
  selectSearchCode,
  selectBaggageData,
  selectNoResults,
  selectloading,
} from "../redux/baggage/baggageListSelectors";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";
import { Spin } from "antd";

const BaggageListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const searchCode = useSelector(selectSearchCode);
  const baggageData = useSelector(selectBaggageData);
  const noResults = useSelector(selectNoResults);
  const loading = useSelector(selectloading);
  useEffect(() => {
    dispatch(getBaggageList(searchCode));
  }, []);

  const handleSearch = (code: string) => {
    dispatch(getBaggageList(code));
  };
  const handleAddDelivery = (baggageId: number) => {
    dispatch(addDelivery(baggageId));
    dispatch(getBaggageList(searchCode));
  };

  return (
    <div className={styles.body}>
      <NavigationBar />
      <NavbarComponent onSearch={handleSearch} />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : noResults ? (
        <div className={styles.pageTitle}>Ничего не найдено</div>
      ) : (
        <BaggageList
          isAuthenticated={isAuthenticated}
          baggageData={baggageData}
          isDeliveryConstructor={false}
          isDeliveryNotDraft={false}
          onAddDelivery={handleAddDelivery}
        />
      )}
    </div>
  );
};

export default BaggageListPage;

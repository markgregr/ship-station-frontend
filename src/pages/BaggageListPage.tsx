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
  selectsearchCode,
  selectBaggageData,
} from "../redux/baggage/baggageListSelectors";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";
import { Spin } from "antd";
import {
  selectLoading,
  selectResult,
  selectisAdmin,
} from "../redux/additional/additionalSelectors";

const BaggageListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const searchCode = useSelector(selectsearchCode);
  const baggageData = useSelector(selectBaggageData);
  const result = useSelector(selectResult);
  const load = useSelector(selectLoading);
  const isAdmin = useSelector(selectisAdmin);
  useEffect(() => {
    dispatch(getBaggageList(searchCode));
  }, []);

  const handleSearch = (code: string) => {
    dispatch(getBaggageList(code));
  };
  const handleAddDelivery = async (baggageId: number) => {
    dispatch(addDelivery(baggageId));
  };

  return (
    <div className={styles.body}>
      <NavigationBar />
      <NavbarComponent onSearch={handleSearch} />
      {load ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : !result ? (
        <div className={styles.pageTitle}>Ничего не найдено</div>
      ) : (
        <BaggageList
          isAuthenticated={isAuthenticated}
          baggageData={baggageData}
          isDeliveryConstructor={false}
          isDeliveryNotDraft={false}
          onAddDelivery={handleAddDelivery}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default BaggageListPage;

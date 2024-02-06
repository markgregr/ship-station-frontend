// ShipListPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../components/Navbar/NavbarComponent";
import ShipList from "../components/ShipList/ShipList";
import styles from "../App.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AppDispatch } from "../redux/store";
import { addRequest, getShipList } from "../redux/ship/shipListThunk";
import {
  selectshipName,
  selectShipData,
} from "../redux/ship/shipListSelectors";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";
import { Spin } from "antd";
import {
  selectLoading,
  selectResult,
  selectisAdmin,
} from "../redux/additional/additionalSelectors";

const ShipListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const shipName = useSelector(selectshipName);
  const shipData = useSelector(selectShipData);
  const result = useSelector(selectResult);
  const load = useSelector(selectLoading);
  const isAdmin = useSelector(selectisAdmin);
  useEffect(() => {
    dispatch(getShipList(shipName));
  }, []);

  const handleSearch = (code: string) => {
    dispatch(getShipList(code));
  };
  const handleAddRequest = (shipId: number) => {
    dispatch(addRequest({ shipID: shipId, shipName: shipName }));
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
        <ShipList
          isAuthenticated={isAuthenticated}
          shipData={shipData}
          isRequestConstructor={false}
          isRequestNotDraft={false}
          onAddRequest={handleAddRequest}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default ShipListPage;

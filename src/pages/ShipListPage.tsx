// MainPage.tsx
import React, { useState } from "react";
import NavbarComponent from "../components/NavbarShipList/NavbarComponent";
import ShipList from "../components/ShipList/ShipList";
import styles from "../App.module.css";
import useFetchShipList from "../hooks/useFetchShipList";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const ShipListPage: React.FC = () => {
  const [shipName, setShipName] = useState<string>("");
  const { shipData, noResults } = useFetchShipList(shipName);

  const handleSearch = (code: string) => {
    setShipName(code);
  };

  return (
    <div className={styles.body}>
      <NavigationBar></NavigationBar>
      <NavbarComponent onSearch={handleSearch} />
      {noResults ? (
        <div className={styles.pageTitle}>Ничего не найдено</div>
      ) : (
        <ShipList shipData={shipData} />
      )}
    </div>
  );
};

export default ShipListPage;

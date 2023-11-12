// MainPage.tsx
import React, { useState } from "react";
import NavbarComponent from "../components/Navbar/NavbarComponent";
import BaggageList from "../components/BaggageList/BaggageList";
import styles from "../App.module.css";
import useFetchBaggageList from "../hooks/useFetchBaggageList";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const BaggageListPage: React.FC = () => {
  const [searchCode, setSearchCode] = useState<string>("");
  const { baggageData, noResults } = useFetchBaggageList(searchCode);

  const handleSearch = (code: string) => {
    setSearchCode(code);
  };

  return (
    <div className={styles.body}>
      <NavigationBar></NavigationBar>
      <NavbarComponent onSearch={handleSearch} />
      {noResults ? (
        <div className={styles.pageTitle}>Ничего не найдено</div>
      ) : (
        <BaggageList baggageData={baggageData} />
      )}
    </div>
  );
};

export default BaggageListPage;

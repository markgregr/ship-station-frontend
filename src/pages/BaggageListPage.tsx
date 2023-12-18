// BaggageListPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarComponent from "../components/Navbar/NavbarComponent";
import BaggageList from "../components/BaggageList/BaggageList";
import styles from "../App.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AppDispatch } from "../redux/store"; // Импорт типа AppDispatch
import { getBaggageList } from "../redux/baggage/baggageListThunk";
import {
  selectSearchCode,
  selectBaggageData,
  selectNoResults,
} from "../redux/baggage/baggageListSelectors";

const BaggageListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Использование AppDispatch

  const searchCode = useSelector(selectSearchCode);
  const baggageData = useSelector(selectBaggageData);
  const noResults = useSelector(selectNoResults);

  useEffect(() => {
    dispatch(getBaggageList(searchCode));
  }, [dispatch, searchCode]);

  const handleSearch = (code: string) => {
    dispatch(getBaggageList(code));
  };

  return (
    <div className={styles.body}>
      <NavigationBar />
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

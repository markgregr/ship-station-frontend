// BaggageListPage.tsx
import React, { useEffect, useState } from "react";
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
  selectDeliveryID,
} from "../redux/baggage/baggageListSelectors";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";

const BaggageListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const searchCode = useSelector(selectSearchCode);
  const baggageData = useSelector(selectBaggageData);
  const noResults = useSelector(selectNoResults);
  const deliveryID = useSelector(selectDeliveryID);
  const showConstructor = {
    showConstructorButton: deliveryID > 0,
    deliveryID,
  };

  useEffect(() => {
    dispatch(getBaggageList(searchCode));
  }, [dispatch, searchCode]);

  const handleSearch = (code: string) => {
    dispatch(getBaggageList(code));
  };

  const [loading, setLoading] = useState<boolean>(false);

  const handleAddDelivery = async (baggageId: number) => {
    try {
      dispatch(getBaggageList(searchCode));
      setLoading(true);
      dispatch(addDelivery(baggageId));
      console.log(`Delivery added successfully for baggage ${baggageId}`);
    } catch (error) {
      console.error("Error adding delivery", error);
      dispatch(getBaggageList(searchCode));
    } finally {
      setLoading(false);
      dispatch(getBaggageList(searchCode));
    }
  };

  return (
    <div className={styles.body}>
      <NavigationBar
        showConstructor={showConstructor}
        isAuthenticated={isAuthenticated}
      />
      <NavbarComponent onSearch={handleSearch} />
      {noResults ? (
        <div className={styles.pageTitle}>Ничего не найдено</div>
      ) : (
        <>
          <BaggageList
            isAuthenticated={isAuthenticated}
            baggageData={baggageData}
            isDeliveryConstructor={false}
            isDeliveryNotDraft={false}
            onAddDelivery={handleAddDelivery}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default BaggageListPage;

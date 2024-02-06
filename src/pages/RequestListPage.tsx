// RequestListPage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getRequests } from "../redux/request/requestListThunk";
import { Container } from "react-bootstrap";
import RequestTable from "../components/RequestTable/RequestTable";
import styles from "../components/RequestTable/RequestTable.module.css";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import {
  selectStartFormationDate,
  selectEndFormationDate,
  selectRequestStatus,
  selectRequests,
} from "../redux/request/requestListSelectors";
import { Spin } from "antd";
import { selectLoading } from "../redux/additional/additionalSelectors";
import NavbarRequest from "../components/NavbarRequest/NavbarRequest";
import { selectRole, selectisAdmin } from "../redux/auth/authSelectors";

const RequestListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const startFormationDate = useSelector(selectStartFormationDate);
  const endFormationDate = useSelector(selectEndFormationDate);
  const requestStatus = useSelector(selectRequestStatus);
  const requests = useSelector(selectRequests);
  const loading = useSelector(selectLoading);
  const role = useSelector(selectRole);
  const isAdmin = useSelector(selectisAdmin);
  const [isFetching, setIsFetching] = useState(false);
  const fetchData = async () => {
    setIsFetching(true);
    await dispatch(
      getRequests({
        startFormationDate,
        endFormationDate,
        requestStatus,
      })
    );
    setIsFetching(false);
  };

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(fetchInterval);
  }, [dispatch, startFormationDate, endFormationDate, requestStatus]);
  return (
    <Container>
      <NavigationBar />
      <NavbarRequest />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <section className={styles.section}>
          <RequestTable request={requests} isAdmin={isAdmin} />
        </section>
      )}
    </Container>
  );
};

export default RequestListPage;

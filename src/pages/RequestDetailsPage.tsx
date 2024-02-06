// RequestDetailsPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store.ts";
import { getRequestDetails } from "../redux/request/requestDetailsThunk.ts";
import { Card, Container } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar/NavigationBar.tsx";
import { selectRequestDetails } from "../redux/request/requestDetailsSelectors.ts";
import { setRequestDetails } from "../redux/request/requestDetailsSlice.ts";
import ShipList from "../components/ShipList/ShipList";
import styles from "../components/ShipList/ShipList.module.css";
import { formatDateTime } from "../components/RequestTable/Datafunc.ts";
import { selectRequestID } from "../redux/ship/shipListSelectors.ts";
import { deleteRequest } from "../redux/ship/shipListThunk.ts";
import NavbarRequestDetails from "../components/NavbarRequestDetails/NavbarRequestDetails.tsx";
import { Spin } from "antd";
import {
  selectLoading,
  selectisAdmin,
} from "../redux/additional/additionalSelectors.ts";

const RequestDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const request = useSelector(selectRequestDetails);
  const requestID = useSelector(selectRequestID);
  const loading = useSelector(selectLoading);
  const isAdmin = useSelector(selectisAdmin);
  useEffect(() => {
    if (id) {
      dispatch(getRequestDetails(id));
    }

    return () => {
      dispatch(setRequestDetails(null));
    };
  }, [dispatch, id]);

  const onRemoveRequest = async (shipID: number) => {
    try {
      await dispatch(deleteRequest(shipID));
      dispatch(getRequestDetails(String(requestID)));
    } catch (error) {
    } finally {
    }
  };

  return (
    <Container>
      <NavigationBar />
      <NavbarRequestDetails />
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Container>
          {request && (
            <Card className={styles.cardDel}>
              <Card.Body>
                <Card.Title className={styles.cardsTitleDel}>
                  {`ID: ${request.request_id || ""}`}
                </Card.Title>
                <Card.Text className={styles.cardsTextDel}>
                  {`Статус заявки: ${request.request_status || ""}`}
                </Card.Text>
                <Card.Text className={styles.cardsTextDel}>
                  {`Дата создания: ${formatDateTime(request.creation_date)}`}
                </Card.Text>
                <Card.Text className={styles.cardsTextDel}>
                  {`Дата формирования: ${formatDateTime(
                    request.formation_date
                  )}`}
                </Card.Text>
                <Card.Text className={styles.cardsTextDel}>
                  {`Дата завершения: ${formatDateTime(
                    request.completion_date
                  )}`}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Container>
      )}
      <ShipList
        isAdmin={isAdmin}
        shipData={request?.ships}
        isRequestConstructor={requestID != 0}
        isRequestNotDraft={requestID !== request?.request_id}
        onRemoveRequest={onRemoveRequest}
      />
    </Container>
  );
};

export default RequestDetailsPage;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectRequestDetails } from "../../redux/request/requestDetailsSelectors";
import { selectRequestID } from "../../redux/ship/shipListSelectors";
import { AppDispatch } from "../../redux/store";
import {
  deleteDraftRequest,
  formRequest,
  getRequestDetails,
} from "../../redux/request/requestDetailsThunk";
import { Button, Container, FormControl } from "react-bootstrap";
import styles from "./NavbarRequestDetails.module.css";

//NavbarRequestDetails.tsx
const NavbarRequestDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const request = useSelector(selectRequestDetails);
  const requestID = useSelector(selectRequestID);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const onFormRequest = async () => {
    try {
      setLoading(true);
      await dispatch(formRequest(String(id)));
      navigate("/ship");
    } catch (error) {
    } finally {
      setLoading(false);
      dispatch({ type: "setRequestDetails", payload: null });
    }
  };
  const onClearRequest = async () => {
    try {
      setLoading(true);
      await dispatch(deleteDraftRequest(String(id)));
      navigate("/ship");
    } catch (error) {
    } finally {
      setLoading(false);
      dispatch({ type: "setRequestDetails", payload: null });
    }
  };
  const isFormButtonDisabled = loading || !request?.ships;
  return (
    <Container className={styles.flexContainer}>
      {requestID !== 0 && requestID === request?.request_id && (
        <div className={styles.buttonContainer}>
          <Button
            variant="success"
            className={`${styles.btn} ${
              isFormButtonDisabled ? styles.disabledLink : ""
            }`}
            onClick={onFormRequest}
            disabled={isFormButtonDisabled}
          >
            {loading ? "Сформировать..." : "Сформировать"}
          </Button>
          <Button
            variant="warning"
            className={styles.btn}
            onClick={onClearRequest}
            disabled={loading}
          >
            {loading ? "Удалить..." : "Удалить"}
          </Button>
        </div>
      )}
    </Container>
  );
};
export default NavbarRequestDetails;

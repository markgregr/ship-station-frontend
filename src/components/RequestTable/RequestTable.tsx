import React from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./RequestTable.module.css";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "./Datafunc";
import { updateRequestStatusForModerator } from "../../redux/request/requestDetailsThunk";
import { useDispatch, useSelector } from "react-redux";
import { selectOwnerName } from "../../redux/request/requestListSelectors";

interface RequestTableProps {
  request: {
    request_id: number;
    request_status: string;
    creation_date: string;
    formation_date: string;
    completion_date: string;
    full_name: string;
    moderator_name?: string;
  }[];
  isAdmin: boolean;
}
const RequestTable: React.FC<RequestTableProps> = ({ request, isAdmin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ownerName = useSelector(selectOwnerName);
  const handleRowClick = (requestID: number, e: React.MouseEvent) => {
    navigate(`/request/${requestID}`);
    e.stopPropagation();
  };

  const handleCompleteClick = async (
    requestID: number,
    e: React.MouseEvent
  ) => {
    dispatch(
      updateRequestStatusForModerator({
        requestId: requestID.toString(),
        requestStatus: "завершен",
      }) as any
    );
    e.stopPropagation();
  };

  const handleRejectClick = async (requestID: number, e: React.MouseEvent) => {
    dispatch(
      updateRequestStatusForModerator({
        requestId: requestID.toString(),
        requestStatus: "отклонен",
      }) as any
    );
    e.stopPropagation();
  };

  return (
    <Table className={styles.table}>
      <thead className={styles.tblHeader}>
        <tr>
          {isAdmin && <th className={styles.th}>Создатель</th>}
          {isAdmin && <th className={styles.th}>Модератор</th>}
          <th className={styles.th}>Статус</th>
          <th className={styles.th}>Дата создания</th>
          <th className={styles.th}>Дата формирования</th>
          <th className={styles.th}>Дата завершения</th>
          <th className={styles.th}>Действия</th>
        </tr>
      </thead>
      <tbody className={styles.tblContent}>
        {request &&
          request.length > 0 &&
          request
            .filter((requestItem) =>
              ownerName ? requestItem.full_name.includes(ownerName) : true
            )
            .map((requestItem) => (
              <tr
                key={requestItem.request_id}
                className={`${styles.tr} ${styles.clickable}`}
              >
                {isAdmin && (
                  <td className={styles.td}>{requestItem.full_name}</td>
                )}
                {isAdmin && (
                  <td className={styles.td}>
                    {requestItem.moderator_name || "Отсутствует"}
                  </td>
                )}
                <td className={styles.td}>{requestItem.request_status}</td>
                <td className={styles.td}>
                  {formatDateTime(requestItem.creation_date)}
                </td>
                <td className={styles.td}>
                  {formatDateTime(requestItem.formation_date)}
                </td>
                <td className={styles.td}>
                  {formatDateTime(requestItem.completion_date)}
                </td>
                <td className={styles.td}>
                  {isAdmin && requestItem.request_status === "в работе" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className={`${styles.btn} ${
                          requestItem.request_status !== "в работе"
                            ? styles.disabledLink
                            : ""
                        }`}
                        onClick={(e) =>
                          handleCompleteClick(requestItem.request_id, e)
                        }
                        disabled={
                          requestItem.request_status !== "в работе" && isAdmin
                        }
                      >
                        Завершить
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className={`${styles.btn} ${
                          requestItem.request_status !== "в работе"
                            ? styles.disabledLink
                            : ""
                        }`}
                        onClick={(e) =>
                          handleRejectClick(requestItem.request_id, e)
                        }
                        disabled={
                          requestItem.request_status !== "в работе" && isAdmin
                        }
                      >
                        Отклонить
                      </Button>
                    </>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    className={`${styles.btn}`}
                    onClick={(e) => handleRowClick(requestItem.request_id, e)}
                  >
                    Подробнее
                  </Button>
                </td>
                {/* </>
              )} */}
              </tr>
            ))}
      </tbody>
    </Table>
  );
};

export default RequestTable;

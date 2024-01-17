import React from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./DeliveryTable.module.css";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "./Datafunc";
import { updateDeliveryStatusForModerator } from "../../redux/delivery/deliveryDetailsThunk";
import { useDispatch } from "react-redux";

interface DeliveryTableProps {
  delivery: {
    delivery_id: number;
    delivery_status: string;
    flight_number: string;
    creation_date: string;
    formation_date: string;
    completion_date: string;
    full_name: string;
    moderator_name?: string;
  }[];
  isAdmin: boolean;
}
const DeliveryTable: React.FC<DeliveryTableProps> = ({ delivery, isAdmin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRowClick = (deliveryID: number, e: React.MouseEvent) => {
    navigate(`/delivery/${deliveryID}`);
    e.stopPropagation();
  };

  const handleCompleteClick = async (
    deliveryID: number,
    e: React.MouseEvent
  ) => {
    dispatch(
      updateDeliveryStatusForModerator({
        deliveryId: deliveryID.toString(),
        deliveryStatus: "завершен",
      }) as any
    );
    e.stopPropagation();
  };

  const handleRejectClick = async (deliveryID: number, e: React.MouseEvent) => {
    dispatch(
      updateDeliveryStatusForModerator({
        deliveryId: deliveryID.toString(),
        deliveryStatus: "отклонен",
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
          <th className={styles.th}>Номер рейса</th>
          <th className={styles.th}>Дата создания</th>
          <th className={styles.th}>Дата формирования</th>
          <th className={styles.th}>Дата завершения</th>
          {isAdmin && (
            <>
              <th className={styles.th}>Действия</th>
            </>
          )}
        </tr>
      </thead>
      <tbody className={styles.tblContent}>
        {delivery.map((deliveryItem) => (
          <tr
            key={deliveryItem.delivery_id}
            className={`${styles.tr} ${styles.clickable}`}
            onClick={(e) => handleRowClick(deliveryItem.delivery_id, e)}
          >
            {isAdmin && <td className={styles.td}>{deliveryItem.full_name}</td>}
            {isAdmin && (
              <td className={styles.td}>
                {deliveryItem.moderator_name || "Отсутствует"}
              </td>
            )}
            <td className={styles.td}>{deliveryItem.delivery_status}</td>
            <td className={styles.td}>{deliveryItem.flight_number}</td>
            <td className={styles.td}>
              {formatDateTime(deliveryItem.creation_date)}
            </td>
            <td className={styles.td}>
              {formatDateTime(deliveryItem.formation_date)}
            </td>
            <td className={styles.td}>
              {formatDateTime(deliveryItem.completion_date)}
            </td>
            {isAdmin && (
              <>
                <td className={styles.td}>
                  <Button
                    variant="success"
                    size="sm"
                    className={`${styles.btn} ${
                      deliveryItem.delivery_status !== "в работе"
                        ? styles.disabledLink
                        : ""
                    }`}
                    onClick={(e) =>
                      handleCompleteClick(deliveryItem.delivery_id, e)
                    }
                    disabled={
                      deliveryItem.delivery_status !== "в работе" && isAdmin
                    }
                  >
                    Завершить
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className={`${styles.btn} ${
                      deliveryItem.delivery_status !== "в работе"
                        ? styles.disabledLink
                        : ""
                    }`}
                    onClick={(e) =>
                      handleRejectClick(deliveryItem.delivery_id, e)
                    }
                    disabled={
                      deliveryItem.delivery_status !== "в работе" && isAdmin
                    }
                  >
                    Отклонить
                  </Button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DeliveryTable;

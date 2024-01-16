import React from "react";
import { Table } from "react-bootstrap";
import styles from "./DeliveryTable.module.css";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "./Datafunc";

interface DeliveryTableProps {
  delivery: {
    delivery_id: number;
    delivery_status: string;
    flight_number: string;
    creation_date: string;
    formation_date: string;
    completion_date: string;
  }[];
}

const DeliveryTable: React.FC<DeliveryTableProps> = ({ delivery }) => {
  const navigate = useNavigate();

  const handleRowClick = (deliveryId: number) => {
    // Переадресация на другую страницу
    navigate(`/delivery/${deliveryId}`);
  };

  return (
    <Table className={styles.table}>
      <thead className={styles.tblHeader}>
        <tr>
          <th className={styles.th}>Статус</th>
          <th className={styles.th}>Номер рейса</th>
          <th className={styles.th}>Дата создания</th>
          <th className={styles.th}>Дата формирования</th>
          <th className={styles.th}>Дата завершения</th>
        </tr>
      </thead>
      <tbody className={styles.tblContent}>
        {delivery.map((deliveryItem) => (
          <tr
            key={deliveryItem.delivery_id}
            className={`${styles.tr} ${styles.clickable}`}
            onClick={() => handleRowClick(deliveryItem.delivery_id)}
          >
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DeliveryTable;

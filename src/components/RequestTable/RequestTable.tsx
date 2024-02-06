import React from "react";
import { Table } from "react-bootstrap";
import styles from "./RequestTable.module.css";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "./Datafunc";

interface RequestTableProps {
  request: {
    request_id: number;
    request_status: string;
    creation_date: string;
    formation_date: string;
    completion_date: string;
  }[];
}

const RequestTable: React.FC<RequestTableProps> = ({ request }) => {
  const navigate = useNavigate();

  const handleRowClick = (requestId: number) => {
    // Переадресация на другую страницу
    navigate(`/request/${requestId}`);
  };

  return (
    <Table className={styles.table}>
      <thead className={styles.tblHeader}>
        <tr>
          <th className={styles.th}>Статус</th>
          <th className={styles.th}>Дата создания</th>
          <th className={styles.th}>Дата формирования</th>
          <th className={styles.th}>Дата завершения</th>
        </tr>
      </thead>
      <tbody className={styles.tblContent}>
        {request.map((requestItem) => (
          <tr
            key={requestItem.request_id}
            className={`${styles.tr} ${styles.clickable}`}
            onClick={() => handleRowClick(requestItem.request_id)}
          >
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RequestTable;

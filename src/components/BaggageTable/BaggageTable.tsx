// BaggageTable.tsx
import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./BaggageTable.module.css";

import { Baggage } from "../../redux/baggage/baggageListSlice";
import { useNavigate } from "react-router";
import { deleteBaggage } from "../../redux/baggage/baggageListThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface BaggageTableProps {
  baggage: Baggage[];
  isAdmin: boolean;
  isDeliveryConstructor: boolean;
  isDeliveryNotDraft: boolean;
  isAuthenticated?: boolean;
  onAddDelivery?: (baggageId: number) => void;
}

const BaggageTable: React.FC<BaggageTableProps> = ({
  baggage,
  isAdmin,
  isDeliveryConstructor,
  isDeliveryNotDraft,
  isAuthenticated,
  onAddDelivery,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleRowClick = (baggageID: number, e: React.MouseEvent) => {
    navigate(`/baggage/${baggageID}`);
    e.stopPropagation();
  };

  const handleEditClick = (baggageID: number, e: React.MouseEvent) => {
    navigate(`/baggage/${baggageID}/update`);
    e.stopPropagation();
  };

  const handleDeleteClick = (baggageID: number, e: React.MouseEvent) => {
    dispatch(deleteBaggage(baggageID));
    e.stopPropagation();
  };

  const handleCreateClick = () => {
    navigate("/baggage/create");
  };
  return (
    <Table className={styles.table}>
      <thead className={styles.tblHeader}>
        <tr>
          <th className={styles.th}>Код багажа</th>
          <th className={styles.th}>Авиакомпания</th>
          <th className={styles.th}>Имя владельца</th>
          <th className={styles.th}>Паспортные данные</th>
          <th className={styles.th}>Тип багажа</th>
          <th className={styles.th}>Вес</th>
          <th className={styles.th}>Размер</th>
          <th className={styles.th}>Фото</th>
          <th className={styles.th}>Действия</th>
        </tr>
      </thead>
      <tbody className={styles.tblContent}>
        {baggage &&
          baggage.map((baggageItem) => (
            <tr
              key={baggageItem.baggage_id}
              className={`${styles.tr} ${styles.clickable}`}
              // onClick={(e) => handleRowClick(baggageItem.baggage_id, e)}
            >
              <td className={styles.td}>{baggageItem.baggage_code}</td>
              <td className={styles.td}>{baggageItem.airline}</td>
              <td className={styles.td}>{baggageItem.owner_name}</td>
              <td className={styles.td}>{baggageItem.pasport_details}</td>
              <td className={styles.td}>{baggageItem.baggage_type}</td>
              <td className={styles.td}>{baggageItem.weight}</td>
              <td className={styles.td}>{baggageItem.size}</td>
              <td className={styles.td} style={{ position: "relative" }}>
                <img
                  src={baggageItem.photo_url}
                  alt={`Baggage ${baggageItem.baggage_id}`}
                  className={styles.photo_url}
                />
              </td>
              <td className={styles.td} style={{ position: "relative" }}>
                {isAdmin && (
                  <>
                    <Button
                      variant="warning"
                      onClick={(e) =>
                        handleEditClick(baggageItem.baggage_id, e)
                      }
                      className={styles.btn}
                    >
                      Изменить
                    </Button>
                    <Button
                      variant="danger"
                      className={styles.btn}
                      onClick={(e) =>
                        handleDeleteClick(baggageItem.baggage_id, e)
                      }
                    >
                      Удалить
                    </Button>
                  </>
                )}
                <Button
                  variant="danger"
                  className={styles.btn}
                  onClick={(e) => handleRowClick(baggageItem.baggage_id, e)}
                >
                  Подробное
                </Button>
                <Button
                  variant="success"
                  className={styles.btn}
                  onClick={() =>
                    onAddDelivery && onAddDelivery(baggageItem.baggage_id)
                  }
                >
                  Добавить багаж
                </Button>
              </td>
            </tr>
          ))}
        {isAdmin && (
          <tr>
            <td colSpan={9} className={styles.td}>
              <Button
                variant="success"
                onClick={handleCreateClick}
                className={styles.createBtn}
              >
                Создать
              </Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default BaggageTable;

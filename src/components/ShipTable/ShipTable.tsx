// ShipTable.tsx
import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import styles from "./ShipTable.module.css";

import { Ship } from "../../redux/ship/shipListSlice";
import { useNavigate } from "react-router";
import { deleteShip } from "../../redux/ship/shipListThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface ShipTableProps {
  ship: Ship[] | undefined;
  isAdmin: boolean;
  isRequestConstructor: boolean;
  isRequestNotDraft: boolean;
  isAuthenticated?: boolean;
  onAddRequest?: (shipId: number) => void;
}

const ShipTable: React.FC<ShipTableProps> = ({
  ship,
  isAdmin,
  isRequestConstructor,
  isRequestNotDraft,
  isAuthenticated,
  onAddRequest,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleRowClick = (shipID: number, e: React.MouseEvent) => {
    navigate(`/ship/${shipID}`);
    e.stopPropagation();
  };

  const handleEditClick = (shipID: number, e: React.MouseEvent) => {
    navigate(`/ship/${shipID}/update`);
    e.stopPropagation();
  };

  const handleDeleteClick = (shipID: number, e: React.MouseEvent) => {
    dispatch(deleteShip(shipID));
    e.stopPropagation();
  };

  const handleCreateClick = () => {
    navigate("/ship/create");
  };
  return (
    <Table className={styles.table}>
      <thead className={styles.tblHeader}>
        <tr>
          <th className={styles.th}>Название</th>
          <th className={styles.th}>Флаг</th>
          <th className={styles.th}>Классификация</th>
          <th className={styles.th}>Тип судна</th>
          <th className={styles.th}>Грузоподъемность</th>
          {/* <th className={styles.th}>Вместимость экипажа:</th>
          <th className={styles.th}>Вместимость пассажиров:</th> */}
          <th className={styles.th}>Максимальная глубина</th>
          <th className={styles.th}>Максимальная длина</th>
          {/* <th className={styles.th}>Год постройки</th> */}
          <th className={styles.th}>Фото</th>
          <th className={styles.th}>Действия</th>
        </tr>
      </thead>
      <tbody className={styles.tblContent}>
        {ship &&
          ship.map((shipItem) => (
            <tr
              key={shipItem.ship_id}
              className={`${styles.tr} ${styles.clickable}`}
            >
              <td className={styles.td}>{shipItem.ship_name}</td>
              <td className={styles.td}>{shipItem.flag}</td>
              <td className={styles.td}>{shipItem.classification}</td>
              <td className={styles.td}>{shipItem.ship_type}</td>
              <td className={styles.td}>{shipItem.cargo_capacity}</td>
              {/* <td className={styles.td}>{shipItem.crew_capacity}</td>
              <td className={styles.td}>{shipItem.passenger_capacity}</td> */}
              <td className={styles.td}>{shipItem.max_depth}</td>
              <td className={styles.td}>{shipItem.max_length}</td>
              {/* <td className={styles.td}>{shipItem.year_built}</td> */}
              <td className={styles.td} style={{ position: "relative" }}>
                <img
                  src={shipItem.photo}
                  alt={`Ship ${shipItem.ship_id}`}
                  className={styles.photo}
                />
              </td>
              <td className={styles.td} style={{ position: "relative" }}>
                {isAdmin && (
                  <>
                    <Button
                      variant="warning"
                      onClick={(e) => handleEditClick(shipItem.ship_id, e)}
                      className={styles.btn}
                    >
                      Изменить
                    </Button>
                    <Button
                      variant="danger"
                      className={styles.btn}
                      onClick={(e) => handleDeleteClick(shipItem.ship_id, e)}
                    >
                      Удалить
                    </Button>
                  </>
                )}
                <Button
                  variant="danger"
                  className={styles.btn}
                  onClick={(e) => handleRowClick(shipItem.ship_id, e)}
                >
                  Подробное
                </Button>
                <Button
                  variant="success"
                  className={styles.btn}
                  onClick={() => onAddRequest && onAddRequest(shipItem.ship_id)}
                >
                  Добавить судно
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

export default ShipTable;

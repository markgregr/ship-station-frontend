import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./Notififcation.module.css"; // Опечатка в имени файла?
import {
  INotification,
  deleteNotification,
} from "../../redux/additional/additionalSlice";

interface NotificationBarProps {
  notifyInfo: INotification;
}

export const Notification: React.FC<NotificationBarProps> = ({
  notifyInfo,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(deleteNotification(notifyInfo.id));
    }, 4000);
    return () => clearTimeout(timeout);
  }, [dispatch, notifyInfo]);
  return (
    <div className={notifyInfo.isError ? styles.error : styles.success}>
      {notifyInfo.message}
    </div>
  );
};

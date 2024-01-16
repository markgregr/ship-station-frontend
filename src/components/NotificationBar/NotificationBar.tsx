import React from "react";
import styles from "./NotificationBar.module.css";
import { useSelector } from "react-redux";
import { Notification } from "../Notification/Notification";
import { selectNotifications } from "../../redux/additional/additionalSelectors";

export const NotificationBar: React.FC = () => {
  const notifications = useSelector(selectNotifications);
  return (
    <div className={styles.notifications}>
      {notifications
        .map((notification) => (
          <Notification key={notification.id} notifyInfo={notification} />
        ))
        .reverse()}
    </div>
  );
};

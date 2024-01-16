import React from "react";
import { NotificationBar } from "../NotificationBar/NotificationBar";
import styles from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.mainlayout}>
      <Outlet />
      <NotificationBar />
    </div>
  );
};

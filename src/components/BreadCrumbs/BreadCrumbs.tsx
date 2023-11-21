// Breadcrumbs.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css"; // Подключение файла стилей

interface BreadcrumbsProps {
  paths: { to: string; label: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
  return (
    <div className={styles.breadcrumb}>
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className={styles.separator}>/</span>}
          {index === paths.length - 1 ? (
            <span className={styles.breadcrumbItem}>{path.label}</span>
          ) : (
            <Link to={path.to} className={styles.breadcrumbItem}>
              {path.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

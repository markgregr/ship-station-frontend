// Breadcrumbs.tsx
import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css"; // Подключение файла стилей

interface BreadcrumbsProps {
  paths: { to: string; label: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
  return (
    <Breadcrumb className={styles.breadcrumb}>
      {paths.map((path, index) => (
        <Breadcrumb.Item
          key={index}
          linkAs={Link}
          linkProps={{ to: path.to }}
          active={index === paths.length}
          className={styles.breadcrumbItem}
        >
          {path.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;

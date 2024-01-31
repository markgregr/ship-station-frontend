// ShipPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import useFetchShipDetails from "../hooks/useFetchShipDetails";
import ShipDetailsComponent from "../components/ShipDetails/ShipDetailsComponent";
import Breadcrumbs from "../components/BreadCrumbs/BreadCrumbs";

const ShipDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { shipDetails } = useFetchShipDetails(id || "");
  const breadcrumbsPaths = [
    { to: "/", label: "Список судов" },
    { to: `/ship/${id}`, label: "Подробнее о судне" },
  ];
  return (
    <div>
      <Breadcrumbs paths={breadcrumbsPaths}></Breadcrumbs>
      <ShipDetailsComponent shipDetails={shipDetails} />
    </div>
  );
};

export default ShipDetailsPage;

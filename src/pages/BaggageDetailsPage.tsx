// BaggagePage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import useFetchBaggageDetails from "../hooks/useFetchBaggageDetails";
import BaggageDetailsComponent from "../components/BaggageDetails/BaggageDetailsComponent";
import Breadcrumbs from "../components/BreadCrumbs/BreadCrumbs";

const BaggageDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { baggageDetails } = useFetchBaggageDetails(id || "");
  const breadcrumbsPaths = [
    { to: "/about", label: "О нас" },
    { to: "/baggage", label: "Список багажей" },
    { to: `/baggage/${id}`, label: "Подробнее о багаже" },
  ];
  return (
    <div>
      <Breadcrumbs paths={breadcrumbsPaths}></Breadcrumbs>
      <BaggageDetailsComponent baggageDetails={baggageDetails} />
    </div>
  );
};

export default BaggageDetailsPage;

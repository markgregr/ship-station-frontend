// BaggagePage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import useFetchBaggageDetails from "../hooks/useFetchBaggageDetails";
import BaggageDetailsComponent from "../components/BaggageDetails/BaggageDetailsComponent";
import Breadcrumbs from "../components/BreadCrumbs/BreadCrumbs";

const BaggageDetailsPage: React.FC = () => {
  const breadcrumbsPaths = [
    { to: "/", label: "Главная" },
    { to: "/baggage", label: "Список багажей" },
  ];

  const { id } = useParams<{ id?: string }>();
  const { baggageDetails } = useFetchBaggageDetails(id || "");
  return (
    <div>
      <Breadcrumbs paths={breadcrumbsPaths}></Breadcrumbs>
      <BaggageDetailsComponent baggageDetails={baggageDetails} />
    </div>
  );
};

export default BaggageDetailsPage;

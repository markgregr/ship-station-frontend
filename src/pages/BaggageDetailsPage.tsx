// BaggageDetailsPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BaggageDetailsComponent from "../components/BaggageDetails/BaggageDetailsComponent";
import Breadcrumbs from "../components/BreadCrumbs/BreadCrumbs";
import {
  selectBaggageDetails,
  selectloading,
} from "../redux/baggage/baggageDetailsSelectors";
import { getBaggageDetails } from "../redux/baggage/baggageDetailsThunk";
import { AppDispatch } from "../redux/store";
import { setBaggageDetails } from "../redux/baggage/baggageDetailsSlice";
import { Spin } from "antd";

const BaggageDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const baggageDetails = useSelector(selectBaggageDetails);
  const loading = useSelector(selectloading);
  useEffect(() => {
    if (id) {
      dispatch(getBaggageDetails(id));
    }

    return () => {
      dispatch(setBaggageDetails(null));
    };
  }, [dispatch, id]);

  const breadcrumbsPaths = [
    { to: "/", label: "Главная" },
    { to: "/baggage", label: "Список багажей" },
    { to: `/baggage/${id}`, label: "Подробнее о багаже" },
  ];

  return (
    <div>
      <Breadcrumbs paths={breadcrumbsPaths}></Breadcrumbs>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <BaggageDetailsComponent baggageDetails={baggageDetails} />
      )}
    </div>
  );
};

export default BaggageDetailsPage;

// ShipDetailsPage.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ShipDetailsComponent from "../components/ShipDetails/ShipDetailsComponent";
import Breadcrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { selectShipDetails } from "../redux/ship/shipDetailsSelectors";
import { getShipDetails } from "../redux/ship/shipDetailsThunk";
import { AppDispatch } from "../redux/store";
import { setShipDetails } from "../redux/ship/shipDetailsSlice";
import { Spin } from "antd";
import { selectLoading } from "../redux/additional/additionalSelectors";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const ShipDetailsPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const shipDetails = useSelector(selectShipDetails);
  const loading = useSelector(selectLoading);
  useEffect(() => {
    if (id) {
      dispatch(getShipDetails(id));
    }

    return () => {
      dispatch(setShipDetails(null));
    };
  }, [dispatch, id]);

  const breadcrumbsPaths = [
    { to: "/ship", label: "Список суднов" },
    { to: `/ship/${id}`, label: "Подробнее о судне" },
  ];

  return (
    <div>
      <NavigationBar></NavigationBar>
      <Breadcrumbs paths={breadcrumbsPaths}></Breadcrumbs>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <ShipDetailsComponent shipDetails={shipDetails} />
      )}
    </div>
  );
};

export default ShipDetailsPage;

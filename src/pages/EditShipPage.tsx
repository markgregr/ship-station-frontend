// EditShipPage.tsx
import React from "react";
import { Container } from "react-bootstrap";
import EditShipForm from "../components/EditShipForm/EditShipForm";

import { selectShipDetails } from "../redux/ship/shipDetailsSelectors";
import { useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const EditShipPage: React.FC = () => {
  const ship = useSelector(selectShipDetails);

  return (
    <Container>
      <NavigationBar />
      <EditShipForm ship={ship} />
    </Container>
  );
};

export default EditShipPage;

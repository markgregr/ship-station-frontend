// EditBaggagePage.tsx
import React from "react";
import { Container } from "react-bootstrap";
import EditBaggageForm from "../components/EditBaggageForm/EditBaggageForm";

import { selectBaggageDetails } from "../redux/baggage/baggageDetailsSelectors";
import { useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const EditBaggagePage: React.FC = () => {
  const baggage = useSelector(selectBaggageDetails);

  return (
    <Container>
      <NavigationBar />
      <EditBaggageForm baggage={baggage} />
    </Container>
  );
};

export default EditBaggagePage;

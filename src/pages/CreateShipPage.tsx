// CreateShipPage.tsx
import React from "react";
import { Container } from "react-bootstrap";
import CreateShipForm from "../components/CreateShipForm/CreateShipForm";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const CreateShipPage: React.FC = () => {
  return (
    <Container>
      <NavigationBar />
      <CreateShipForm />
    </Container>
  );
};

export default CreateShipPage;

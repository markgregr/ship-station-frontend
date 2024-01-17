// CreateBaggagePage.tsx
import React from "react";
import { Container } from "react-bootstrap";
import CreateBaggageForm from "../components/CreateBaggageForm/CreateBaggageForm";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const CreateBaggagePage: React.FC = () => {
  return (
    <Container>
      <NavigationBar />
      <CreateBaggageForm />
    </Container>
  );
};

export default CreateBaggagePage;

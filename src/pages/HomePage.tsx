// HomePage.tsx
import React from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import AboutContainerComponent from "../components/AboutContainer/AboutContainerComponent";

const HomePage: React.FC = () => {
  return (
    <>
      <NavigationBar />
      <AboutContainerComponent></AboutContainerComponent>
    </>
  );
};

export default HomePage;

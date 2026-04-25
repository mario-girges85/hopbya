import React from "react";
import AboutUs from "../components/About-us.jsx";
import TeachingLearning from "../components/TeachingLearning.jsx";

const Home = ({ language = "ar" }) => {
  return (
    <>
      <AboutUs language={language} />
      <TeachingLearning language={language} />
    </>
  );
};

export default Home;

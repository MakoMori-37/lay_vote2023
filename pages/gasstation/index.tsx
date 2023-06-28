import React, { useState, useEffect } from "react";

import HomePage from "@/components/HomePage";
import Register from "@/components/Register";
import Vote from "@/components/Vote";
import Result from "@/components/Result";

const GasStation = () => {
  const [width, setWidth] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const customSize = width >= 500 && width <= 639;
  
  const incrementStep = () => {
    setStep(step + 1);
  };

  const handleResize = () => setWidth(window.innerWidth);

  const renderPage = () => {
    switch (step) {
      case 0:
        return <HomePage onNext={incrementStep} />;
      case 1:
        return <Register onNext={incrementStep} />;
      case 2:
        return <Vote onNext={incrementStep} section="gasStation" />;
      case 3:
        return <Result />;
      default:
        return <div>Page not found.</div>;
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className={`flex min-h-screen justify-center ${
        customSize ? "w-[80%]" : ''
      } sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto `}
    >
      {renderPage()}
    </main>
  );
};

export default GasStation;

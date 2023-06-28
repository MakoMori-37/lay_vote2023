import React, { useState, useEffect } from "react";

import HomePage from "@/components/maxVersion/HomePage";
import Register from "@/components/maxVersion/Register";
import Vote from "@/components/maxVersion/Vote";
import Result from "@/components/maxVersion/Result";

const Station = () => {
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
      className={`flex min-h-screen justify-center w-full`}
    >
      {renderPage()}
    </main>
  );
};

export default Station;

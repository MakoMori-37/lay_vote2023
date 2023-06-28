import React, { useState, useEffect } from "react";

import HomePage from "@/components/maxVersion/HomePage";
import Register from "@/components/maxVersion/Register";
import Vote from "@/components/maxVersion/Vote";
import Result from "@/components/maxVersion/Result";
import Question1 from "@/components/machine/Question1";
import Question2 from "@/components/machine/Question2";
import Question3 from "@/components/machine/Question3";

interface VendingForm {
  feeling?: string;
  reason?: string[];
  occasion?: string[];
  brand?: string[];
  reasonOther?: string;
  occasionOther?: string;
  brandOther?: string;
}

const Machine = () => {
  const [width, setWidth] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const [form, setForm] = useState<VendingForm>({});
  const customSize = width >= 500 && width <= 639;

  const incrementStep = () => {
    setStep(step + 1);
  };

  const incrementStepWithForm = (data: VendingForm) => {
    switch (step) {
      case 2:
        setForm({ ...form, feeling: data.feeling });
        break;
      case 3:
        setForm({
          ...form,
          reason: data.reason,
          reasonOther: data.reasonOther,
        });
        break;
      case 4:
        setForm({
          ...form,
          occasion: data.occasion,
          occasionOther: data.occasionOther,
        });
        break;
      case 5:
        setForm({ ...form, brand: data.brand });
        break;
      default:
        break;
    }
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
        return (
          <Vote onNextWithForm={incrementStepWithForm} section="vending" />
        );
      case 3:
        return <Question1 onNext={incrementStepWithForm} />;
      case 4:
        return <Question2 onNext={incrementStepWithForm} />;
      case 5:
        return <Question3 onNext={incrementStep} formData={form} />;
      case 6:
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
      className={`flex min-h-screen justify-center full`}
    >
      {renderPage()}
    </main>
  );
};

export default Machine;

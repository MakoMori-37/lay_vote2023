import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  onNext: () => void;
};

const HomePage: React.FC<Props> = ({ onNext = () => {} }) => {
  const [width, setWidth] = useState<number>(0);
  const host = process.env.HOST;

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="bg__homepage__full w-full flex items-end justify-center pb-20 ">
        <Image
          src={`${host}/image/btn_start.png`}
          width={200}
          height={100}
          alt="btn_start"
          onClick={onNext}
          className="cursor-pointer"
        />
      </div>
    </>
  );
};

export default HomePage;

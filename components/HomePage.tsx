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
      {width < 1200 ? (
        <div className="bg__homepage max-h-screen w-full flex flex-col items-center justify-between  pt-10 pb-24 ">
          <Image
            src={`${host}/image/logo.png`}
            width={90}
            height={90}
            alt="btn_start"
            onClick={onNext}
            className="cursor-pointer"
          />
          <Image
            src={`${host}/image/sub_title.png`}
            width={250}
            height={250}
            alt="btn_start"
            onClick={onNext}
            className="cursor-pointer"
          />
          <Image
            src={`${host}/image/product.png`}
            width={150}
            height={150}
            alt="btn_start"
            onClick={onNext}
            className="cursor-pointer"
          />
          <Image
            src={`${host}/image/btn_start.png`}
            width={150}
            height={100}
            alt="btn_start"
            onClick={onNext}
            className="cursor-pointer"
          />
        </div>
      ) : (
        <div className="bg__homepage__full w-full flex items-end justify-center pb-10 ">
          <Image
            src={`${host}/image/btn_start.png`}
            width={200}
            height={100}
            alt="btn_start"
            onClick={onNext}
            className="cursor-pointer"
          />
        </div>
      )}
    </>
  );
};

export default HomePage;

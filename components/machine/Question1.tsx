import React, { useEffect, useState } from "react";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import { pink } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  onNext?: (data: VendingForm) => void;
};

interface VendingForm {
  feeling?: string;
  reason?: string[];
  occasion?: string[];
  brand?: string[];
  reasonOther?: string;
  brandOther?: string;
}

const Question1: React.FC<Props> = ({ onNext = () => {} }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [reason, setReason] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("กรุณาเลือกอย่างน้อย 3 คำตอบ");
  const [open, setOpen] = useState<boolean>(false);
  const host = process.env.HOST;

  const handleSubmit = () => {
    if (isSubmitDisabled) {
      setErrMsg("กรุณาเลือกอย่างน้อย 3 คำตอบ");
      setOpen(true);
      return;
    }
    onNext({ reason: selectedValues, reasonOther: reason });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleRadioClick = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    } else {
      if (selectedValues.length === 3) {
        const [_, ...remainingValues] = selectedValues;
        setSelectedValues([...remainingValues, value]);
      } else {
        setSelectedValues([...selectedValues, value]);
      }
    }
  };

  useEffect(() => {
    selectedValues.length === 3
      ? setIsSubmitDisabled(false)
      : setIsSubmitDisabled(true);
  }, [selectedValues]);

  return (
    <div className="bg__default w-full flex flex-col items-center justify-center pt-52 relative">
      <div className="text-center ">
        <p className="text-stroke text-[30px] md:text-[50px] text-[#EB3541] font-extrabold">
          ทำไมคุณถึงชอบสินค้าตัวอย่าง
        </p>
        <p className="text-stroke text-[30px] md:text-[50px] mt-[-12px] text-[#EB3541] font-extrabold">
          ที่เลือก โปรดเลือก 3 ข้อ
        </p>
      </div>
      <div>
        <div className={`flex items-center w-full mx-auto gap-4`}>
          <Radio
            id="radio-1"
            name="radio-1"
            onClick={() => handleRadioClick("1")}
            checked={selectedValues.includes("1")}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-1"
            className="text-stroke text-[25px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            รสชาติเข้มข้น
          </label>
        </div>
        <div className={`flex items-center w-full mx-auto gap-4`}>
          <Radio
            id="radio-2"
            name="radio-2"
            onClick={() => handleRadioClick("2")}
            checked={selectedValues.includes("2")}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-2"
            className="text-stroke text-[25px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            รสชาติกลมกล่อม
          </label>
        </div>
        <div className={`flex items-center w-full mx-auto gap-4`}>
          <Radio
            id="radio-3"
            name="radio-3"
            onClick={() => handleRadioClick("3")}
            checked={selectedValues.includes("3")}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-3"
            className="text-stroke  text-[25px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            ความกรอบกำลังดี
          </label>
        </div>
        <div className={`flex items-center w-full mx-auto gap-4`}>
          <Radio
            id="radio-4"
            name="radio-4"
            onClick={() => handleRadioClick("4")}
            checked={selectedValues.includes("4")}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-4"
            className="text-stroke text-[25px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            เนื้อสัมผัสกำลังดี
          </label>
        </div>
        <div className={`flex items-center w-full mx-auto gap-4`}>
          <Radio
            id="radio-5"
            name="radio-5"
            onClick={() => handleRadioClick("5")}
            checked={selectedValues.includes("5")}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-5"
            className="text-stroke text-[25px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            หอมกลิ่นซาวครีม
          </label>
        </div>
        <div className={`flex items-center w-full mx-auto gap-4`}>
          <Radio
            id="radio-6"
            name="radio-6"
            onClick={() => handleRadioClick("6")}
            checked={selectedValues.includes("6")}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-6"
            className="text-stroke text-[25px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            ขนาดของแผ่นชิปกำลังดี
          </label>
        </div>
        <div className={`flex items-center w-full mx-auto gap-4`}>
          <Radio
            id="radio-7"
            name="radio-7"
            onClick={() => handleRadioClick("7")}
            checked={selectedValues.includes("7")}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-7"
            className="text-stroke text-[25px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            อื่นๆ
          </label>
        </div>
      </div>

      <Image
        src={`${host}/image/btn_next.png`}
        width={70}
        height={70}
        alt="text_name"
        onClick={handleSubmit}
        className="absolute bottom-28 right-12 cursor-pointer "
      />

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Question1;

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
  occasionOther?: string;
}

const Question2: React.FC<Props> = ({ onNext = () => {} }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [reason, setReason] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("กรุณาเลือกอย่างน้อย 1 คำตอบ");
  const host = process.env.HOST;

  const handleSubmit = () => {
    if (selectedValues.length === 0) {
      setErrMsg("กรุณาเลือกอย่างน้อย 1 คำตอบ");
      setOpen(true);
      return;
    }
    // if (selectedValues.includes("9") && !reason) {
    //   setErrMsg("กรุณากรอกข้อมูลให้ครบถ้วน");
    //   setOpen(true);
    //   return;
    // }
    onNext({ occasion: selectedValues, occasionOther: reason });
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
      setSelectedValues([...selectedValues, value]);
    }
  };

  // const handleChangeReason = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setReason(event.target.value);
  // };

  return (
    <div className="bg__default w-full flex flex-col items-center justify-center pt-48 relative">
      <div className="text-center ">
        <p className="text-stroke text-[30px] md:text-[35px] text-[#EB3541] font-extrabold">
          คุณคิดว่าจะเลือกทานเลย์สแตคส์
        </p>
        <p className="text-stroke text-[30px] mt-[-12px] md:text-[35px] text-[#EB3541] font-extrabold">
          ในโอกาสใดบ้าง
        </p>
      </div>
      <div className={``}>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-1"
            name="radio-1"
            onClick={() => handleRadioClick("1")}
            checked={selectedValues.includes("1")}
            className="bg-white w-4 h-4"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-1"
            className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold"
          >
            ระหว่างดูหนัง/ดูซีรีย์
          </label>
        </div>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-2"
            name="radio-2"
            onClick={() => handleRadioClick("2")}
            checked={selectedValues.includes("2")}
            className="bg-white w-4 h-4"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-2"
            className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold"
          >
            ระหว่างพักทำงาน/อ่านหนังสือ
          </label>
        </div>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-3"
            name="radio-3"
            value="3"
            onClick={() => handleRadioClick("3")}
            checked={selectedValues.includes("3")}
            className="bg-white w-4 h-4"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-3"
            className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold"
          >
            ระหว่างเดินทาง/บนรถ
          </label>
        </div>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-4"
            name="radio-4"
            value="4"
            onClick={() => handleRadioClick("4")}
            checked={selectedValues.includes("4")}
            className="bg-white w-4 h-4"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-4"
            className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold"
          >
            ระหว่างเล่นเกม
          </label>
        </div>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-5"
            name="radio-5"
            value="5"
            onClick={() => handleRadioClick("5")}
            checked={selectedValues.includes("5")}
            className="bg-white w-4 h-4"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-5"
            className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold"
          >
            หลังเลิกงาน/เลิกเรียน
          </label>
        </div>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-6"
            name="radio-6"
            value="6"
            onClick={() => handleRadioClick("6")}
            checked={selectedValues.includes("6")}
            className="bg-white w-4 h-4 "
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-6"
            className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold"
          >
            เวลาอยู่คนเดียวต้องการพักผ่อน
          </label>
        </div>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-7"
            name="radio-7"
            value="7"
            onClick={() => handleRadioClick("7")}
            checked={selectedValues.includes("7")}
            className="bg-white w-4 h-4"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-7"
            className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold"
          >
            เวลาอยู่กับเพื่อนๆ/ครอบครัว
          </label>
        </div>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-8"
            name="radio-8"
            value="8"
            onClick={() => handleRadioClick("8")}
            checked={selectedValues.includes("8")}
            className="bg-white w-4 h-4"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-8"
            className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold"
          >
            เมื่อมีโปรโมชั่นเท่านั้น
          </label>
        </div>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-9"
            name="radio-9"
            value="9"
            onClick={() => handleRadioClick("9")}
            checked={selectedValues.includes("9")}
            className="bg-white w-4 h-4"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          {/* {selectedValues.includes("9") ? (
            <input
              className="input__other w-[70%]"
              onChange={handleChangeReason}
            />
          ) : (
            <label htmlFor="radio-9">
              <p className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold">
                อื่นๆ
              </p>
            </label>
          )} */}
          <label
            htmlFor="radio-9"
            className="text-stroke text-[20px] md:text-[22px] text-[#EB3541] font-extrabold"
          >
            อื่นๆ
          </label>
        </div>
      </div>

      <Image
        src={`${host}/image/btn_next.png`}
        width={60}
        height={60}
        alt="text_name"
        onClick={handleSubmit}
        className="absolute bottom-8 right-6 cursor-pointer "
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

export default Question2;

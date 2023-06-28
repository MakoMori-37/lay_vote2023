import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import { pink } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { checkUserAccessToken } from "@/function/authorization";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
  onNext: () => void;
  formData?: VendingForm;
};

interface VendingForm {
  feeling?: string;
  reason?: string[];
  occasion?: string[];
  brand?: string[];
  reasonOther?: string;
  occasionOther?: string;
  brandOther?: string;
}

interface UpdateResponse {
  status: "ok" | "error";
  message: string;
  error?: string;
}

const Question3: React.FC<Props> = ({ formData = {}, onNext = () => {} }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const [openErrMsg, setOpenErrMsg] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("Internal server error.");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const host = process.env.HOST;

  const handleSubmit = async (): Promise<UpdateResponse | null> => {
    if (selectedValues.length === 0) {
      setErrMsg("กรุณาเลือกอย่างน้อย 1 คำตอบ");
      setOpen(true);
      return null;
    }

    const token = checkUserAccessToken();

    if (!token) {
      setErrMsg("Unauthorization");
      setOpenErrMsg(true);
      return null;
    }

    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    };

    const data = {
      feeling: formData.feeling,
      section: "vending",
      reason: formData.reason,
      occasion: formData.occasion,
      brand: selectedValues,
      brandOther: reason,
      occasionOther: formData.occasionOther,
      reasonOther: formData.reasonOther,
    };

    try {
      const res = await axios.put(`${process.env.API_BASE}/user`, data, config);

      if (res.data.status !== "ok") {
        setErrMsg(res.data.error || res.data.message);
        setOpenErrMsg(true);
        return {
          status: res.data.status,
          message: res.data.message,
          error: res.data.error,
        };
      }

      onNext();
      return {
        status: "ok",
        message: res.data.message,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenErrMsg(false);
  };

  const handleRadioClick = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  return (
    <div className="bg__default w-full flex flex-col items-center justify-center pt-56 relative  ">
      <div className="text-center ">
        <p className="text-stroke text-[30px] md:text-[50px] text-[#EB3541] font-extrabold">
          คุณมักจะซื้อมันฝรั่งทอด
        </p>
        <p className="text-stroke text-[30px] mt-[-12px] md:text-[50px] text-[#EB3541] font-extrabold">
          ยี่ห้อใด
        </p>
      </div>
      <div className={`  `}>
        <div className="flex items-center gap-4 ">
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
            className="text-stroke text-[20px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            เลย์
          </label>
        </div>
        <div className="flex items-center gap-4 ">
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
            className="text-stroke text-[20px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            เลย์สแตคส์
          </label>
        </div>
        <div className="flex items-center gap-4 ">
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
            className="text-stroke text-[20px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            เลย์แมกซ์
          </label>
        </div>
        <div className="flex items-center gap-4 ">
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
            className="text-stroke text-[20px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            พริงเกิลส์
          </label>
        </div>
        <div className="flex items-center gap-4 ">
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
            className="text-stroke text-[20px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            เทสโต
          </label>
        </div>
        <div className="flex items-center gap-4 ">
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
            className="text-stroke text-[20px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            มิสเตอร์โปเตโต้
          </label>
        </div>
        <div className="flex items-center gap-4 ">
          <Radio
            id="radio-7"
            name="radio-7"
            onClick={() => handleRadioClick("7")}
            checked={selectedValues.includes("7")}
            className="bg-white w-8 h-8 "
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-7"
            className="text-stroke text-[20px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            ลิโก้
          </label>
        </div>
        <div className="flex items-center gap-4 ">
          <Radio
            id="radio-8"
            name="radio-8"
            onClick={() => handleRadioClick("8")}
            checked={selectedValues.includes("8")}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-8"
            className="text-stroke text-[20px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            โรลเลอร์โคสเตอร์
          </label>
        </div>
        <div className="flex items-center gap-4 ">
          <Radio
            id="radio-9"
            name="radio-9"
            onClick={() => handleRadioClick("9")}
            checked={selectedValues.includes("9")}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label
            htmlFor="radio-9"
            className="text-stroke text-[20px] md:text-[35px] text-[#EB3541] font-extrabold"
          >
            อื่น
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
      <Snackbar
        open={openErrMsg}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Question3;

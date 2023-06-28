import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import { pink } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { checkUserAccessToken } from "@/function/authorization";

type Props = {
  onNext?: () => void;
  onNextWithForm?: (data: VendingForm) => void;
  section: string;
};
interface UpdateResponse {
  status: "ok" | "error";
  message: string;
  error?: string;
}
interface VendingForm {
  feeling?: string;
  reason?: string[];
  occasion?: string[];
  brand?: string[];

}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Vote: React.FC<Props> = ({
  section = "",
  onNext = () => { },
  onNextWithForm = () => { },
}) => {
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openErrMsg, setOpenErrMsg] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("Internal server error.");
  const host = process.env.HOST;

  const handleSubmitGasStation = async (): Promise<UpdateResponse | null> => {
    if (!value) {
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
      feeling: value,
      section,
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

  const handleSubmitVending = () => {
    if (!value) {
      setOpen(true);
      return null;
    }
    onNextWithForm({ feeling: value });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenSuccess(false);
  };

  useEffect(() => {
    setOpenSuccess(true);
  }, []);

  return (
    <div className="bg__default w-full flex flex-col items-center justify-center pt-44">
      <div className="text-center ">
        <p className="text-stroke text-[28px] md:text-[55px] text-[#EB3541] font-extrabold">
          หลังจากได้ชิมสินค้าตัวอย่างแล้ว
        </p>
        <p className="text-stroke text-[28px] mt-[-12px] md:text-[55px] text-[#EB3541] font-extrabold">
          คุณชอบมากน้อยแค่ไหน
        </p>
      </div>
      <div>
        <div className="flex items-center w-full mx-auto gap-4 ">
          <Radio
            id="radio-4"
            value="4"
            name="radio-4"
            checked={value === "4"}
            onChange={handleChange}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label htmlFor="radio-4">
            <Image
              src={`${host}/image/gas/choice_01_emoji.png`}
              width={50}
              height={50}
              alt="choice_01"
            />
          </label>
          <label
            htmlFor="radio-4"
            className="text-stroke text-[25px] md:text-[50px] text-[#EB3541] font-extrabold"
          >
            เลิฟเลย ชอบมาก
          </label>
        </div>
        <div className="flex items-center w-full  gap-4 ">
          <Radio
            id="radio-3"
            value="3"
            name="radio-3"
            checked={value === "3"}
            onChange={handleChange}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label htmlFor="radio-3">
            <Image
              src={`${host}/image/gas/choice_02_emoji.png`}
              width={50}
              height={50}
              alt="choice_02"
            />
          </label>
          <label
            htmlFor="radio-3"
            className="text-stroke text-[25px] md:text-[50px] text-[#EB3541] font-extrabold"
          >
            ชอบ
          </label>
        </div>
        <div className="flex items-center w-full  gap-4 ">
          <Radio
            id="radio-2"
            value="2"
            name="radio-2"
            checked={value === "2"}
            onChange={handleChange}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label htmlFor="radio-2">
            <Image
              src={`${host}/image/gas/choice_03_emoji.png`}
              width={50}
              height={50}
              alt="choice_03"
            />
          </label>
          <label
            htmlFor="radio-2"
            className="text-stroke text-[25px] md:text-[50px] text-[#EB3541] font-extrabold"
          >
            เฉยๆ
          </label>
        </div>
        <div className="flex items-center w-full gap-4 ">
          <Radio
            id="radio-1"
            value="1"
            name="radio-1"
            checked={value === "1"}
            onChange={handleChange}
            className="bg-white w-8 h-8"
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
          <label htmlFor="radio-1">
            <Image
              src={`${host}/image/gas/choice_04_emoji.png`}
              width={50}
              height={50}
              alt="choice_04"
            />
          </label>
          <label
            htmlFor="radio-1"
            className="text-stroke text-[25px] md:text-[50px] text-[#EB3541] font-extrabold"
          >
            ไม่ค่อยชอบ
          </label>
        </div>
      </div>
      <div className="flex justify-end w-[80%] mt-16">
        <Image
          src={`${host}/image/btn_next.png`}
          width={70}
          height={70}
          alt="btn_next"
          onClick={
            section === "gasStation"
              ? handleSubmitGasStation
              : handleSubmitVending
          }
          className="cursor-pointer w-18 h-20"
        />
      </div>

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
          กรุณาเลือกอย่างน้อย 1 คำตอบ
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          ลงทะเบียนสำเร็จ!
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

export default Vote;

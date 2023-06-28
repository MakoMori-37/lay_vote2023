import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { setUserAccessToken } from "@/function/authorization";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface RegisterResponse {
  status: "ok" | "error";
  message: string;
  token?: string;
  error?: string;
}

type Props = {
  onNext: () => void;
};

type SubmitForm = {
  fullName: string;
  tel: string;
};

interface RegisterData {
  fullName: string;
  tel: string;
}

const phoneFormat = /^0[6-9]\d{8}$/;

const validationSchema = yup.object({
  fullName: yup.string().required("กรุณากรอกข้อมูล"),
  tel: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(phoneFormat, "โปรดกรอกหมายเลขโทรศัพท์ของคุณให้ถูกต้อง"),
});

const Register: React.FC<Props> = ({ onNext = () => {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitForm>({
    resolver: yupResolver(validationSchema),
  });
  const [terms, setTerms] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("Internal server error.");
  const host = process.env.HOST;

  const onSubmit = async (
    data: RegisterData
  ): Promise<RegisterResponse | null> => {
    if (!terms) {
      setOpen(true);
      return null;
    }

    const headers = {
      //   'Authorization': 'Bearer ' + token,
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    };

    try {
      const res = await axios.post(
        `${process.env.API_BASE}/register`,
        data,
        config
      );
      if (res.data.status !== "ok") {
        let splitErr = res.data.error.split(" ")[0].toLowerCase();
        if (splitErr == "duplicate") {
          setErrMsg("เบอร์นี้ถูกใช้ไปแล้ว");
        } else {
          setErrMsg(res.data.error || res.data.message);
        }
        setOpenRegister(true);
        return {
          status: res.data.status,
          message: res.data.message,
          error: res.data.error,
        };
      }

      setUserAccessToken(res.data.token);
      onNext();
      return {
        status: "ok",
        message: res.data.message,
        token: res.data.token,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleChangeTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerms(event.target.checked);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenRegister(false);
  };

  return (
    <div className="bg__default w-full flex flex-col items-center justify-center pt-40">
      <div className="w-[80%]">
        <Image
          src={`${host}/image/text_name.png`}
          width={120}
          height={120}
          alt="text_name"
        />
        <input
          type="text"
          {...register("fullName")}
          className={` ${
            errors.fullName ? "input__yellow__error" : "input__yellow"
          }`}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500 ">{errors.fullName?.message}</p>
        )}
      </div>
      <div className="w-[80%]">
        <Image
          src={`${host}/image/text_tel.png`}
          width={120}
          height={120}
          alt="text_surname"
        />
        <input
          type="tel"
          {...register("tel")}
          className={` ${errors.tel ? "input__green__error" : "input__green"}`}
        />
        {errors.tel && (
          <p className="text-sm text-red-500  ">{errors.tel?.message}</p>
        )}
      </div>
      <div className="flex w-[80%] gap-2 mt-2 items-start">
        <input
          id="termpolicy"
          type="checkbox"
          className="mt-2 w-10 h-10 mr-2 "
          onChange={handleChangeTerms}
        />
        <label htmlFor="termpolicy" className="text-lg font-bold">
          ข้าพเจ้ายอมรับ{" "}
          <span>
            {" "}
            <Link
              href="https://www.gforcesolution.com/app/layvote2023/pdpa.pdf"
              target="_blank"
              className="underline italic text-lg md:text-xl font-extrabold"
            >
              เงื่อนไขนโยบายความเป็นส่วนตัว
            </Link>{" "}
          </span>
          และยินยอมให้ บริษัท เป๊ปซี่โค ไทยแลนด์ จำกัด ใช้ข้อมูลเพื่อวิเคราะห์
          วิจัย พัฒนา และ นำเสนอผลิตภัณฑ์หรือบริการ{" "}
        </label>
      </div>
      <div className="flex justify-end w-full mr-16">
        <Image
          src={`${host}/image/btn_next.png`}
          width={60}
          height={60}
          alt="btn_next"
          onClick={handleSubmit(onSubmit)}
          className="cursor-pointer w-18 h-20 "
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
          กรุณากดยอมรับเงื่อนไขและการใช้บริการ
        </Alert>
      </Snackbar>
      <Snackbar
        open={openRegister}
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

export default Register;

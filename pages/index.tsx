import React, { useEffect, useState } from "react";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import { pink } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useRouter } from "next/router";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home() {
  const [width, setWidth] = useState(0);
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const customSize = width >= 500 && width <= 639;
  const router = useRouter();

  const host = process.env.HOST;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!value) {
      setOpen(true);
      return;
    }
    value === "gas" ? router.push("gasstation") : router.push("vending");
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

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      className={`bg__default flex min-h-screen justify-center ${
        customSize ? "w-[80%]" : ""
      } sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto `}
    >
      <div className="bg__default w-full flex flex-col items-center justify-center pt-8 relative ">
        <div className="w-[80%] mx-auto text-center ">
          <p className="text-stroke text-[30px] md:text-[35px] text-[#EB3541] font-extrabold">
            คุณตอบแบบสอบถามนี้
          </p>
          <p className="text-stroke text-[30px] md:text-[35px] mt-[-12px] text-[#EB3541] font-extrabold">
            จากที่ไหน?
          </p>
        </div>
        <div>
          <div className="flex items-center w-full mx-auto gap-4 ">
            <Radio
              id="gas"
              value="gas"
              name="gas"
              checked={value === "gas"}
              onChange={handleChange}
              className="bg-white w-4 h-4"
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
              }}
            />
            <label
              htmlFor="gas"
              className="text-stroke text-[25px] md:text-[28px] text-[#EB3541] font-extrabold"
            >
              ปั๊มน้ำมัน
            </label>
          </div>
          <div className="flex items-center w-full mx-auto gap-4 ">
            <Radio
              id="vending"
              value="vending"
              name="vending"
              checked={value === "vending"}
              onChange={handleChange}
              className="bg-white w-4 h-4"
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600],
                },
              }}
            />
            <label
              htmlFor="vending"
              className="text-stroke text-[25px] md:text-[28px] text-[#EB3541] font-extrabold"
            >
              ตู้กดเลย์สแตคส์
            </label>
          </div>
        </div>

        <Image
          src={`${host}/image/btn_next.png`}
          width={60}
          height={60}
          alt="btn_next"
          onClick={handleSubmit}
          className="absolute bottom-24 right-6 cursor-pointer "
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
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            กรุณาเลือกอย่างน้อย 1 คำตอบ
          </Alert>
        </Snackbar>
      </div>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import localFont from "next/font/local";
import Image from "next/image";
/* ********** PUBNUB ********** */
import PubNub from "pubnub";
import { useRouter } from "next/router";

const pubnub = new PubNub({
  publishKey: "pub-c-c0fd9526-6bfb-4724-b881-d922d02fbce7",
  subscribeKey: "sub-c-0e263519-35a3-4b67-b37d-b437b203aefc",
  uuid: "lay-vote-2023-client",
});

/* ********** ********** ********** */

const myFont = localFont({
  src: "../../public/DB HelvethaicaMon X Med v3.2.ttf",
});
interface StatisticResponse {
  status: "ok" | "error";
  message: string;
  error?: string;
  totalUser: string;
  totalUsersByFeeling: string;
}
interface Statistics {
  totalUser: totalUsers;
  totalUsersByFeeling: totalUsersByFeeling[];
}
interface totalUsersByFeeling {
  feeling: string;
  total: string;
}
interface totalUsers {
  total: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Result = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("Internal server error.");
  const [data, setData] = useState<Statistics>({
    totalUser: { total: "" },
    totalUsersByFeeling: [],
  });
  const [percent, setPercent] = useState<string>("");
  const host = process.env.HOST;
  const router = useRouter();

  /* ***************** pubnub ***************** */
  const [channels] = useState(["layvote2023"]);
  const [message, setMessage] = useState("");

  const sendMessage = (message: string) => {
    if (message) {
      pubnub
        .publish({ channel: channels[0], message })
        .then(() => setMessage(""));
    }
  };

  useEffect(() => {
    pubnub.subscribe({ channels });
    return () => {
      pubnub.unsubscribe({ channels });
    };
  }, [channels]);
  /* ******************************************* */

  const calPercent = () => {
    const total = Number(data.totalUser.total);
    const filteredData = data.totalUsersByFeeling.filter(
      (item) => item.feeling === "3" || item.feeling === "4"
    );
    const count = filteredData.reduce(
      (acc, item) => acc + Number(item.total),
      0
    );
    const percentage = ((count / total) * 100).toFixed(0) + "%";
    setPercent(percentage);
  };

  const loadStatistics = async (): Promise<StatisticResponse | null> => {
    const headers = {
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    };

    try {
      const res = await axios.get(`${process.env.API_BASE}/statistics`, config);
      if (res.data.status !== "ok") {
        setErrMsg(res.data.error || res.data.message);
        setOpen(true);
        return null;
      }

      setData({
        totalUser: res.data.data.totalUser,
        totalUsersByFeeling: res.data.data.totalUsersByFeeling,
      });

      sendMessage("layvote2023");

      return null;
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
  };

  useEffect(() => {
    loadStatistics();
    const waitting = setTimeout(() => {
      router.reload();
    }, 5000);
  }, []);

  useEffect(() => {
    if (data.totalUser) {
      calPercent();
    }
  }, [data]);

  return (
    <div
      className={`bg__result w-full flex flex-col items-center justify-center pt-24 relative text-center leading-9 `}
    >
      <div className="w-[80%] flex flex-col items-center">
        {/* <h1 className="text-stroke text-[60px] md:text-[70px] text-[#E14045] font-extrabold  ">
          THANK YOU
        </h1>
        <p
          className={`text-stroke text-[25px] md:text-[35px] text-[#EB3541] font-extrabold ${myFont.className} `}
        >
          FOR YOUR VOTE!
        </p> */}
        {/* <p className="text-stroke text-[25px] md:text-[35px] mt-4 text-[#EB3541] font-extrabold ">
          ตอนนี้&nbsp;&nbsp; <span className="text-[56px]">{percent}</span>{" "}
          ของผู้บริโภค
        </p> */}
        {/* <p className="text-stroke text-[25px] md:text-[35px] text-[#EB3541] font-extrabold ">
          โหวตเลิฟให้เลย์สแตคส์
        </p> */}
        <Image
          src={`${host}/image/thank.png`}
          width={300}
          height={150}
          alt="thank"
        />
        <div className="flex items-center mt-4">
          <Image
            src={`${host}/image/result_1.png`}
            width={80}
            height={80}
            alt="result_1"
            className="pb-1"
          />
          <p className="text-[56px] text-stroke-2 text-[#EB3541] font-extrabold mx-1">
            {/* {percent} */}
            99%
          </p>
          <Image
            src={`${host}/image/result_2.png`}
            width={150}
            height={150}
            alt="result_2"
            className="pt-3"
          />
        </div>
        <div>
          <Image
            src={`${host}/image/result_3.png`}
            width={300}
            height={300}
            alt="result_3"
          />
        </div>
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
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Result;

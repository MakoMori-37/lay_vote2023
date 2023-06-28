import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import localFont from "next/font/local";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import queryString from "query-string";
import Swal from "sweetalert2";

import HeaderDashboard from "../../components/dashboard/HeaderDashboard";
import RenderDatagrid from "../../components/dataGrid/RenderDatagrid";
import ExportExcel from "../../components/dashboard/ExportExcel";
import Login from "../../components/dashboard/Login";

const myFont = localFont({
  src: "../../public/DB HelvethaicaMon X Med v3.2.ttf",
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersGas, setUsersGas] = useState([]);
  const [usersVending, setUsersVending] = useState([]);
  const [adminToken, setAdminToken] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [information, setInformation] = useState({});
  const [errMsg, setErrMsg] = useState("Internal server error.");
  const dataUsers = step == 0 ? users : step == 1 ? usersGas : usersVending;
  const host = process.env.HOST;
  console.log(endDate, startDate);
  const loadStatistics = async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    };

    const filter = {
      searchWord,
      startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD") : null,
    };
    const query = queryString.stringify(filter);

    try {
      const res = await axios.get(
        `${process.env.API_BASE}/statistics?${query}`,
        config
      );
      if (res.data.status !== "ok") {
        console.log(res);
        setErrMsg(res.data.error || res.data.message);
        setOpen(true);
        return null;
      }
      console.log(res);
      const dataUser = res.data.data.users.map((v, index) => ({
        ...v,
        index: index + 1,
      }));
      const dataUserGas = res.data.data.users
        .filter((item) => item.gasStationDone == 1)
        .map((v, index) => ({
          ...v,
          index: index + 1,
        }));
      const dataUserVending = res.data.data.users
        .filter((item) => item.vendingDone == 1)
        .map((v, index) => ({
          ...v,
          index: index + 1,
        }));
      setUsers(dataUser);
      setData(res.data.data);
      setUsersGas(dataUserGas);
      setUsersVending(dataUserVending);
    } catch (error) {
      console.log(error);
    }
  };

  const loadInformation = async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    };

    try {
      const res = await axios.get(
        `${process.env.API_BASE}/information`,
        config
      );
      if (res.data.status !== "ok") {
        setErrMsg(res.data.error || res.data.message);
        setOpen(true);
        return null;
      }

      setInformation(res.data.data);
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const signIn = async (username, password) => {
    const data = {
      username,
      password,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const config = {
      headers: headers,
    };

    try {
      const res = await axios.post(
        `${process.env.API_BASE}/admin/login`,
        data,
        config
      );

      if (res.data.status !== "ok") {
        setErrMsg(res.data.error || res.data.message);
        setOpen(true);
        return null;
      }
      window.localStorage.adminLayvoteToken = res.data.token;
      setAdminToken(res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClearDate = () => {
    setEndDate("");
    setStartDate("");
    loadStatistics();
  };

  const handleChangeStep = (value) => {
    setStep(value);
  };

  const signOut = () => {
    if (!window.localStorage) {
      return false;
    }

    Swal.fire({
      icon: "warning",
      text: "ออกจากระบบ",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("adminLayvoteToken");
        setAdminToken(null);
      }
    });
  };

  useEffect(() => {
    loadStatistics();
  }, [searchWord, endDate]);

  useEffect(() => {
    loadInformation();
    const token = window?.localStorage?.adminLayvoteToken ?? null;
    setAdminToken(token);
  }, []);

  return (
    <div className={`min-h-screen flex  ${myFont.className}`}>
      {!adminToken ? (
        <Login signIn={signIn} />
      ) : (
        <>
          <div className="flex-[0.13] min-w-fit bg__homepage flex flex-col items-center pt-8 px-2 space-y-4 ">
            <Image
              src={`${host}/image/logo.png`}
              width={60}
              height={60}
              alt="logo"
            />
            <div
              className={`btn__dashboard  ${
                step === 0 ? "bg-yellow-200" : ""
              } `}
              onClick={() => handleChangeStep(0)}
            >
              <Image
                src={`${host}/image/dashboard.png`}
                width={30}
                height={30}
                alt="dashboard"
              />
              <p>Dashboard</p>
            </div>
            <div
              className={`btn__dashboard  ${
                step === 1 ? "bg-yellow-200" : ""
              } `}
              onClick={() => handleChangeStep(1)}
            >
              <Image
                src={`${host}/image/gas_station.png`}
                width={30}
                height={30}
                alt="gas"
              />
              <p>Gas Station</p>
            </div>
            <div
              className={`btn__dashboard  ${
                step === 2 ? "bg-yellow-200" : ""
              } `}
              onClick={() => handleChangeStep(2)}
            >
              <Image
                src={`${host}/image/vending_machine.png`}
                width={30}
                height={30}
                alt="vending"
              />
              <p>Vending Machine</p>
            </div>
            <div className="btn__dashboard" onClick={signOut}>
              <Image
                src={`${host}/image/logout.png`}
                width={30}
                height={30}
                alt="signOut"
              />
              <p>Log out</p>
            </div>
          </div>
          <div className="flex-[0.87] bg-white flex flex-col items-center justify-between px-2 ">
            <HeaderDashboard step={step} data={data} />
            <div className="w-full mt-14">
              <div className="flex items-center justify-between  ">
                <div className="flex items-center gap-4">
                  <TextField
                    size="small"
                    value={searchWord}
                    placeholder="ค้นหา"
                    className="w-full "
                    onChange={(e) => setSearchWord(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                  <ExportExcel
                    excelData={dataUsers}
                    step={step}
                    information={information}
                  />
                </div>
                <div className="flex items-center   ">
                  <p className="w-20">วันที่เริ่มต้น</p>
                  <div className="flex py-1  items-center  ">
                    <DatePicker
                      selected={startDate}
                      onChange={setStartDate}
                      customInput={
                        <input
                          value={startDate}
                          type="text"
                          className="py-1 w-32   text-lg h-10 rounded-md ring-1 ring-gray-400 pl-6  "
                        />
                      }
                    />
                    <p className="w-full mx-4">วันที่สิ้นสุด</p>
                    <DatePicker
                      selected={endDate}
                      onChange={setEndDate}
                      customInput={
                        <input
                          value={endDate}
                          type="text"
                          className="py-1 w-32   text-lg h-10 rounded-md ring-1 ring-gray-400 pl-6   "
                        />
                      }
                    />
                    {/* <div
                      className="bg-[#e69049] p-2 rounded-md   "
                      onClick={handleClearDate}
                    >
                      <CalendarTodayIcon
                        sx={{ color: "white", fontSize: "22px" }}
                      />
                    </div> */}
                    <Button
                      variant="contained"
                      className="!bg-[#e69049] py-2 px-6 rounded-md !mx-4 "
                      onClick={handleClearDate}
                    >
                      reset
                    </Button>
                  </div>
                </div>
              </div>
              <RenderDatagrid
                step={step}
                data={dataUsers}
                information={information}
              />
            </div>
          </div>
        </>
      )}

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

export default Dashboard;

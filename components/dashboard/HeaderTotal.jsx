import React from "react";
import Image from "next/image";

const HeaderTotal = ({ data = {} }) => {
  const host = process.env.HOST;

  const {
    totalUsersByFeeling,
    totalUser,
    totalUsersVendingDone,
    totalUsersGasStationDone,
  } = data;

  const [totalFeeling1] =
    totalUsersByFeeling?.filter((item) => item.feeling == "1") ?? [];
  const [totalFeeling2] =
    totalUsersByFeeling?.filter((item) => item.feeling == "2") ?? [];
  const [totalFeeling3] =
    totalUsersByFeeling?.filter((item) => item.feeling == "3") ?? [];
  const [totalFeeling4] =
    totalUsersByFeeling?.filter((item) => item.feeling == "4") ?? [];

  return (
    <div className="flex items-center gap-20 pt-8  text-base ">
      <div className="p-4 ring-1 ring-orange-400 rounded-lg space-y-2 ">
        <div className="flex items-center justify-between text-2xl font-bold mb-6 w-56 ">
          <h1>จำนวนผู้เล่นทั้งหมด</h1>
          <h1>{totalUser?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</h1>
        </div>
        <div className="flex items-center justify-between">
          <p>ผู้เล่น Gas Station</p>
          <p>
            {totalUsersGasStationDone?.total || 0}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
          </p>
        </div>
        <div className="flex items-center justify-between ">
          <p>ผู้เล่น Vending Machine</p>
          <p>
            {totalUsersVendingDone?.total || 0}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
          </p>
        </div>
      </div>
      <div className="p-4 ring-1 ring-orange-400 rounded-lg ">
        <div className="flex items-center justify-center text-2xl font-bold mb-2 w-56">
          <h1>Felling ทั้งหมด</h1>
        </div>
        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-4">
            <Image
              src={`${host}/image/gas/choice_01_emoji.png`}
              width={20}
              height={20}
              alt="emoji"
            />
            <p>เลิฟเลย ชอบมาก</p>
          </div>
          <p>
            {totalFeeling4?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
          </p>
        </div>
        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-4">
            <Image
              src={`${host}/image/gas/choice_02_emoji.png`}
              width={20}
              height={20}
              alt="emoji"
            />
            <p>ชอบ</p>
          </div>
          <p>
            {totalFeeling3?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
          </p>
        </div>
        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-4">
            <Image
              src={`${host}/image/gas/choice_03_emoji.png`}
              width={20}
              height={20}
              alt="emoji"
            />
            <p>เฉยๆ</p>
          </div>
          <p>
            {totalFeeling2?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
          </p>
        </div>
        <div className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-4">
            <Image
              src={`${host}/image/gas/choice_04_emoji.png`}
              width={20}
              height={20}
              alt="emoji"
            />
            <p>ไม่ค่อยชอบ</p>
          </div>
          <p>
            {totalFeeling1?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeaderTotal;

import React from "react";
import Image from "next/image";

const HeaderVending = ({ data = {} }) => {
  const host = process.env.HOST;

  const {
    totalUsersVendingMatchineFeeling,
    totalUsersVendingDone,
    totalValueReason,
    totalUsersByOccasion,
    totalUsersByBrand,
  } = data;

  const [totalFeeling1] =
    totalUsersVendingMatchineFeeling?.filter((item) => item.feeling == "1") ??
    [];
  const [totalFeeling2] =
    totalUsersVendingMatchineFeeling?.filter((item) => item.feeling == "2") ??
    [];
  const [totalFeeling3] =
    totalUsersVendingMatchineFeeling?.filter((item) => item.feeling == "3") ??
    [];
  const [totalFeeling4] =
    totalUsersVendingMatchineFeeling?.filter((item) => item.feeling == "4") ??
    [];

  const [reason1] = totalValueReason?.filter((item) => item.reason == "1") ?? [];
  const [reason2] = totalValueReason?.filter((item) => item.reason == "2") ?? [];
  const [reason3] = totalValueReason?.filter((item) => item.reason == "3") ?? [];
  const [reason4] = totalValueReason?.filter((item) => item.reason == "4") ?? [];
  const [reason5] = totalValueReason?.filter((item) => item.reason == "5") ?? [];
  const [reason6] = totalValueReason?.filter((item) => item.reason == "6") ?? [];
  const [reason7] = totalValueReason?.filter((item) => item.reason == "7") ?? [];

  const [occasion1] =
    totalUsersByOccasion?.filter((item) => item.occasion == "occasion_1") ?? [];
  const [occasion2] =
    totalUsersByOccasion?.filter((item) => item.occasion == "occasion_2") ?? [];
  const [occasion3] =
    totalUsersByOccasion?.filter((item) => item.occasion == "occasion_3") ?? [];
  const [occasion4] =
    totalUsersByOccasion?.filter((item) => item.occasion == "occasion_4") ?? [];
  const [occasion5] =
    totalUsersByOccasion?.filter((item) => item.occasion == "occasion_5") ?? [];
  const [occasion6] =
    totalUsersByOccasion?.filter((item) => item.occasion == "occasion_6") ?? [] ;
  const [occasion7] =
    totalUsersByOccasion?.filter((item) => item.occasion == "occasion_7") ?? [];
  const [occasion8] =
    totalUsersByOccasion?.filter((item) => item.occasion == "occasion_8") ?? [];
  const [occasion9] =
    totalUsersByOccasion?.filter((item) => item.occasion == "occasion_9") ?? [];
  
  const [brand1] =
    totalUsersByBrand?.filter((item) => item.brand == "brand_1") ?? [];
  const [brand2] =
    totalUsersByBrand?.filter((item) => item.brand == "brand_2") ?? [];
  const [brand3] =
    totalUsersByBrand?.filter((item) => item.brand == "brand_3") ?? [];
  const [brand4] =
    totalUsersByBrand?.filter((item) => item.brand == "brand_4") ?? [];
  const [brand5] =
    totalUsersByBrand?.filter((item) => item.brand == "brand_5") ?? [];
  const [brand6] =
    totalUsersByBrand?.filter((item) => item.brand == "brand_6") ?? [];
  const [brand7] =
    totalUsersByBrand?.filter((item) => item.brand == "brand_7") ?? [];
  const [brand8] =
    totalUsersByBrand?.filter((item) => item.brand == "brand_8") ?? [];
  const [brand9] =
    totalUsersByBrand?.filter((item) => item.brand == "brand_9") ?? [];

  return (
    <div className="flex items-center gap-12 pt-8  text-base">
      <div className="space-y-4">
        <div className="p-4 ring-1 ring-orange-400 rounded-lg  ">
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
        <div className="p-4 ring-1 ring-orange-400 rounded-lg ">
          <div className="text-center text-xl mb-4">
            <h1>จำนวนผู้เล่น Vending Machine ทั้งหมด</h1>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 ">
              <Image
                src={`${host}/image/vending_machine.png`}
                width={30}
                height={30}
                alt="dashboard"
              />
              <p>ผู้เล่น Vending Machine</p>
            </div>
            <p>
              {totalUsersVendingDone?.total || 0}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 ring-1 ring-orange-400 rounded-lg w-56 ">
        <h1 className="text-xl text-center mb-2">Reason</h1>
        <div className="flex items-center justify-between">
          <p>รสชาติเข้มข้น</p>
          <p>{reason1?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>รสชาติกลมกล่อม</p>
          <p>{reason2?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>ความกรอบกำลังดี</p>
          <p>{reason3?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>เนื้อสัมผัสกำลังดี</p>
          <p>{reason4?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>หอมกลิ่นซาวครีม</p>
          <p>{reason5?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>ขนาดของแผ่นชิปกำลังดี</p>
          <p>{reason6?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>อื่นๆ</p>
          <p>{reason7?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
      </div>
      <div className="p-4 ring-1 ring-orange-400 rounded-lg w-64 ">
        <h1 className="text-xl text-center mb-2">Occasion</h1>
        <div className="flex items-center justify-between">
          <p>ระหว่างดูหนัง/ดูซีรีย์</p>
          <p>{occasion1?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>ระหว่างพักทำงาน/อ่านหนังสือ</p>
          <p>{occasion2?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>ระหว่างเดินทาง/บนรถ</p>
          <p>{occasion3?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>ระหว่างเล่นเกม</p>
          <p>{occasion4?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>หลังเลิกงาน/เลิกเรียน</p>
          <p>{occasion5?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>เวลาอยู่คนเดียวต้องการพักผ่อน</p>
          <p>{occasion6?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>เวลาอยู่กับเพื่อนๆ/ครอบครัว</p>
          <p>{occasion7?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>เมื่อมีโปรโมชั่นเท่านั้น</p>
          <p>{occasion8?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>อื่นๆ</p>
          <p>{occasion9?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
      </div>
      <div className="p-4 ring-1 ring-orange-400 rounded-lg w-64">
        <h1 className="text-xl text-center mb-2">Brand</h1>
        <div className="flex items-center justify-between">
          <p>เลย์</p>
          <p>{brand1?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>เลย์สแตคส์</p>
          <p>{brand2?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>เลย์แมกซ์</p>
          <p>{brand3?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>พริงเกิลส์</p>
          <p>{brand4?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>เทสโต</p>
          <p>{brand5?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>มิสเตอร์โปเตโต้</p>
          <p>{brand6?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>ลิโก้</p>
          <p>{brand7?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>โรลเลอร์โคสเตอร์</p>
          <p>{brand8?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
        <div className="flex items-center justify-between">
          <p>อื่นๆ</p>
          <p>{brand9?.total || 0}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;คน</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderVending;

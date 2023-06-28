import React from "react";
// https://www.npmjs.com/package/exceljs?fbclid=IwAR1MrNhqbFA3GRi85fTl1linXS5-IoGO1f1AETuHZgo9Q-ezC3xkEfsN3io
import ExcelJs from "exceljs";
import { Button } from "@mui/material";
// import * as dayjs from "dayjs";
// var buddhistEra = require("dayjs/plugin/buddhistEra");
// dayjs.extend(buddhistEra);

const exportToExcel = (data = [], step = 0, information = {}) => {
  let columnName;

  if (step == 2) {
    columnName = [
      { name: "Full Name" },
      { name: "Mobile" },
      { name: "Vending Machine" },
      { name: "Feeling" },
      { name: "Reason 1" },
      { name: "Reason 2" },
      { name: "Reason 3" },
      { name: "occasion" },
      { name: "brand" },
      { name: "latest" },
    ];
  } else if (step == 1) {
    columnName = [
      { name: "Full Name" },
      { name: "Mobile" },
      { name: "Gas Station" },
      { name: "Feeling" },
      { name: "latest" },
    ];
  } else {
    columnName = [
      { name: "Full Name" },
      { name: "Mobile" },
      { name: "Gas Station" },
      { name: "Vending Machine" },
      { name: "latest" },
    ];
  }
  let sheetName = "สถิติผู้ใช้งาน Lay vote.xlsx";
  let headerName = "Lay vote";

  let workbook = new ExcelJs.Workbook();
  let sheet = workbook.addWorksheet(headerName, {
    views: [{ showGridLines: true }],
  });

  sheet.addTable({
    name: "table",
    ref: "A3",
    headerRow: true,
    totalsRow: false,
    style: {
      theme: "TableStyleMedium2",
      showRowStripes: false,
      width: 200,
    },
    columns: columnName,
    rows: data.map((el) => {
      const valueOccasion = [];
      const valueBrand = [];

      if (step == 2) {
        for (let i = 1; i <= 9; i++) {
          const occasionKey = `occasion${i}`;
          if (el[occasionKey] != 0) {
            valueOccasion.push(information?.occasion[i.toString()]);
          }
        }
        for (let i = 1; i <= 9; i++) {
          const brandKey = `brand${i}`;
          if (el[brandKey] != 0) {
            valueBrand.push(information?.brand[i.toString()]);
          }
        }
      }

      const rows = [];
      switch (step) {
        case 0:
          rows.push(
            el.fullName,
            el.tel,
            el.gasStationDone ? "/" : "-",
            el.vendingDone ? "/" : "-",
            el.updatedAt
          );
          break;
        case 1:
          rows.push(
            el.fullName,
            el.tel,
            "/",
            information.feeling[el.feeling],
            el.updatedAt
          );
          break;
        case 2:
          rows.push(
            el.fullName,
            el.tel,
            "/",
            information.feeling[el.feeling],
            information.reason[el.reason1],
            information.reason[el.reason2],
            information.reason[el.reason3],
            valueOccasion?.join(", "),
            valueBrand?.join(", "),
            el.updatedAt
          );
          break;

        default:
          break;
      }
      return rows;
    }),
  });

  sheet.columns = sheet.columns.map((e) => {
    const expr = e.values[5];
    switch (expr) {
      case "Full Name":
        return { width: 50 };
      case "latest":
        return { width: 56 };
      default:
        return { width: 20 };
    }
  });

  const table = sheet.getTable("table");

  table.commit();

  const writeFile = (fileName, content) => {
    const link = document.createElement("a");
    const blob = new Blob([content], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    link.download = fileName;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  workbook.xlsx.writeBuffer().then((buffer) => {
    writeFile(sheetName, buffer);
  });
};

const ExportExcel = ({ step = "", excelData = [], information = {} }) => {
  return (
    <Button
      variant="contained"
      className="!bg-[#e69049] py-2 px-6 rounded-md "
      onClick={() => {
        exportToExcel(excelData, step, information);
      }}
    >
      Export
    </Button>
  );
};

export default ExportExcel;

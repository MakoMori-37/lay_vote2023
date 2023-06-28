import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
var buddhistEra = require("dayjs/plugin/buddhistEra");
dayjs.extend(buddhistEra);

const VendingDataGrid = ({ list = [], information = {} }) => {
  const columnDefinitions = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      filterable: false,
      headerClassName: "theme--header",
      valueGetter: (params) => {
        return params.row?.index;
      },
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      headerClassName: "theme--header",
      valueGetter: (params) => {
        return params.row?.fullName;
      },
    },
    {
      field: "tel",
      headerName: "Mobile",
      flex: 1,
      headerClassName: "theme--header",
      valueGetter: (params) => {
        return params.row?.tel;
      },
    },
    // {
    //   field: "vendingDone",
    //   headerName: "Vending Machine",
    //   headerClassName: "theme--header",
    //   flex: 1,
    //   valueGetter: (params) => {
    //     return params.row?.vendingDone ? "/" : "-";
    //   },
    // },
    {
      field: "feeling",
      headerName: "feeling",
      headerClassName: "theme--header",
      flex: 1,
      valueGetter: (params) => {
        return information.feeling[params.row?.feeling];
      },
    },
    {
      field: "reason1",
      headerName: "Reason 1",
      headerClassName: "theme--header",
      flex: 1,
      valueGetter: (params) => {
        return information.reason[params.row?.reason1];
      },
    },
    {
      field: "reason2",
      headerName: "Reason 2",
      headerClassName: "theme--header",
      flex: 1,
      valueGetter: (params) => {
        return information.reason[params.row?.reason2];
      },
    },
    {
      field: "reason3",
      headerName: "Reason 3",
      headerClassName: "theme--header",
      flex: 1,
      valueGetter: (params) => {
        return information.reason[params.row?.reason3];
      },
    },
    {
      field: "occasion",
      headerName: "Occasion",
      headerClassName: "theme--header",
      flex: 1,
      valueGetter: (params) => {
        const value = [];

        for (let i = 1; i <= 9; i++) {
          const occasionKey = `occasion${i}`;
          if (params.row[occasionKey] != 0) {
            value.push(information?.occasion[i.toString()]);
          }
        }

        return value;
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      headerClassName: "theme--header",
      flex: 1,
      valueGetter: (params) => {
        const value = [];

        for (let i = 1; i <= 9; i++) {
          const brandKey = `brand${i}`;
          if (params.row[brandKey] != 0) {
            value.push(information?.brand[i.toString()]);
          }
        }

        return value;
      },
    },
    {
      field: "updatedAt",
      headerName: "Latest",
      headerClassName: "theme--header",
      flex: 1,
      valueGetter: (params) => {
        return dayjs(params?.row?.updatedAt).format("DD/MM/BBBB HH:mm") + " น.";
      },
    },
  ];

  return (
    <>
      <DataGrid
        sx={{
          "& .theme--header": {
            backgroundColor: "#e69049",
          },
        }}
        rows={list}
        autoHeight
        columns={columnDefinitions}
        hideFooter={list.length < 50}
      />
    </>
  );
};

export default VendingDataGrid;

import React from "react";
import { DataGrid } from "@mui/x-data-grid";

import dayjs from "dayjs";
var buddhistEra = require("dayjs/plugin/buddhistEra");
dayjs.extend(buddhistEra);

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
  {
    field: "gasStationDone",
    headerName: "Gas Station",
    headerClassName: "theme--header",
    flex: 1,
    valueGetter: (params) => {
      return params.row?.gasStationDone == "1" ? "/" : "-";
    },
  },
  {
    field: "vendingDone",
    headerName: "Vending Machine",
    headerClassName: "theme--header",
    alignMent:'center',
    flex: 1,
    valueGetter: (params) => {
      return params.row?.vendingDone ? "/" : "-";
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

const TotalDataGrid = ({ list = [] }) => {
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

export default TotalDataGrid;

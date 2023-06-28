import React from "react";

import GasDataGrid from "./GasDataGrid";
import TotalDataGrid from "./TotalDataGrid";
import VendingDataGrid from "./VendingDataGrid";

const RenderDatagrid = ({ step = 0, data = {}, information = {} }) => {
  const renderPage = () => {
    switch (step) {
      case 0:
        return <TotalDataGrid list={data} />;
      case 1:
        return <GasDataGrid list={data} information={information} />;
      case 2:
        return <VendingDataGrid list={data} information={information} />;
      default:
        return <div>Page not found.</div>;
    }
  };

  return <div className="w-full mt-4">{renderPage()}</div>;
};

export default RenderDatagrid;

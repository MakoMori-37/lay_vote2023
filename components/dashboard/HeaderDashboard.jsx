import React from "react";

import HeaderTotal from "./HeaderTotal";
import HeeaderGas from "./HeeaderGas";
import HeaderVending from "./HeaderVending";

const HeaderDashboard = ({ step = 0, data = {} }) => {
  const renderPage = () => {
    switch (step) {
      case 0:
        return <HeaderTotal data={data} />;
      case 1:
        return <HeeaderGas data={data} />;
      case 2:
        return <HeaderVending data={data} />;
      default:
        return <div>Page not found.</div>;
    }
  };

  return <div>{renderPage()}</div>;
};

export default HeaderDashboard;

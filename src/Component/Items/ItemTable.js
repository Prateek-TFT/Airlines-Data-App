import React from "react";
import Item from "./Item";
import "./ItemTable.css";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";

const DataTable = () => {
  const { storedData, showSpinner, currentPage } = useSelector(
    (state) => state.Reducer
  );
  let sendData = [];
  if (storedData[currentPage]) {
    sendData = storedData[currentPage];
  }
  return (
    <div id="dataTable">
      {showSpinner && <FadeLoader color={"rgb(43, 1, 43)"} loading={true} />}
      {!showSpinner && <Item data={sendData} />}
    </div>
  );
};
export default React.memo(DataTable);

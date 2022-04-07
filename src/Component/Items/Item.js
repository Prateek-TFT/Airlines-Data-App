import React from "react";
import { useSelector } from "react-redux";
import "./Item.css";
const DataItem = (props) => {
  const { currentPage } = useSelector((state) => state.Reducer);
  return (
    <>
      {props.data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div id="dataItem">
          <p className="itemTitle1">S.no</p>
          <p className="itemTitle">Trips</p>
          <p className="itemTitle">Name</p>
          <p className="itemTitle">Airline-name</p>
          <p className="itemTitle">Airline-country</p>
          <p className="itemTitle">Website</p>
        </div>
      )}
      {props.data.map((item, index) => {
        return (
          <div id="dataItem" key={item.id}>
            <p className="item1">{currentPage * 10 + index + 1}</p>
            <p className="item">{item.trips}</p>
            <p className="item">{item.name}</p>
            <p className="item">{item.airline_name}</p>
            <p className="item">{item.airline_country}</p>
            <a
              className="item"
              href={`https://${item.airline_website}`}
              rel="noreferrer"
              target="_blank"
            >
              {item.airline_website}
            </a>
          </div>
        );
      })}
    </>
  );
};
export default DataItem;

import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchData, ToggleSpinner } from "../../store/action";
import "./Pagination.css";
const initialState = {
  start: 1,
  end: 10,
  currentPage: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "next":
      return {
        start: state.start + 1,
        end: state.end + 1,
        currentPage: state.currentPage + 1,
      };
    case "previous":
      return {
        start: state.start - 1,
        end: state.end - 1,
        currentPage: state.currentPage - 1,
      };
    case "selected":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "first":
      return {
        start: action.payload,
        end: action.payload + 10,
        currentPage: action.payload,
      };
    case "last":
      return {
        start: action.payload - 10,
        end: action.payload,
        currentPage: action.payload - 10,
      };
    default:
      return state;
  }
};
const Pagination = () => {
  const [state, localdispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const { totalPage, storedData } = useSelector((state) => state.Reducer);
  const [prevbtndisabled, setprevbtndisabled] = useState(false);
  const [nextbtndisabled, setnextbtndisabled] = useState(false);
  const Pages = [];

  for (let index = state.start; index < state.end; index++) {
    Pages.push(index);
  }

  useEffect(() => {
    pageSelectHandler(1);
  }, []);
  useEffect(() => {
    if (state.start === 1) {
      setprevbtndisabled(true);
    } else if (state.end === totalPage - 1) {
      setnextbtndisabled(true);
      setprevbtndisabled(false);
    } else {
      setprevbtndisabled(false);
      setnextbtndisabled(false);
    }
  }, [state.start, state.end]);
  const fetchUser = async (Page) => {
    dispatch(ToggleSpinner(true));
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${Page}&size=10`
    );
    const responseData = await response.json();

    const loadedData = [];
    for (const key in responseData.data) {
      loadedData.push({
        id: key,
        trips: responseData.data[key].trips,
        name: responseData.data[key].name,
        airline_name: responseData.data[key].airline[0].name,
        airline_country: responseData.data[key].airline[0].country,
        airline_website: responseData.data[key].airline[0].website,
      });
    }
    const sendData = {
      data: loadedData,
      totalPage: responseData.totalPages,
      currentPage: Page - 1,
    };

    dispatch(FetchData(sendData));
    if (response.ok) {
      dispatch(ToggleSpinner(false));
    }
  };
  const pageSelectHandler = (page) => {
    localdispatch({ type: "selected", payload: page });
    if (storedData[page - 1]) {
      const sendData = {
        data: storedData[page - 1],
        totalPage: totalPage,
        currentPage: page - 1,
      };
      dispatch(FetchData(sendData));
    } else {
      fetchUser(page);
    }
  };

  const previousHandler = () => {
    localdispatch({ type: "previous" });
    pageSelectHandler(state.currentPage - 1);
  };
  const nextHandler = () => {
    localdispatch({ type: "next" });
    pageSelectHandler(state.currentPage + 1);
  };
  const lastPageHandler = (page) => {
    pageSelectHandler(page);
    localdispatch({ type: "last", payload: page });
  };
  const firstPageHandler = (page) => {
    pageSelectHandler(page);
    localdispatch({ type: "first", payload: page });
  };
  return (
    <div id="pagination">
      <button disabled={prevbtndisabled} onClick={previousHandler}>
        {" "}
        Previous
      </button>
      {state.start !== 1 && <p onClick={() => firstPageHandler(1)}>1...</p>}
      {Pages.map((item) => {
        return (
          <div
            onClick={() => pageSelectHandler(item)}
            className={state.currentPage === item ? "active" : ""}
            key={item}
          >
            {item}
          </div>
        );
      })}
      <p onClick={() => lastPageHandler(totalPage - 1)}>....{totalPage - 1}</p>
      <button disabled={nextbtndisabled} onClick={nextHandler}>
        Next
      </button>
    </div>
  );
};
export default React.memo(Pagination);

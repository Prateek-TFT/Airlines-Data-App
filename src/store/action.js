import { FETCHDATA, TOGGLESPINNER } from "./Action-type";
export const FetchData = (payload) => {
  return {
    type: FETCHDATA,
    payload: payload,
  };
};
export const ToggleSpinner = (payload) => {
  return {
    type: TOGGLESPINNER,
    payload: payload,
  };
};

import { FETCHDATA, TOGGLESPINNER } from "./Action-type";
const initialState = {
  storedData: {},
  totalPage: null,
  currentPage: 1,
  showSpinner: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHDATA:
      return {
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
        storedData: {
          ...state.storedData,
          [action.payload.currentPage]: action.payload.data,
        },
      };
    case TOGGLESPINNER:
      return {
        ...state,
        showSpinner: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default reducer;

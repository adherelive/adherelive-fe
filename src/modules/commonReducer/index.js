import isEmpty from "../../Helper/is-empty";

export const GET_MEDICINES_NAMES = "GET_MEDICINES_NAMES";
export const SET_MISSED_CHART_DRAWER_LOADING =
  "SET_MISSED_CHART_DRAWER_LOADING";

export const COMMON_INITIAL_STATE = {
  medicinesNames: [],
  missedChartDrawerLoading: true,
};

export default (state = COMMON_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MEDICINES_NAMES:
      return {
        ...state,
        medicinesNames: payload,
      };
    case SET_MISSED_CHART_DRAWER_LOADING:
      return {
        ...state,
        missedChartDrawerLoading: payload,
      };
    default:
      return state;
  }
};

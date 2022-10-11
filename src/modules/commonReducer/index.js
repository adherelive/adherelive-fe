import isEmpty from "../../Helper/is-empty";

export const GET_MEDICINES_NAMES = "GET_MEDICINES_NAMES";

export const COMMON_INITIAL_STATE = {
  medicinesNames: [],
};

export default (state = COMMON_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MEDICINES_NAMES:
      return {
        ...state,
        medicinesNames: payload,
      };
    default:
      return state;
  }
};

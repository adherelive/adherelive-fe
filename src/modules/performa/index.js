import { doRequest } from "../../Helper/network";
import { REQUEST_TYPE } from "../../constant";
// import {
//   getCdssDiagnosisList,
//   addCdssDiagnosisList,
//   getDiagnosisSearchUrl,
// } from "../../Helper/urls/cdss";
import isEmpty from "../../Helper/is-empty";

export const SET_PERFORMA_TABS = "SET_PERFORMA_TABS";
export const SET_PERFORMA_TABS_ID = "SET_PERFORMA_TABS_ID";

export const PERFORMA_INITIAL_STATE = {
    performaTabs: [],
    performaTabId: 0,
};

// export const addDiagnosis = (payload) => {
//   let response = {};
//   return async (dispatch) => {
//     try {
//       response = await doRequest({
//         method: REQUEST_TYPE.POST,
//         url: addCdssDiagnosisList(),
//         data: payload,
//       });

//       // const { status, payload: { data, message = "" } = {} } = response || {};

//       // if (response) {

//       // } else {
//       // }
//     } catch (error) {
//       console.log("GET CDSS DIAGNOSIS catch error -> ", error);
//     }
//     return response;
//   };
// };

// export const diagnosisSearch = (diagnosisName) => {
//   let response = {};
//   return async (dispatch) => {
//     try {
//       response = await doRequest({
//         method: REQUEST_TYPE.GET,
//         url: getDiagnosisSearchUrl(diagnosisName),
//       });

//       const { status, payload: { data, message = "" } = {} } = response || {};

//       if (response) {
//         if (!isEmpty(response)) {
//           // let diagnosisArray = [];

//           // response.forEach((element) => {
//           //   diagnosisArray.push(element.dia);
//           // });

//           dispatch({
//             type: GET_CDSS_DIAGNOSIS_LIST,
//             payload: response,
//           });
//         } else {
//           dispatch({
//             type: GET_CDSS_DIAGNOSIS_LIST,
//             payload: [],
//           });
//         }
//       } else {
//         console.log("error");
//       }
//     } catch (error) {
//       console.log("GET CDSS DIAGNOSIS SEARCH catch error -> ", error);
//     }
//     return response;
//   };
// };

export const setPerformaTabs = (value) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PERFORMA_TABS,
            payload: value,
        });
    };
};

export const setPerformaTabsId = (value) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PERFORMA_TABS_ID,
            payload: value,
        });
    };
};

export default (state = PERFORMA_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;
    switch (type) {
        case SET_PERFORMA_TABS:
            return {
                ...state,
                performaTabs: payload,
            };

        case SET_PERFORMA_TABS_ID:
            return {
                ...state,
                performaTabId: payload,
            };
        default:
            return state;
    }
};

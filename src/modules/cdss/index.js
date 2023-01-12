import { doRequest } from "../../Helper/network";
import { REQUEST_TYPE } from "../../constant";
import {
  getCdssDiagnosisList,
  addCdssDiagnosisList,
  getDiagnosisSearchUrl,
} from "../../Helper/urls/cdss";
import isEmpty from "../../Helper/is-empty";

export const GET_CDSS_DIAGNOSIS_LIST = "GET_CDSS_DIAGNOSIS_LIST";

export const CDSS_INITIAL_STATE = {
  diagnosisList: [],
};

export const getDiagnosisList = (payload) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.POST,
        url: getCdssDiagnosisList(),
        data: payload,
      });

      const { status, payload: { data, message = "" } = {} } = response || {};

      if (response) {
        if (!(response.length > 0)) {
          dispatch({
            type: GET_CDSS_DIAGNOSIS_LIST,
            payload: [],
          });
        } else {
          dispatch({
            type: GET_CDSS_DIAGNOSIS_LIST,
            payload: response,
          });
        }
      } else {
      }
    } catch (error) {
      console.log("GET CDSS DIAGNOSIS catch error -> ", error);
    }
    return response;
  };
};

export const addDiagnosis = (payload) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.POST,
        url: addCdssDiagnosisList(),
        data: payload,
      });

      // const { status, payload: { data, message = "" } = {} } = response || {};

      // if (response) {

      // } else {
      // }
    } catch (error) {
      console.log("GET CDSS DIAGNOSIS catch error -> ", error);
    }
    return response;
  };
};

export const diagnosisSearch = (diagnosisName) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: getDiagnosisSearchUrl(diagnosisName),
      });

      const { status, payload: { data, message = "" } = {} } = response || {};

      if (response) {
        if (!isEmpty(response)) {
          // let diagnosisArray = [];

          // response.forEach((element) => {
          //   diagnosisArray.push(element.dia);
          // });

          dispatch({
            type: GET_CDSS_DIAGNOSIS_LIST,
            payload: response,
          });
        } else {
          dispatch({
            type: GET_CDSS_DIAGNOSIS_LIST,
            payload: [],
          });
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("GET CDSS DIAGNOSIS SEARCH catch error -> ", error);
    }
    return response;
  };
};

export const googleTranslate = (textToConvert) => {
  let fromLang = "en";
  let toLang = "hi"; // translate to norwegian
  let text = textToConvert;

  const API_KEY = "AIzaSyBo9v7KZ_3LGCVVM-j0t8VzRUYboFafhSY";

  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  url += "&q=" + encodeURI(text);
  url += `&source=${fromLang}`;
  url += `&target=${toLang}`;

  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: url,
      });

      const { status, payload: { data, message = "" } = {} } = response || {};
    } catch (error) {
      console.log("GET CDSS DIAGNOSIS SEARCH catch error -> ", error);
    }
    return response;
  };
};

export const googleTranslateMultipleText = (textToConvert) => {
  let fromLang = "en";
  let toLang = "hi"; // translate to norwegian
  let text = textToConvert;

  const API_KEY = "AIzaSyBo9v7KZ_3LGCVVM-j0t8VzRUYboFafhSY";

  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  url += "&q=" + encodeURI(text);
  url += `&source=${fromLang}`;
  url += `&target=${toLang}`;

  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: url,
      });

      const { status, payload: { data, message = "" } = {} } = response || {};
    } catch (error) {
      console.log("GET CDSS DIAGNOSIS SEARCH catch error -> ", error);
    }
    return response;
  };
};

export default (state = CDSS_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CDSS_DIAGNOSIS_LIST:
      return {
        diagnosisList: payload,
      };
    default:
      return state;
  }
};

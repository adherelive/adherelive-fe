import { doRequest } from "../../Helper/network";
import { REQUEST_TYPE } from "../../constant";
import { addCdssDiagnosisList, getCdssDiagnosisList, getDiagnosisSearchUrl, } from "../../Helper/urls/cdss";
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

            const {status, payload: {data, message = ""} = {}} = response || {};

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
            console.log("Get CDSS diagnosis list catch error ---> ", error);
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
            console.log("Get CDSS diagnosis add catch error ---> ", error);
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

            const {status, payload: {data, message = ""} = {}} = response || {};

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
                console.log("Error in the CDSS diagnosis list for search");
            }
        } catch (error) {
            console.log("Get CDSS diagnosis search catch error ---> ", error);
        }
        return response;
    };
};

export const googleTranslate = async (textToConvert, fromLang = "en", toLang = "hi") => {
    const API_KEY = "AIzaSyC1QGwEYH7MUx1mTYgRMYPJDp5HfgK3Ybg"; // Assuming API_KEY is defined elsewhere

    const url = new URL("https://translation.googleapis.com/language/translate/v2");
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("q", encodeURI(textToConvert));
    url.searchParams.set("source", fromLang);
    url.searchParams.set("target", toLang);

    try {
        const response = await doRequest({ method: REQUEST_TYPE.GET, url: url.toString() });
        const { data, message = "" } = response.payload || {};
        return { status: response.status, data, message };
    } catch (error) {
        console.error("Google Translate Error: ", error);
        return { status: "error", message: "Translation failed" };
    }
};

export const googleTranslateMultipleText = async (textToConvertArray, toLang = "hi") => {
    const API_KEY = "AIzaSyC1QGwEYH7MUx1mTYgRMYPJDp5HfgK3Ybg"; // Assuming API_KEY is defined elsewhere

    if (!textToConvertArray || !textToConvertArray.length) {
        return { status: "error", message: "No text provided for translation" };
    }

    const url = new URL("https://translation.googleapis.com/language/translate/v2");
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("target", toLang);
    url.searchParams.set("q", textToConvertArray.join("\n")); // Combine text with newlines

    try {
        const response =
            await doRequest({ method: REQUEST_TYPE.POST, url: url.toString(), data: { q: textToConvertArray } });
        const { data, message = "" } = response.payload || {};
        return { status: response.status, data, message };
    } catch (error) {
        console.error("Google Translate Multiple Text Error: ", error);
        return { status: "error", message: "Translation failed" };
    }
};

export default (state = CDSS_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;
    switch (type) {
        case GET_CDSS_DIAGNOSIS_LIST:
            return {
                diagnosisList: payload,
            };
        default:
            return state;
    }
};

import { doRequest } from "../../Helper/network";
import { REQUEST_TYPE } from "../../constant";

import {
    getPatientsPaginatedUrl,
    getSearchDiagnosisPaginatedPatientsUrl,
    getSearchTreatmentPaginatedPatientsUrl,
} from "../../Helper/urls/patients";

export const GET_PATIENT_PAGINATED = "GET_PATIENT_PAGINATED";
export const GET_PATIENT_PAGINATED_COMPLETED =
    "GET_PATIENT_PAGINATED_COMPLETED";
export const GET_PATIENT_PAGINATED_FAILED = "GET_PATIENT_PAGINATED_FAILED";

export const GET_SEARCH_TREATMENT_PATIENTS = "GET_SEARCH_TREATMENT_PATIENTS";
export const GET_SEARCH_TREATMENT_PATIENTS_COMPLETED =
    "GET_SEARCH_TREATMENT_PATIENTS_COMPLETED";
export const GET_SEARCH_TREATMENT_PATIENTS_FAILED =
    "GET_SEARCH_TREATMENT_PATIENTS_FAILED";

export const GET_SEARCH_DIAGNOSIS_PATIENTS = "GET_SEARCH_DIAGNOSIS_PATIENTS";
export const GET_SEARCH_DIAGNOSIS_PATIENTS_COMPLETED =
    "GET_SEARCH_DIAGNOSIS_PATIENTS_COMPLETED";
export const GET_SEARCH_DIAGNOSIS_PATIENTS_FAILED =
    "GET_SEARCH_DIAGNOSIS_PATIENTS_FAILED";

/**
 * This function paginates teh Patients for a Doctor Dashboard page
 *
 * @param sort_createdAt
 * @param sort_name
 * @param filter_diagnosis
 * @param filter_treatment
 * @param offset
 * @param watchlist
 * @returns {function(*): Promise<any>}
 */
export const getPatientsPaginated = ({
                                         sort_createdAt,
                                         sort_name,
                                         filter_diagnosis,
                                         filter_treatment,
                                         offset,
                                         watchlist = 0,
                                     }) => {
    let response = {};
    console.log("Response in getPatientsPaginated outside for: ", response);
    return async (dispatch) => {
        try {
            dispatch({type: GET_PATIENT_PAGINATED});

            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getPatientsPaginatedUrl({
                    sort_createdAt,
                    sort_name,
                    filter_diagnosis,
                    filter_treatment,
                    offset,
                    watchlist,
                }),
            });

            console.log("Response in getPatientsPaginated inside for: ", response);
            let {status, payload: {data = {}} = {}} = response || {};

            if (status === true) {
                data["watchlist"] = watchlist.toString();
                data["offset"] = offset.toString();
                dispatch({
                    type: GET_PATIENT_PAGINATED_COMPLETED,
                    data,
                });
            } else {
                dispatch({
                    type: GET_PATIENT_PAGINATED_FAILED,
                });
            }
        } catch (err) {
            console.log("GET_PATIENT_PAGINATED error: ", err);
            throw err;
        }

        return response;
    };
};

/**
 *
 *
 * @param filter_treatment
 * @param offset
 * @param watchlist
 * @returns {function(*): Promise<any>}
 */
export const searchTreatmentPaginatedPatients = ({
    filter_treatment,
    offset,
    watchlist = 0,
}) => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: GET_SEARCH_TREATMENT_PATIENTS});

            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getSearchTreatmentPaginatedPatientsUrl({
                    filter_treatment,
                    offset,
                    watchlist,
                }),
            });

            let {status, payload: {data = {}} = {}} = response || {};

            if (status === true) {
                data["watchlist"] = watchlist.toString();
                data["offset"] = offset.toString();
                data["patient_table_search"] = true;
                dispatch({
                    type: GET_SEARCH_TREATMENT_PATIENTS_COMPLETED,
                    data,
                });
            } else {
                dispatch({
                    type: GET_SEARCH_TREATMENT_PATIENTS_FAILED,
                });
            }
        } catch (err) {
            console.log("GET_SEARCH_TREATMENT_PATIENTS err ======>>>>>", err);
            throw err;
        }

        return response;
    };
};

export const searchDiagnosisPaginatedPatients = ({
                                                     filter_diagnosis,
                                                     offset,
                                                     watchlist = 0,
                                                 }) => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: GET_SEARCH_DIAGNOSIS_PATIENTS});

            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getSearchDiagnosisPaginatedPatientsUrl({
                    filter_diagnosis,
                    offset,
                    watchlist,
                }),
            });

            let {status, payload: {data = {}} = {}} = response || {};

            if (status === true) {
                data["watchlist"] = watchlist.toString();
                data["offset"] = offset.toString();
                data["patient_table_search"] = true;
                dispatch({
                    type: GET_SEARCH_DIAGNOSIS_PATIENTS_COMPLETED,
                    data,
                });
            } else {
                dispatch({
                    type: GET_SEARCH_DIAGNOSIS_PATIENTS_FAILED,
                });
            }
        } catch (err) {
            console.log("GET_SEARCH_DIAGNOSIS_PATIENTS err ======>>>>>", err);
            throw err;
        }

        return response;
    };
};

function paginatedPatientReducer(state, data) {
    const {paginated_patients_data} = data || {};
    if (paginated_patients_data) {
        return {
            ...state,
            ...paginated_patients_data,
        };
    } else {
        return state;
    }
}

export default (state = {}, action) => {
    const {type, data} = action;
    switch (type) {
        default:
            return paginatedPatientReducer(state, data);
    }
};

import { doRequest } from "../../../Helper/network";
import { REQUEST_TYPE } from "../../../constant";
import { addServicesUrl, getProviderServicesUrl, getServicesUrl, } from "../../../Helper/urls/subscriptions";
import { SET_SERVICES } from "../../../reducer/index";

export const getServices = () => {
    let response = {};
    return async (dispatch) => {
        try {
            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getServicesUrl(),
            });

            const {status, payload: {data} = {}} = response || {};

            if (status === true) {
                dispatch({
                    type: SET_SERVICES,
                    payload: data,
                });
            } else {
                //   dispatch({
                //     type: GET_PATIENT_MISSED_EVENTS_FAILED,
                //   });
            }
        } catch (err) {
            // console.log("GET_PATIENT_MISSED_EVENTS_START err consentVerify", err);
            throw err;
        }

        return response;
    };
};

export const addServices = (payload, callBack) => {
    let response = {};
    return async (dispatch) => {
        try {
            response = await doRequest({
                method: REQUEST_TYPE.POST,
                url: addServicesUrl(),
                data: payload,
            });

            const {status, payload: {data} = {}} = response || {};

            if (status === true) {
                if (payload.doctor_id !== undefined) {
                    dispatch(getProviderServices(payload.doctor_id));
                } else {
                    dispatch(getServices());
                }
                callBack();
                //   dispatch({
                //     type: SET_SERVICES,
                //     payload: data,
                //   });
            } else {
                //   dispatch({
                //     type: GET_PATIENT_MISSED_EVENTS_FAILED,
                //   });
            }
        } catch (err) {
            // console.log("GET_PATIENT_MISSED_EVENTS_START err consentVerify", err);
            throw err;
        }

        return response;
    };
};

export const getProviderServices = (doctorId) => {
    let response = {};
    return async (dispatch) => {
        try {
            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getProviderServicesUrl(doctorId),
            });

            const {status, payload: {data} = {}} = response || {};

            if (status === true) {
                dispatch({
                    type: SET_SERVICES,
                    payload: data,
                });
            } else {
                //   dispatch({
                //     type: GET_PATIENT_MISSED_EVENTS_FAILED,
                //   });
            }
        } catch (err) {
            // console.log("GET_PATIENT_MISSED_EVENTS_START err consentVerify", err);
            throw err;
        }

        return response;
    };
};

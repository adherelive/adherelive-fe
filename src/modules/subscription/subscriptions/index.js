import { doRequest } from "../../../Helper/network";
import { REQUEST_TYPE } from "../../../constant";
import {
  getSubscriptionUrl,
  addSubscriptionUrl,
  updateSubscription,
  getProviderSubscriptionUrl,
} from "../../../Helper/urls/subscriptions";
import { SET_SUBSCRIPTIONS } from "../../../reducer/index";

export const getSubscriptions = () => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: getSubscriptionUrl(),
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        dispatch({
          type: SET_SUBSCRIPTIONS,
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

export const addSubscriptions = (payload, callBack) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.POST,
        url: addSubscriptionUrl(),
        data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        if (payload.doctor_id !== undefined) {
          dispatch(getProviderSubscriptions(payload.doctor_id));
        } else {
          dispatch(getSubscriptions());
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

export const updateSubscriptions = (payload, subscriptionId, callBack) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.PUT,
        url: updateSubscription(subscriptionId),
        data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        dispatch(getSubscriptions());
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

export const getProviderSubscriptions = (doctorId) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: getProviderSubscriptionUrl(doctorId),
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        dispatch({
          type: SET_SUBSCRIPTIONS,
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

import { doRequest } from "../../../Helper/network";
import { REQUEST_TYPE } from "../../../constant";
import {
  recommendServiceUrl,
  recommendSubscriptionUrl,
  getRecommendSeviceUrl,
  updateRecommendServiceUrl,
  updateRecommendSubscriptionUrl,
} from "../../../Helper/urls/subscriptions";
import isEmpty from "../../../Helper/is-empty";
import { SET_RECOMMENDED_SUBSCRIPTIONS_AND_SERVICES } from "../../../reducer/index";

export const recommendSubscription = (payload, callBack) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.POST,
        url: recommendSubscriptionUrl(),
        data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        dispatch(getRecommendServiceAndSubscription(payload.patient_id));
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

export const recommendService = (payload, callBack) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.POST,
        url: recommendServiceUrl(),
        data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        dispatch(getRecommendServiceAndSubscription(payload.patient_id));
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

export const updateRecommendService = (
  serviceId,
  patientId,
  payload,
  callBack
) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.PUT,
        url: updateRecommendServiceUrl(serviceId),
        data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        dispatch(getRecommendServiceAndSubscription(patientId));
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

export const updateRecommendSubscription = (
  subscriptionId,
  patientId,
  payload,
  callBack
) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.PUT,
        url: updateRecommendSubscriptionUrl(subscriptionId),
        data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        dispatch(getRecommendServiceAndSubscription(patientId));
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

export const getRecommendServiceAndSubscription = (patientId) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: getRecommendSeviceUrl(patientId),
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        let finalArray = [];

        if (!isEmpty(data.services)) {
          for (let each in data.services) {
            let singleService = data.services[each];
            singleService.type = "service";
            singleService.newId = Math.random().toString(36).slice(2);
            finalArray.push(singleService);
          }
        }
        if (!isEmpty(data.subscription)) {
          for (let each in data.subscription) {
            let singleSubscription = data.subscription[each];
            singleSubscription.type = "subscription";
            singleSubscription.newId = Math.random().toString(36).slice(2);
            finalArray.push(singleSubscription);
          }
        }

        console.log("finalArray", finalArray);

        dispatch({
          type: SET_RECOMMENDED_SUBSCRIPTIONS_AND_SERVICES,
          payload: finalArray,
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

import { doRequest } from "../../../Helper/network";
import { REQUEST_TYPE } from "../../../constant";
import {
  activitiesUrl,
  updateActivityUrl,
  patientCareplansUrl,
  patientCareplansSecondaryDoctorUrl,
} from "../../../Helper/urls/subscriptions";
import {
  SET_PENDING_ACTIVITIES_TABLE_DATA,
  SET_ACTIVITY_DATA_FOR_SCHEDULE,
} from "../../../reducer/index";

export const getAllActivities = (activityStatus, dueDateSort) => {
  let response = {};

  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: activitiesUrl(activityStatus, dueDateSort),
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        dispatch({
          type: SET_PENDING_ACTIVITIES_TABLE_DATA,
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

export const updateActivityById = (activityId, payload) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.PUT,
        url: updateActivityUrl(activityId),
        data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        // callBack();
        dispatch(getAllActivities());
      } else {
      }
    } catch (err) {
      // console.log("GET_PATIENT_MISSED_EVENTS_START err consentVerify", err);
      throw err;
    }

    return response;
  };
};

export const setScheduleAppontmentData = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ACTIVITY_DATA_FOR_SCHEDULE,
      payload: payload,
    });
  };
};

export const getPatientCareplanByPatientId = (patientId) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: patientCareplansUrl(patientId),
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
      } else {
      }
    } catch (err) {
      // console.log("GET_PATIENT_MISSED_EVENTS_START err consentVerify", err);
      throw err;
    }

    return response;
  };
};

export const getPatientCareplanByPatientIdAndUserRoleId = (patientId) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: patientCareplansSecondaryDoctorUrl(patientId),
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
      } else {
      }
    } catch (err) {
      // console.log("GET_PATIENT_MISSED_EVENTS_START err consentVerify", err);
      throw err;
    }

    return response;
  };
};

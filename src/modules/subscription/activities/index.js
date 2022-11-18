import { doRequest } from "../../../Helper/network";
import { REQUEST_TYPE } from "../../../constant";
import { patientCareplansUrl } from "../../../Helper/urls/subscriptions";

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

import { doRequest } from "../../../Helper/network";
import { REQUEST_TYPE } from "../../../constant";
import {
  SET_FLASHCARD_OPEN,
  SET_FALASHCARD_DATA,
  SET_ACTIVITY_DATA_FOR_SCHEDULE,
} from "../../../reducer/index";
import {
  getFlashcardByActivityIdUrl,
  addFlashCardUrl,
  updateFlashcardUrl,
} from "../../../Helper/urls/subscriptions";
import isEmpty from "./../../../Helper/is-empty";

export const setFlashCard = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_FLASHCARD_OPEN,
      payload: value,
    });
  };
};

export const setFlashcardData = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: SET_FALASHCARD_DATA,
      payload: payload,
    });
  };
};

export const setScheduledAppointmentData = (value) => {
  return async (dispatch) => {
    dispatch({
      type: SET_ACTIVITY_DATA_FOR_SCHEDULE,
      payload: value,
    });
  };
};

export const getFlashCardByActivityId = (activityId) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.GET,
        url: getFlashcardByActivityIdUrl(activityId),
        // data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        let flashCardData = {};
        if (!isEmpty(data.flashCard)) {
          flashCardData = {
            activityId: activityId,
            patientId: data.flashCard[0].patient_id,
            flashCardId: data.flashCard[0].id,
            flashCardQue: data.flashCard[0].data.flashCardData,
            flashCardNotes: data.flashCard[0].notes,
            is_published: data.flashCard[0].is_published,
          };
        } else {
          flashCardData = {
            activityId: "",
            patientId: "",
            flashCardId: "",
            flashCardQue: [
              {
                que: "Have you checked symptoms ?",
                ans: false,
              },
              {
                que: "Have you checked medical reports ?",
                ans: false,
              },
              {
                que: "Have you checked vitals ?",
                ans: false,
              },
              {
                que: "Have you checked messages ?",
                ans: false,
              },
              {
                que: "Have you checked medication adherance ?",
                ans: false,
              },
            ],
            flashCardNotes: [],
          };
        }

        dispatch({
          type: SET_FALASHCARD_DATA,
          payload: flashCardData,
        });

        // callBack();
        // dispatch(getAllActivities());
      } else {
      }
    } catch (err) {
      // console.log("GET_PATIENT_MISSED_EVENTS_START err consentVerify", err);
      throw err;
    }

    return response;
  };
};

export const addFlashcard = (payload) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.POST,
        url: addFlashCardUrl(),
        data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        // callBack();
        // dispatch(getAllActivities());
      } else {
      }
    } catch (err) {
      // console.log("GET_PATIENT_MISSED_EVENTS_START err consentVerify", err);
      throw err;
    }

    return response;
  };
};

export const updateFlashcardById = (flashcardId, payload) => {
  let response = {};
  return async (dispatch) => {
    try {
      response = await doRequest({
        method: REQUEST_TYPE.PUT,
        url: updateFlashcardUrl(flashcardId),
        data: payload,
      });

      const { status, payload: { data } = {} } = response || {};

      if (status === true) {
        dispatch({
          type: SET_FALASHCARD_DATA,
          payload: {},
        });
        // callBack();
        // dispatch(getAllActivities());
      } else {
      }
    } catch (err) {
      // console.log("GET_PATIENT_MISSED_EVENTS_START err consentVerify", err);
      throw err;
    }

    return response;
  };
};

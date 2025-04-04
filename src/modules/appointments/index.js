import { doRequest } from "../../Helper/network";
import { REQUEST_TYPE } from "../../constant";
import {
    addAppointmentUrl,
    addCarePlanAppointmentUrl,
    deleteAppointmentUrl,
    getAppointmentForDateUrl,
    getAppointmentForParticipantUrl,
    getAppointmentsDetailsUrl,
    updateAppointmentUrl,
} from "../../Helper/urls/appointments";
import { SET_APPOINTMENT_FOR_DAY } from "../../reducer/index";

export const ADD_APPOINTMENT_START = "ADD_APPOINTMENT_START";
export const ADD_APPOINTMENT_COMPLETE = "ADD_APPOINTMENT_COMPLETE";
export const ADD_APPOINTMENT_FAILED = "ADD_APPOINTMENT_FAILED";

export const ADD_CARE_PLAN_APPOINTMENT_START = "ADD_CARE_PLAN_APPOINTMENT_START";
export const ADD_CARE_PLAN_APPOINTMENT_COMPLETE = "ADD_CARE_PLAN_APPOINTMENT_COMPLETE";
export const ADD_CARE_PLAN_APPOINTMENT_FAILED = "ADD_CARE_PLAN_APPOINTMENT_FAILED";

export const UPDATE_APPOINTMENT_START = "UPDATE_APPOINTMENT_START";
export const UPDATE_APPOINTMENT_COMPLETE = "UPDATE_APPOINTMENT_COMPLETE";
export const UPDATE_APPOINTMENT_FAILED = "UPDATE_APPOINTMENT_FAILED";

export const GET_APPOINTMENTS_START = "GET_APPOINTMENTS_START";
export const GET_APPOINTMENTS_COMPLETE = "GET_APPOINTMENTS_COMPLETE";
export const GET_APPOINTMENTS_FAILED = "GET_APPOINTMENTS_FAILED";

export const GET_APPOINTMENTS_DETAILS = "GET_APPOINTMENTS_DETAILS";
export const GET_APPOINTMENTS_DETAILS_COMPLETE = "GET_APPOINTMENTS_DETAILS_COMPLETE";
export const GET_APPOINTMENTS_DETAILS_FAILED = "GET_APPOINTMENTS_DETAILS_FAILED";

export const DELETE_APPOINTMENTS_START = "DELETE_APPOINTMENTS_START";
export const DELETE_APPOINTMENTS_COMPLETE = "DELETE_APPOINTMENTS_COMPLETE";
export const DELETE_APPOINTMENTS_FAILED = "DELETE_APPOINTMENTS_FAILED";

export const addAppointment = (payload) => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: ADD_APPOINTMENT_START});

            response = await doRequest({
                method: REQUEST_TYPE.POST,
                url: addAppointmentUrl(),
                data: payload,
            });

            const {status, payload: {data = {}, error = {}} = {}} =
            response || {};
            if (status === true) {
                dispatch({
                    type: ADD_APPOINTMENT_COMPLETE,
                    data,
                });
            } else {
                dispatch({
                    type: ADD_APPOINTMENT_FAILED,
                    payload: error,
                });
            }
        } catch (error) {
            console.log("Add the Appointments in Care Plan error ---> addAppointment: ", error);
        }
        return response;
    };
};

export const addCarePlanAppointment = (payload, carePlanId) => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: ADD_CARE_PLAN_APPOINTMENT_START});

            response = await doRequest({
                method: REQUEST_TYPE.POST,
                url: addCarePlanAppointmentUrl(carePlanId),
                data: payload,
            });

            const {status, payload: {data = {}, error = {}} = {}} =
            response || {};
            if (status === true) {
                dispatch({
                    type: ADD_CARE_PLAN_APPOINTMENT_COMPLETE,
                    data,
                });
            } else {
                dispatch({
                    type: ADD_CARE_PLAN_APPOINTMENT_FAILED,
                    payload: error,
                });
            }
        } catch (error) {
            console.log("Add the Appointments in Care Plan error ---> addCarePlanAppointment: ", error);
        }
        return response;
    };
};

export const updateAppointment = (payload) => {
    let response = {};
    const {id, ...rest} = payload || {};
    return async (dispatch) => {
        try {
            dispatch({type: UPDATE_APPOINTMENT_START});

            response = await doRequest({
                method: REQUEST_TYPE.POST,
                url: updateAppointmentUrl(id),
                data: rest,
            });

            const {status, payload: {data = {}, error = {}} = {}} =
            response || {};
            if (status === true) {
                dispatch({
                    type: UPDATE_APPOINTMENT_COMPLETE,
                    payload: data,
                });
            } else {
                dispatch({
                    type: UPDATE_APPOINTMENT_FAILED,
                    payload: error,
                });
            }
        } catch (error) {
            console.log("Update the Appointment for Patient error ---> updateAppointments: ", error);
        }
        return response;
    };
};

export const getAppointments = (id) => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: GET_APPOINTMENTS_START});
            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getAppointmentForParticipantUrl(id),
            });

            const {status, payload: {data, error} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: GET_APPOINTMENTS_COMPLETE,
                    data,
                });
            } else {
                dispatch({
                    type: GET_APPOINTMENTS_FAILED,
                    error,
                });
            }
        } catch (error) {
            console.log("Get the Appointments for a Patient error in appointments ---> getAppointments: ", error);
        }
        return response;
    };
};

export const getAppointmentsDetails = () => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: GET_APPOINTMENTS_DETAILS});
            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getAppointmentsDetailsUrl(),
            });

            const {status, payload: {data, error} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: GET_APPOINTMENTS_DETAILS_COMPLETE,
                    data,
                });
            } else {
                dispatch({
                    type: GET_APPOINTMENTS_DETAILS_FAILED,
                    error,
                });
            }
        } catch (error) {
            console.log("Get the Appointments for a Patient error in appointments ---> getAppointmentsDetails: ", error);
        }
        return response;
    };
};

export const deleteAppointment = (id) => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: DELETE_APPOINTMENTS_START});
            response = await doRequest({
                method: REQUEST_TYPE.DELETE,
                url: deleteAppointmentUrl(id),
            });

            const {status, payload: {data, error} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: DELETE_APPOINTMENTS_COMPLETE,
                    data,
                });
            } else {
                dispatch({
                    type: DELETE_APPOINTMENTS_FAILED,
                    error,
                });
            }
        } catch (error) {
            console.log("Delete Appointments for Patient error ---> deleteAppointment: ", error);
        }
        return response;
    };
};

export const getAppointmentsDataForDay = (date) => {
    let appointments = {
        422: {
            basic_info: {
                id: 422,
                description: null,
                details: {
                    type: "2",
                    reason: "Follow-up",
                    critical: false,
                    description: "",
                    treatment_id: 1,
                    radiology_type: "",
                    type_description: "Telephone",
                },
                start_date: "2023-04-24",
                end_date: "2023-04-24",
                start_time: "2023-05-24T11:40:29.000Z",
                end_time: "2023-05-24T12:10:29.000Z",
            },
            participant_one: {
                id: 7,
                category: "doctor",
            },
            participant_two: {
                id: 11475,
                category: "patient",
            },
            organizer: {
                id: 7,
                category: "doctor",
                name: "Subharti Test",
            },
            rr_rule: null,
            provider_id: 5,
            provider_name: "",
            active_event_id: null,
            appointment_document_ids: [],
            care_plan_id: 12515,
        },
    };

    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: GET_APPOINTMENTS_START});
            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getAppointmentForDateUrl(date),
            });

            const {status, payload: {data, error} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: SET_APPOINTMENT_FOR_DAY,
                    payload: data.appointments,
                });
            } else {
                /** TODO: Handle the error case with UI warning, currently just falling through
                dispatch({
                  type: GET_APPOINTMENTS_FAILED,
                  error,
                });*/
            }
        } catch (error) {
            console.log("Get the Appointments for a Patient error ---> getAppointmentsDataForDay: ", error);
        }
        return response;
    };
};

function appointmentReducer(state, data) {
    const {appointments = {}} = data || {};
    if (Object.keys(appointments).length > 0) {
        return {
            ...state,
            ...appointments,
        };
    } else {
        return state;
    }
}

export default (state = {}, action = {}) => {
    const {type, data} = action;
    switch (type) {
        case GET_APPOINTMENTS_COMPLETE:
            return appointmentReducer(state, data);
        default:
            return appointmentReducer(state, data);
    }
};

import {doRequest} from "../../Helper/network";
import {DELETE_TEMPLATE_RELATED_TYPE, REQUEST_TYPE} from "../../constant";
import {
    createCarePlanTemplateUrl,
    deleteCarePlanTemplate,
    deleteCareplanTemplateAppointment,
    deleteCarePlanTemplateDiet,
    deleteCarePlanTemplateMedication,
    deleteCarePlanTemplateVital,
    deleteCarePlanTemplateWorkout,
    duplicateCarePlanTemplateUrl,
    getAllTemplatesUrl,
    getAllTemplatesUrlSearch,
    updateCarePlanTemplateUrl,
} from "../../Helper/urls/carePlanTemplates";

export const CREATE_CAREPLAN_TEMPLATE_START = "CREATE_CAREPLAN_TEMPLATE_START";
export const CREATE_CAREPLAN_TEMPLATE_COMPLETED =
    "CREATE_CAREPLAN_TEMPLATE_COMPLETED";
export const CREATE_CAREPLAN_TEMPLATE_FAILED =
    "CREATE_CAREPLAN_TEMPLATE_FAILED";

export const UPDATE_CAREPLAN_TEMPLATE_START = "UPDATE_CAREPLAN_TEMPLATE_START";
export const UPDATE_CAREPLAN_TEMPLATE_COMPLETED =
    "UPDATE_CAREPLAN_TEMPLATE_COMPLETED";
export const UPDATE_CAREPLAN_TEMPLATE_FAILED =
    "UPDATE_CAREPLAN_TEMPLATE_FAILED";

export const DUPLICATE_CAREPLAN_TEMPLATE_START =
    "DUPLICATE_CAREPLAN_TEMPLATE_START";
export const DUPLICATE_CAREPLAN_TEMPLATE_COMPLETED =
    "DUPLICATE_CAREPLAN_TEMPLATE_COMPLETED";
export const DUPLICATE_CAREPLAN_TEMPLATE_FAILED =
    "DUPLICATE_CAREPLAN_TEMPLATE_FAILED";

export const DELETE_CAREPLAN_TEMPLATE_RELATED_START =
    "DELETE_CAREPLAN_TEMPLATE_RELATED_START";
export const DELETE_CAREPLAN_TEMPLATE_RELATED_COMPLETED =
    "DELETE_CAREPLAN_TEMPLATE_RELATED_COMPLETED";
export const DELETE_CAREPLAN_TEMPLATE_RELATED_FAILED =
    "DELETE_CAREPLAN_TEMPLATE_RELATED_FAILED";

export const GET_ALL_TEMPLATES_FOR_DOC = "GET_ALL_TEMPLATES_FOR_DOC";
export const GET_ALL_TEMPLATES_FOR_DOC_COMPLETE =
    "GET_ALL_TEMPLATES_FOR_DOC_COMPLETE";
export const GET_ALL_TEMPLATES_FOR_DOC_FAILED =
    "GET_ALL_TEMPLATES_FOR_DOC_FAILED";

export const createCarePlanTemplate = (payload) => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: CREATE_CAREPLAN_TEMPLATE_START});

            response = await doRequest({
                method: REQUEST_TYPE.POST,
                url: createCarePlanTemplateUrl(),
                data: payload,
            });

            const {status, payload: {data, message = ""} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: CREATE_CAREPLAN_TEMPLATE_COMPLETED,
                    data,
                    payload: data,
                });
            } else {
                dispatch({
                    type: CREATE_CAREPLAN_TEMPLATE_FAILED,
                    message,
                });
            }
        } catch (error) {
            console.log("CREATE_CAREPLAN_TEMPLATE catch error -> ", error);
        }
        return response;
    };
};

export const getAllTemplatesForDoctor = () => {
    let response;
    return async (dispatch) => {
        try {
            dispatch({type: GET_ALL_TEMPLATES_FOR_DOC});
            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getAllTemplatesUrl(),
            });

            const {status, payload: {data, error} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: GET_ALL_TEMPLATES_FOR_DOC_COMPLETE,
                    data: data,
                    payload: data,
                });
            } else {
                dispatch({
                    type: GET_ALL_TEMPLATES_FOR_DOC_FAILED,
                    error,
                });
            }
        } catch (error) {
            console.log("GET ALL TEMPLATES FOR DOC error ---> ", error);
        }
        return response;
    };
};

// code implementation after phase 1

export const getAllTemplatesForDoctorUsingQuery = (text) => {
    let response;
    return async (dispatch) => {
        try {
            dispatch({type: GET_ALL_TEMPLATES_FOR_DOC});
            response = await doRequest({
                method: REQUEST_TYPE.GET,
                url: getAllTemplatesUrlSearch(text),
            });

            const {status, payload: {data, error} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: GET_ALL_TEMPLATES_FOR_DOC_COMPLETE,
                    data: data,
                    payload: data,
                });
            } else {
                dispatch({
                    type: GET_ALL_TEMPLATES_FOR_DOC_FAILED,
                    error,
                });
            }
        } catch (error) {
            console.log("GET ALL TEMPLATES FOR DOC error ---> ", error);
        }
        return response;
    };
};

export const updateCarePlanTemplate = (id, payload) => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: UPDATE_CAREPLAN_TEMPLATE_START});

            response = await doRequest({
                method: REQUEST_TYPE.POST,
                url: updateCarePlanTemplateUrl(id),
                data: payload,
            });

            const {status, payload: {data, message = ""} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: UPDATE_CAREPLAN_TEMPLATE_COMPLETED,
                    data,
                    payload: data,
                });
            } else {
                dispatch({
                    type: UPDATE_CAREPLAN_TEMPLATE_FAILED,
                    message,
                });
            }
        } catch (error) {
            console.log("UPDATE_CAREPLAN_TEMPLATE catch error -> ", error);
        }
        return response;
    };
};

export const duplicateCarePlanTemplate = (careplan_template_id) => {
    let response = {};
    return async (dispatch) => {
        try {
            dispatch({type: DUPLICATE_CAREPLAN_TEMPLATE_START});
            response = await doRequest({
                method: REQUEST_TYPE.POST,
                url: duplicateCarePlanTemplateUrl(careplan_template_id),
            });

            const {status, payload: {data, message = ""} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: DUPLICATE_CAREPLAN_TEMPLATE_COMPLETED,
                    data,
                    payload: data,
                });
            } else {
                dispatch({
                    type: DUPLICATE_CAREPLAN_TEMPLATE_FAILED,
                    message,
                });
            }
        } catch (error) {
            console.log("DUPLICATE_CAREPLAN_TEMPLATE catch error -> ", error);
        }
        return response;
    };
};

export const deleteCarePlanTemplateRelated = ({
                                                  careplan_template_id,
                                                  other_id,
                                                  other_type,
                                              }) => {
    let response = {};
    return async (dispatch) => {
        try {
            let url = "/";

            if (!other_type) {
                url = deleteCarePlanTemplate(careplan_template_id);
            } else if (other_type === DELETE_TEMPLATE_RELATED_TYPE.MEDICATION) {
                url = deleteCarePlanTemplateMedication(careplan_template_id, other_id);
            } else if (other_type === DELETE_TEMPLATE_RELATED_TYPE.APPOINTMENT) {
                url = deleteCareplanTemplateAppointment(careplan_template_id, other_id);
            } else if (other_type === DELETE_TEMPLATE_RELATED_TYPE.VITAL) {
                url = deleteCarePlanTemplateVital(careplan_template_id, other_id);
            } else if (other_type === DELETE_TEMPLATE_RELATED_TYPE.DIET) {
                url = deleteCarePlanTemplateDiet(careplan_template_id, other_id);
            } else if (other_type === DELETE_TEMPLATE_RELATED_TYPE.WORKOUT) {
                url = deleteCarePlanTemplateWorkout(careplan_template_id, other_id);
            }

            dispatch({type: DELETE_CAREPLAN_TEMPLATE_RELATED_START});
            response = await doRequest({
                method: REQUEST_TYPE.DELETE,
                url: url,
            });

            let {status, payload: {data, message = ""} = {}} = response || {};
            if (status === true) {
                dispatch({
                    type: DELETE_CAREPLAN_TEMPLATE_RELATED_COMPLETED,
                    data,
                    payload: data,
                });
            } else {
                dispatch({
                    type: DELETE_CAREPLAN_TEMPLATE_RELATED_FAILED,
                    message,
                });
            }
        } catch (error) {
            console.log("DELETE_CAREPLAN_TEMPLATE_RELATED catch error -> ", error);
        }
        return response;
    };
};

function carePlanTemplatesReducer(state, data) {
    const {care_plan_templates} = data || {};
    if (care_plan_templates) {
        return {
            ...state,
            ...care_plan_templates,
        };
    } else {
        return state;
    }
}

export default (state = {}, action) => {
    const {type, data} = action;
    switch (type) {
        default:
            return carePlanTemplatesReducer(state, data);
    }
};

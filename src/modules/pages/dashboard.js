import {GET_ALL_MISSED_SCHEDULE_EVENTS_COMPLETED} from "../scheduleEvents";

function missedEventReducer(state, data) {
    const {
        missed_medications = {},
        missed_appointments = {},
        missed_vitals = {},
        missed_diets = {},
        missed_workouts = {},
        // code implementation after phase 1
        appointment_ids = {},
        diet_ids = {},
        medication_ids = {},
        vital_ids = {},
        workout_ids = {},
    } = data || {};

    console.log("In the Dashboard function missedEventReducer - data ---> ", data);
    if (
        Object.keys(missed_medications).length > 0 ||
        Object.keys(missed_appointments).length > 0 ||
        Object.keys(missed_vitals).length > 0 ||
        Object.keys(missed_diets).length > 0 ||
        Object.keys(missed_workouts).length > 0 ||
        Object.keys(appointment_ids).length > 0 ||
        Object.keys(diet_ids).length > 0 ||
        Object.keys(medication_ids).length > 0 ||
        Object.keys(vital_ids).length > 0 ||
        Object.keys(workout_ids).length > 0
    ) {
        return {
            ...state,
            ...data,
        };
    } else {
        return state;
    }
}

export default (state = {}, action) => {
    const {type, data} = action;
    switch (type) {
        case GET_ALL_MISSED_SCHEDULE_EVENTS_COMPLETED:
            return missedEventReducer(state, data);
        default:
            return state;
    }
};

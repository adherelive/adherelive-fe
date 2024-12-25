// AKSHAY NEW CODE IMPLEMENTATION
const initialState = {
    appointmentsForDay: {},
    services: {},
    subscriptions: {},
    recommendServices: {},
    transactions: {},
    scheduleAppointment: {},
    activities: {},
    flashcardOpen: false,
    flashCardData: {
        activityId: "",
        patientId: "",
        flashCardId: "",
        flashCardQue: [],
        flashCardNotes: [],
        is_published: "",
    },
};

export const SET_SERVICES = "SET_SERVICES";
export const SET_SUBSCRIPTIONS = "SET_SUBSCRIPTIONS";
export const SET_RECOMMENDED_SUBSCRIPTIONS_AND_SERVICES =
    "SET_RECOMMENDED_SUBSCRIPTIONS_AND_SERVICES";
export const SET_TRANSACTION_TABLE_DATA = "SET_TRANSACTION_TABLE_DATA";
export const SET_FLASHCARD_OPEN = "SET_FLASHCARD_OPEN";
export const SET_ACTIVITY_DATA_FOR_SCHEDULE = "SET_ACTIVITY_DATA_FOR_SCHEDULE";
export const SET_PENDING_ACTIVITIES_TABLE_DATA =
    "SET_PENDING_ACTIVITIES_TABLE_DATA";
export const SET_FALASHCARD_DATA = "SET_FALASHCARD_DATA";
export const SET_APPOINTMENT_FOR_DAY = "SET_APPOINTMENT_FOR_DAY";

export default function (state = initialState, action) {
    const {type, payload = {}} = action;

    switch (type) {
        case SET_SERVICES:
            return {
                ...state,
                services: action.payload,
            };
        case SET_SUBSCRIPTIONS:
            return {
                ...state,
                subscriptions: action.payload,
            };
        case SET_RECOMMENDED_SUBSCRIPTIONS_AND_SERVICES:
            return {
                ...state,
                recommendServices: action.payload,
            };
        case SET_TRANSACTION_TABLE_DATA:
            return {
                ...state,
                transactions: action.payload,
            };

        case SET_ACTIVITY_DATA_FOR_SCHEDULE:
            return {
                ...state,
                scheduleAppointment: action.payload,
            };

        case SET_PENDING_ACTIVITIES_TABLE_DATA:
            return {
                ...state,
                activities: action.payload,
            };
        case SET_FLASHCARD_OPEN:
            return {
                ...state,
                flashcardOpen: action.payload,
            };
        case SET_FALASHCARD_DATA:
            return {
                ...state,
                flashCardData: action.payload,
            };
        case SET_APPOINTMENT_FOR_DAY:
            return {
                ...state,
                appointmentsForDay: action.payload,
            };
        default:
            return state;
    }
}

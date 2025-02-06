import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddAppointmentDrawer from "../../Components/Drawer/addAppointment";
import { close } from "../../modules/drawer";
import { DRAWER } from "../../constant";
import { getMedications } from "../../modules/medications";
import {
    addAppointment,
    addCarePlanAppointment,
    getAppointments,
    getAppointmentsDataForDay,
    getAppointmentsDetails,
} from "../../modules/appointments";
import {
    getFavourites,
    markFavourite,
    removeFavourite,
    removeFavouriteByRecordId,
} from "../../modules/favouritesData/index";
import { googleTranslate } from "../../modules/cdss";

// code implementation after phase 1 for Subscription
import {
    getPatientCarePlanByPatientIdAndUserRoleId,
    setScheduleAppointmentData,
    updateActivityById
} from "../../modules/subscription/activities";
import { setFlashCard } from "../../modules/subscription/flashcard";

const mapStateToProps = (state) => {
    const {
        drawer: {visible, loading, data: {type, payload = {}} = {}},
        patients,
        treatments,
        care_plans,
        static_templates,
        providers,
        favourites_data = {},
        pages: {favourite_medical_test_ids = []} = {},
        subscription: {scheduleAppointment = {}},
    } = state;
    return {
        visible: visible && type === DRAWER.ADD_APPOINTMENT,
        loading,
        payload,
        treatments,
        patients,
        care_plans,
        static_templates,
        providers,
        favourites_data,
        favourite_medical_test_ids,
        scheduleAppointment,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(close()),
        addAppointment: (data) => dispatch(addAppointment(data)),
        addCarePlanAppointment: (data, carePlanId) =>
            dispatch(addCarePlanAppointment(data, carePlanId)),
        getMedications: (id) => dispatch(getMedications(id)),
        getAppointmentsDetails: () => dispatch(getAppointmentsDetails()),
        getAppointments: (id) => dispatch(getAppointments(id)),
        markFavourite: (payload) => dispatch(markFavourite(payload)),
        getFavourites: ({type}) => dispatch(getFavourites({type})),
        removeFavourite: ({typeId, type}) =>
            dispatch(removeFavourite({typeId, type})),
        removeFavouriteRecord: (id) => dispatch(removeFavouriteByRecordId(id)),
        // code implementation after phase 1 for Subscription
        updateActivityById: (id, payload) =>
            dispatch(updateActivityById(id, payload)),
        setFlashCard: (value) => dispatch(setFlashCard(value)),
        setScheduleAppointmentData: (payload) =>
            dispatch(setScheduleAppointmentData(payload)),
        getPatientCarePlanByPatientIdAndUserRoleId: (patientId) =>
            dispatch(getPatientCarePlanByPatientIdAndUserRoleId(patientId)),
        googleTranslate: (textToConvert) =>
            dispatch(googleTranslate(textToConvert)),
        getAppointmentsDataForDay: (date) =>
            dispatch(getAppointmentsDataForDay(date)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddAppointmentDrawer)
);

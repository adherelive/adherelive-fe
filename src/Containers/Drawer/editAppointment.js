import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import EditAppointmentDrawer from "../../Components/Drawer/editAppointment";
import {close} from "../../modules/drawer";
import {DRAWER} from "../../constant";
import {getMedications} from "../../modules/medications";
import {getPatientCarePlanDetails} from "../../modules/carePlans";
import {
    deleteAppointment,
    getAppointments,
    getAppointmentsDataForDay,
    getAppointmentsDetails,
    updateAppointment,
} from "../../modules/appointments";
import {
    getFavourites,
    markFavourite,
    removeFavourite,
    removeFavouriteByRecordId,
} from "../../modules/favouritesData/index";
import {googleTranslate} from "../../modules/cdss";

// code implementation after phase 1 for Subscription
import {updateActivityById} from "../../modules/subscription/activities";

const mapStateToProps = (state) => {
    const {
        drawer: {visible, loading, data: {type, payload = {}} = {}},
        patients,
        treatments,
        appointments,
        static_templates,
        providers,
        favourites_data = {},
        pages: {favourite_medical_test_ids = []} = {},
        subscription: {scheduleAppointment = {}},
    } = state;
    return {
        visible: visible && type === DRAWER.EDIT_APPOINTMENT,
        loading,
        payload,
        patients,
        appointments,
        treatments,
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
        updateAppointment: (data) => dispatch(updateAppointment(data)),
        deleteAppointment: (id) => dispatch(deleteAppointment(id)),
        getAppointments: (id) => dispatch(getAppointments(id)),
        getMedications: (id) => dispatch(getMedications(id)),
        getPatientCarePlanDetails: (patientId) =>
            dispatch(getPatientCarePlanDetails(patientId)),
        markFavourite: (payload) => dispatch(markFavourite(payload)),
        getFavourites: ({type}) => dispatch(getFavourites({type})),
        removeFavourite: ({typeId, type}) =>
            dispatch(removeFavourite({typeId, type})),
        removeFavouriteRecord: (id) => dispatch(removeFavouriteByRecordId(id)),
        getAppointmentsDetails: () => dispatch(getAppointmentsDetails()),

        // editAppointment: data => dispatch(editAppointment(data)),
        // code implementation after phase 1 for Subscription
        updateActivityById: (id, payload) =>
            dispatch(updateActivityById(id, payload)),
        googleTranslate: (textToConvert) =>
            dispatch(googleTranslate(textToConvert)),
        getAppointmentsDataForDay: (date) =>
            dispatch(getAppointmentsDataForDay(date)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditAppointmentDrawer)
);

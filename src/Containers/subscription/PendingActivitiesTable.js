import { connect } from "react-redux";
import PendingActivitiesTable from "../../Components/Subscription/PendingActivitiesTable";
import { withRouter } from "react-router-dom";
import { getAllActivities, searchTxActivites, setScheduleAppointmentData } from "../../modules/subscription/activities";
// import { open } from "../../../modules/drawer";
import { DRAWER } from "../../constant";
import { open } from "../../modules/drawer";
import { getAppointmentsDetails } from "../../modules/appointments";
import { setFlashCard } from "../../modules/subscription/flashcard";

const mapStateToProps = (state) => {
    const {subscription: {activities = {}} = {}} = state;
    return {
        activities,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAppointmentsDetails: () => dispatch(getAppointmentsDetails()),
        openAppointmentDrawer: (payload) =>
            dispatch(open({type: DRAWER.ADD_APPOINTMENT, payload})),
        openEditAppointmentDrawer: (payload) =>
            dispatch(open({type: DRAWER.EDIT_APPOINTMENT, payload})),
        getAllActivities: (activityStatus, dueDateSort) =>
            dispatch(getAllActivities(activityStatus, dueDateSort)),
        setFlashCard: (value) => dispatch(setFlashCard(value)),
        setScheduleAppointmentData: (payload) =>
            dispatch(setScheduleAppointmentData(payload)),
        openPatientDetailsDrawer: (payload) =>
            dispatch(open({type: DRAWER.PATIENT_DETAILS, payload})),
        searchTxActivites: (query) => dispatch(searchTxActivites(query)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(PendingActivitiesTable)
);

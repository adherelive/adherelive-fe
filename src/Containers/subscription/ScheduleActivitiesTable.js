import {connect} from "react-redux";
import ScheduleActivitiesTable from "../../Components/Subscription/ScheduleActivitiesTable";
import {withRouter} from "react-router-dom";
import {getAllActivities} from "./../../modules/subscription/activities";
import {DRAWER} from "../../constant";
import { open, close } from "../../modules/drawer";
import {getAppointments, getAppointmentsDetails,} from "../../modules/appointments";
import {searchTxActivites, setScheduleAppointmentData,} from "../../modules/subscription/activities";

const mapStateToProps = (state) => {
    const {subscription: {activities = {}} = {}} = state;
    return {
        activities,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAppointmentsDetails: () => dispatch(getAppointmentsDetails()),
        getAppointments: (id) => dispatch(getAppointments(id)),
        getAllActivities: (activityStatus, dueDateSort) =>
            dispatch(getAllActivities(activityStatus, dueDateSort)),
        openEditAppointmentDrawer: (payload) =>
            dispatch(open({type: DRAWER.EDIT_APPOINTMENT, payload})),
        setScheduleAppointmentData: (payload) =>
            dispatch(setScheduleAppointmentData(payload)),
        openPatientDetailsDrawer: (payload) =>
            dispatch(open({type: DRAWER.PATIENT_DETAILS, payload})),
        searchTxActivites: (query) => dispatch(searchTxActivites(query)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ScheduleActivitiesTable)
);

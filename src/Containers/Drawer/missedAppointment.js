import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getAllMissedScheduleEvents} from "../../modules/scheduleEvents";
import MissedAppointmentsDrawer from "../../Components/Drawer/missedAppointmentsDrawer";
import {close} from "../../modules/drawer";
import {DRAWER} from "../../constant";

const mapStateToProps = (state) => {
    console.log("Redux state: ", state); // Log the entire state
    console.log("Patients in state: ", state.patients); // Log the patients object

    const {
        auth: {
            authPermissions = [],
            authenticated_user = 1,
            authenticated_category,
        } = {},
        drawer: {visible, loading, data: {type, payload = {}} = {}},
        patients = {},
        pages: {dashboard: {missed_appointments, appointment_ids} = {}},
        commonReducer: {missedChartDrawerLoading},
    } = state;

    console.log("In the missedAppointment.js mapStateToProps - mapStateToProps ---> ",
        authenticated_category,
        loading,
        payload,
        authPermissions,
        authenticated_user,
        state.patients,
        missed_appointments,
        appointment_ids,
        missedChartDrawerLoading
    );

    return {
        visible: visible && type === DRAWER.MISSED_APPOINTMENT,
        authenticated_category,
        loading,
        payload,
        authPermissions,
        authenticated_user,
        patients,
        missed_appointments,
        appointment_ids,
        missedChartDrawerLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMissedScheduleEvents: () => dispatch(getAllMissedScheduleEvents()),
        close: () => dispatch(close()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MissedAppointmentsDrawer)
);

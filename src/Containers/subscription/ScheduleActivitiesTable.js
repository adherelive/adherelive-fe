import { connect } from "react-redux";
import ScheduleActivitiesTable from "../../Components/Subscription/ScheduleActivitiesTable";
import { withRouter } from "react-router-dom";
import { getAllActivities } from "./../../modules/subscription/activities";
import { DRAWER } from "../../constant";
import { open, close } from "../../modules/drawer";
import {
  getAppointmentsDetails,
  getAppointments,
} from "../../modules/appointments";
import { setScheduleAppontmentData } from "../../modules/subscription/activities";

const mapStateToProps = (state) => {
  const { subscription: { activities = {} } = {} } = state;
  return {
    activities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppointmentsDetails: () => dispatch(getAppointmentsDetails()),
    getAppointments: (id) => dispatch(getAppointments(id)),
    getAllActivities: (activityStatus) =>
      dispatch(getAllActivities(activityStatus)),
    openEditAppointmentDrawer: (payload) =>
      dispatch(open({ type: DRAWER.EDIT_APPOINTMENT, payload })),
    setScheduleAppontmentData: (payload) =>
      dispatch(setScheduleAppontmentData(payload)),
    openPatientDetailsDrawer: (payload) =>
      dispatch(open({ type: DRAWER.PATIENT_DETAILS, payload })),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ScheduleActivitiesTable)
);

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AddAppointmentDrawer from "../../Components/Drawer/addAppointment";
import { close } from "../../modules/drawer";
import { DRAWER } from "../../constant";
import { getMedications } from "../../modules/medications";
import {
  getAppointments,
  addAppointment,
  addCarePlanAppointment,
  getAppointmentsDetails,
} from "../../modules/appointments";
import {
  markFavourite,
  getFavourites,
  removeFavourite,
  removeFavouriteByRecordId,
} from "../../modules/favouritesData/index";

// AKSHAY NEW CODE FOR SUBSCRIPTION
import { updateActivityById } from "./../../modules/subscription/activities";
import {
  setScheduleAppontmentData,
  getPatientCareplanByPatientId,
} from "./../../modules/subscription/activities";
import { setFlashCard } from "../../modules/subscription/flashcard";

const mapStateToProps = (state) => {
  const {
    drawer: { visible, loading, data: { type, payload = {} } = {} },
    patients,
    treatments,
    care_plans,
    static_templates,
    providers,
    favourites_data = {},
    pages: { favourite_medical_test_ids = [] } = {},
    subscription: { scheduleAppointment = {} },
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
    getFavourites: ({ type }) => dispatch(getFavourites({ type })),
    removeFavourite: ({ typeId, type }) =>
      dispatch(removeFavourite({ typeId, type })),
    removeFavouriteRecord: (id) => dispatch(removeFavouriteByRecordId(id)),
    // AKSHAY NEW CODE FRO SUBSCRIPTION
    updateActivityById: (id, payload) =>
      dispatch(updateActivityById(id, payload)),
    setFlashCard: (value) => dispatch(setFlashCard(value)),
    setScheduleAppontmentData: (payload) =>
      dispatch(setScheduleAppontmentData(payload)),
    getPatientCareplanByPatientId: (patientId) =>
      dispatch(getPatientCareplanByPatientId(patientId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddAppointmentDrawer)
);

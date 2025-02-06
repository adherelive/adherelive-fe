import { withRouter } from "react-router-dom";
import Dashboard from "../../Components/Dashboard";
import { getInitialData, signOut } from "../../modules/auth";
import { addPatient, searchPatientFromNum } from "../../modules/patients";
import { searchMedicine } from "../../modules/medicines";
import { searchTreatment } from "../../modules/treatments";
import { searchCondition } from "../../modules/conditions";
import { searchSeverity } from "../../modules/severity";
import { getGraphs, updateGraphs } from "../../modules/graphs";
import { connect } from "react-redux";
import { closePopUp } from "../../modules/chat";
import { fetchChatAccessToken } from "../../modules/twilio";
import { addToWatchlist, removePatientFromWatchlist, } from "../../modules/doctors";
import { showVerifyModal } from "../../modules/pages/features";
import { getAllFeatures } from "../../modules/featuresMappings";
import { DRAWER } from "../../constant";
import { open } from "../../modules/drawer";
import {
    getAllMissedEventChartCount,
    getAllMissedEventDataByQuery,
    getAllMissedScheduleEvents,
} from "../../modules/scheduleEvents";
import { setUnseenNotificationCount } from "../../modules/pages/NotificationCount";
import { getAllDietsForDoctor } from "../../modules/diets";
// code implementation after phase 1 for CDSS/mongodb
import { addDiagnosis, diagnosisSearch, getDiagnosisList, } from "../../modules/cdss";

const mapStateToProps = (state) => {
    const {
        graphs,
        auth: {
            authenticated_category,
            authPermissions = [],
            authenticated_user = 1,
            auth_role = null,
            notificationToken = "",
            feedId = "",
            doctor_provider_id = "",
        } = {},
        treatments = {},
        conditions = {},
        pages: {ui_features = {}, dashboard = {}} = {},
        severity = {},
        chats,
        drawer,
        twilio,
        patients,
        doctors = {},
        features = {},
        features_mappings = {},
        providers = {},
        care_plans = {},
        drawer: {visible, data: {type, payload = {}} = {}},
        medicines = {},
    } = state;

    return {
        notificationToken,
        authenticated_category,
        feedId,
        graphs,
        treatments,
        conditions,
        severity,
        authPermissions,
        chats,
        drawer,
        twilio,
        patients,
        doctors,
        authenticated_user,
        ui_features,
        features,
        features_mappings,
        dashboard,
        doctor_provider_id,
        providers,
        auth_role,
        care_plans,
        payload,
        medicines,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getGraphs: () => dispatch(getGraphs()),
        updateGraphs: (data) => dispatch(updateGraphs(data)),
        getInitialData: () => dispatch(getInitialData()),
        searchMedicine: (value) => dispatch(searchMedicine(value)),
        searchCondition: (value) => dispatch(searchCondition(value)),
        searchTreatment: (value) => dispatch(searchTreatment(value)),
        searchSeverity: (value) => dispatch(searchSeverity(value)),
        addPatient: (data) => dispatch(addPatient(data)),
        closePopUp: () => dispatch(closePopUp()),
        fetchChatAccessToken: (userId) => dispatch(fetchChatAccessToken(userId)),
        searchPatientFromNum: (value) => dispatch(searchPatientFromNum(value)),
        addToWatchlist: (patient_id) => dispatch(addToWatchlist(patient_id)),
        removePatientFromWatchlist: (patient_id) => dispatch(removePatientFromWatchlist(patient_id)),
        showVerifyModal: (data) => dispatch(showVerifyModal(data)),
        getAllFeatures: () => dispatch(getAllFeatures()),
        setUnseenNotificationCount: (count) => dispatch(setUnseenNotificationCount(count)),
        getDiagnosisList: (payload) => dispatch(getDiagnosisList(payload)),
        addDiagnosis: (payload) => dispatch(addDiagnosis(payload)),
        diagnosisSearch: (payload) => dispatch(diagnosisSearch(payload)),
        openMissedDietDrawer: () => dispatch(open({type: DRAWER.MISSED_DIET})),
        openMissedWorkoutDrawer: () => dispatch(open({type: DRAWER.MISSED_WORKOUT})),
        openMissedMedicationDrawer: () => dispatch(open({type: DRAWER.MISSED_MEDICATION})),
        openMissedAppointmentDrawer: () => dispatch(open({type: DRAWER.MISSED_APPOINTMENT})),
        openMissedVitalDrawer: () => dispatch(open({type: DRAWER.MISSED_VITAL})),
        getAllMissedScheduleEvents: () => dispatch(getAllMissedScheduleEvents()),
        // TODO: Check why these are not getting used anywhere? Does the above cater for all the missed?
        getAllDietsForDoctor: () => dispatch(getAllDietsForDoctor()),
        getAllMissedEventChartCount: () => dispatch(getAllMissedEventChartCount()),
        getAllMissedEventDataByQuery: (type) => dispatch(getAllMissedEventDataByQuery(type)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);

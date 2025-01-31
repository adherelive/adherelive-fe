import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import AddCarePlanDrawer from "../../Components/Drawer/addCareplan";
import {close} from "../../modules/drawer";
import {DRAWER} from "../../constant";
import {getInitialData} from "../../modules/auth";
import {getMedications} from "../../modules/medications";
import {
  addAppointment,
  addCarePlanAppointment,
  getAppointments,
} from "../../modules/appointments";
import {searchMedicine} from "../../modules/medicines";
import {searchTreatment} from "../../modules/treatments";
import {searchCondition} from "../../modules/conditions";
import {searchSeverity} from "../../modules/severity";
import {addCarePlanForPatient} from "../../modules/patients";
// code implementation after phase 1 for CDSS/mongodb
import {addDiagnosis, diagnosisSearch, getDiagnosisList, googleTranslate,} from "../../modules/cdss";

const mapStateToProps = (state) => {
    const {
        drawer: {visible, loading, data: {type, payload = {}} = {}},
        treatments = {},
        conditions = {},
        severity = {},
        patients,
        doctors,
        care_plans,
    } = state;
    return {
        visible: visible && type === DRAWER.ADD_CAREPLAN,
        loading,
        payload,
        care_plans,
        // static_templates,
        // providers,
        treatments,
        conditions,
        severity,
        patients,
        doctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(close()),
        getMedications: (id) => dispatch(getMedications(id)),
        getInitialData: () => dispatch(getInitialData()),
        searchMedicine: (value) => dispatch(searchMedicine(value)),
        searchCondition: (value) => dispatch(searchCondition(value)),
        searchTreatment: (value) => dispatch(searchTreatment(value)),
        searchSeverity: (value) => dispatch(searchSeverity(value)),
        addCarePlanForPatient: (patient_id, data) =>
            dispatch(addCarePlanForPatient(patient_id, data)),
        // code implementation after phase 1 for CDSS/mongodb
        getDiagnosisList: (payload) => dispatch(getDiagnosisList(payload)),
        addDiagnosis: (payload) => dispatch(addDiagnosis(payload)),
        diagnosisSearch: (payload) => dispatch(diagnosisSearch(payload)),
        googleTranslate: (textToConvert) =>
            dispatch(googleTranslate(textToConvert)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddCarePlanDrawer)
);

import { connect } from "react-redux";
import EditPatientDrawer from "../../Components/Drawer/editPatient";
import { DRAWER } from "../../constant";
import { close } from "../../modules/drawer";
import { searchTreatment } from "../../modules/treatments";
import { searchCondition } from "../../modules/conditions";
import { searchSeverity } from "../../modules/severity";
import { searchMedicine } from "../../modules/medicines";
import { updatePatientAndCareplan } from "../../modules/doctors";
import { getPatientDetailsById } from "../../modules/patients";
// code implementation after phase 1 for CDSS/mongodb
import { diagnosisSearch, getDiagnosisList, googleTranslate, } from "../../modules/cdss";

const mapStateToProps = (state) => {
    const {auth} = state;
    const {authenticated_user, authenticated_category} = auth;
    const {
        drawer: {visible, loading, data: {type, payload = {}} = {}},
        users = {},
        treatments = {},
        conditions = {},
        severity = {},
        patients = {},
        doctors = {},
    } = state;

    return {
        visible: visible && type === DRAWER.EDIT_PATIENT,
        loading,
        payload,
        treatments,
        conditions,
        severity,
        patients,
        users,
        doctors,
        authenticated_user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(close()),
        searchMedicine: (value) => dispatch(searchMedicine(value)),
        searchCondition: (value) => dispatch(searchCondition(value)),
        searchTreatment: (value) => dispatch(searchTreatment(value)),
        searchSeverity: (value) => dispatch(searchSeverity(value)),
        updatePatientAndCareplan: (careplan_id, payload) =>
            dispatch(updatePatientAndCareplan(careplan_id, payload)),
        getPatientDetailsById: (patientId) =>
            dispatch(getPatientDetailsById(patientId)),
        // code implementation after phase 1 for CDSS/mongodb
        getDiagnosisList: (payload) => dispatch(getDiagnosisList(payload)),
        diagnosisSearch: (payload) => dispatch(diagnosisSearch(payload)),
        googleTranslate: (textToConvert) =>
            dispatch(googleTranslate(textToConvert)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPatientDrawer);

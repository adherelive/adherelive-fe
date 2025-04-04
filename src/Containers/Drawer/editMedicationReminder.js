import { connect } from "react-redux";
import EditMedicationReminder from "../../Components/Drawer/editMedicationReminder/medicationsReminder";
import { DRAWER } from "../../constant";
import { close } from "../../modules/drawer";
import { deleteMedication, getMedications, updateMedication, } from "../../modules/medications";
import { getMedicationDetails } from "../../modules/otherDetails";
import { addMedicine, searchMedicine } from "../../modules/medicines";
import { getPatientCarePlanDetails } from "../../modules/carePlans";

import { getFavourites, markFavourite, removeFavourite, } from "../../modules/favouritesData/index";
import { googleTranslate } from "../../modules/cdss";

const mapStateToProps = (state) => {
    const {auth} = state;
    const {authenticated_user, authenticated_category} = auth;
    const {
        drawer: {visible, loading, data: {type, payload = {}} = {}},
        other_details: {medication_details = {}} = {},
        medications,
        medicines,
        patients,
        doctors = {},
        favourites_data = {},
        pages: {favourite_medicine_ids = []} = {},
    } = state;

    return {
        visible: visible && type === DRAWER.EDIT_MEDICATION,
        loading,
        payload,
        medication_details,
        medications,
        medicines,
        patients,
        doctors,
        authenticated_user,
        authenticated_category,
        favourites_data,
        favourite_medicine_ids,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(close()),
        updateMedicationReminder: (data) => dispatch(updateMedication(data)),
        getMedicationDetails: (id) => dispatch(getMedicationDetails(id)),
        searchMedicine: (data) => dispatch(searchMedicine(data)),
        deleteMedication: (id) => dispatch(deleteMedication(id)),
        getMedications: (id) => dispatch(getMedications(id)),
        getPatientCarePlanDetails: (patientId) =>
            dispatch(getPatientCarePlanDetails(patientId)),
        addNewMedicine: (data) => dispatch(addMedicine(data)),
        markFavourite: (payload) => dispatch(markFavourite(payload)),
        getFavourites: ({type}) => dispatch(getFavourites({type})),
        removeFavourite: ({typeId, type}) =>
            dispatch(removeFavourite({typeId, type})),
        googleTranslate: (textToConvert) =>
            dispatch(googleTranslate(textToConvert)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditMedicationReminder);

import { connect } from "react-redux";
import EditVitals from "../../Components/Drawer/editVital/vitalReminder";
import { DRAWER } from "../../constant";
import { close } from "../../modules/drawer";
import { searchVital } from "../../modules/vital_templates";
import { getVitalOccurence } from "../../modules/vital_occurence";
import { getVitals, updateVital } from "../../modules/vitals";
import { googleTranslate } from "../../modules/cdss";

// import { createReminder, updateReminder } from "../../modules/reminder"; // write to add to database
const mapStateToProps = (state) => {
    const {
        drawer: {visible, loading, data: {type, payload = {}} = {}},
        vital_templates,
        repeat_intervals,
        vitals,
    } = state;

    return {
        visible: visible && type === DRAWER.EDIT_VITALS,
        loading,
        payload,
        vital_templates,
        repeat_intervals,
        vitals,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(close()),
        getVitals: (id) => dispatch(getVitals(id)),
        updateVital: (data) => dispatch(updateVital(data)),
        searchVital: (data) => dispatch(searchVital(data)),
        getVitalOccurence: () => dispatch(getVitalOccurence()),
        googleTranslate: (textToConvert) =>
            dispatch(googleTranslate(textToConvert)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditVitals);

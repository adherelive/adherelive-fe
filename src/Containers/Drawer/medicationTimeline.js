import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import MedicationTimelineDrawer from "../../Components/Drawer/medicationTimeline";

import {close} from "../../modules/drawer";
import {DRAWER} from "../../constant";

const mapStateToProps = (state) => {
    const {
        drawer: {visible, data: {type, payload: {id, loading} = {}} = {}},
        medications = {},
        schedule_events = {},
        medicines = {},
    } = state;

    console.log("In the medicationTimeline.js mapStateToProps - mapStateToProps ---> ",
        id,
        loading,
        medications,
        schedule_events,
        medicines
    );

    return {
        visible: visible && type === DRAWER.MEDICATION_RESPONSE_TIMELINE,
        id,
        loading,
        medications,
        schedule_events,
        medicines,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        close: () => dispatch(close()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicationTimelineDrawer)
);

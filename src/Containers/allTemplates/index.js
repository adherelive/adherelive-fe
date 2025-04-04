import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AllTemplates from "../../Components/AllTemplates/table";
import {
    createCarePlanTemplate,
    duplicateCarePlanTemplate,
    getAllTemplatesForDoctor,
    updateCarePlanTemplate
} from "../../modules/carePlanTemplates";

const mapStateToProps = (state) => {
    const {
        auth: {
            authPermissions = [],
            authenticated_user = 1,
            authenticated_category,
        } = {},
        doctors = {},
        care_plan_templates = {},
        template_appointments = {},
        template_medications = {},
        template_vitals = {},
        template_diets = {},
        template_workouts = {},
        vital_templates = {},
        medicines = {},
        repeat_intervals = {},
        pages: {care_plan_template_ids = []} = {},
    } = state;

    return {
        authenticated_user,
        authenticated_category,
        doctors,
        care_plan_templates,
        template_appointments,
        template_medications,
        template_diets,
        template_workouts,
        template_vitals,
        vital_templates,
        medicines,
        care_plan_template_ids,
        repeat_intervals,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTemplatesForDoctor: () => dispatch(getAllTemplatesForDoctor()),
        createCarePlanTemplate: (payload) =>
            dispatch(createCarePlanTemplate(payload)),
        updateCarePlanTemplate: (id, payload) =>
            dispatch(updateCarePlanTemplate(id, payload)),
        duplicateCarePlanTemplate: (careplan_template_id) =>
            dispatch(duplicateCarePlanTemplate(careplan_template_id)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AllTemplates)
);

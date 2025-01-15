export const createCarePlanTemplateUrl = () => {
    return `/care-plan-templates/`;
};

export const updateCarePlanTemplateUrl = (id) => {
    return `/care-plan-templates/${id}`;
};

export const duplicateCarePlanTemplateUrl = (careplan_template_id) => {
    return `/care-plan-templates/duplicate/${careplan_template_id}`;
};
// AKSHAY NEW CODE IMPLEMENTATIONS
export const getAllTemplatesUrl = () => {
    return `/care-plan-templates/`;
};

export const getAllTemplatesUrlSearch = (text) => {
    return `/care-plan-templates/search?keyword=${text}`;
};

export const deleteCarePlanTemplate = (careplan_template_id) => {
    return `/care-plan-templates/${careplan_template_id}`;
};

export const deleteCarePlanTemplateMedication = (
    careplan_template_id,
    other_id
) => {
    return `/care-plan-templates/${careplan_template_id}?medication=${other_id}`;
};

export const deleteCareplanTemplateAppointment = (
    careplan_template_id,
    other_id
) => {
    return `/care-plan-templates/${careplan_template_id}?appointment=${other_id}`;
};

export const deleteCarePlanTemplateVital = (careplan_template_id, other_id) => {
    return `/care-plan-templates/${careplan_template_id}?vital=${other_id}`;
};

export const deleteCarePlanTemplateDiet = (careplan_template_id, other_id) => {
    return `/care-plan-templates/${careplan_template_id}?diet=${other_id}`;
};

export const deleteCarePlanTemplateWorkout = (
    careplan_template_id,
    other_id
) => {
    return `/care-plan-templates/${careplan_template_id}?workout=${other_id}`;
};

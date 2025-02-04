export const addAppointmentUrl = () => {
    return `/appointments`;
};

export const getAppointmentForParticipantUrl = (id) => {
    return `/appointments/${id}`;
};

export const getAppointmentsDetailsUrl = () => {
    return `/appointments/details`;
};

export const getAppointmentsMissedUrl = () => {
    return `/appointments/missed`;
};

export const updateAppointmentUrl = (id) => {
    return `/appointments/update/${id}`;
};

export const deleteAppointmentUrl = (id) => {
    return `/appointments/${id}/delete`;
};

export const addCarePlanAppointmentUrl = (carePlanId) => {
    return `/appointments/${carePlanId}/appointments`;
};

export const getUploadAppointmentDocumentUrl = (appointment_id) => {
    return `/appointments/${appointment_id}/upload-doc`;
};

export const getDeleteAppointmentDocumentUrl = (document_id) => {
    return `/appointments/${document_id}/delete-doc`;
};

export const getAppointmentForDateUrl = (date) => {
    return `/appointments/date?date=${date}`;
};

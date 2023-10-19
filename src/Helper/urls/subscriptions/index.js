// ADD SERVICE AND SUBSCRIPTION URL

export const getServicesUrl = () => {
  return `/serviceoffering/user`;
};
export const addServicesUrl = () => {
  return `/serviceoffering`;
};

export const getSubscriptionUrl = () => {
  return `/servicesubscription/user`;
};

export const addSubscriptionUrl = () => {
  return `/servicesubscription`;
};

export const updateSubscription = (subscriptionId) => {
  return `/servicesubscription/${subscriptionId}`;
};

// SERVICE AND SUBSCRIPTION URL

export const recommendSubscriptionUrl = () => {
  return `/servicesubscriptionusermapping`;
};

export const recommendServiceUrl = () => {
  return `/serviceusermapping`;
};

export const updateRecommendServiceUrl = (serviceId) => {
  return `/serviceusermapping/${serviceId}`;
};

export const updateRecommendSubscriptionUrl = (subscriptionId) => {
  return `/servicesubscriptionusermapping/${subscriptionId}`;
};

export const getRecommendSeviceUrl = (patientId) => {
  return `/servicesubscriptionusermapping/all/${patientId}`;
};

// PROVIDER SUBSCRIPTION AND SERVICE URL

export const getProviderServicesUrl = (doctorId) => {
  return `/serviceoffering/provider/${doctorId}`;
};

export const getProviderSubscriptionUrl = (doctorId) => {
  return `servicesubscription/provider/${doctorId}`;
};

// TRANSACTION URL

export const getTransactionsUrl = (doctorId) => {
  return `/servicesubtx`;
};

export const activateTransactionUrl = () => {
  return `/servicesubtx/activity`;
};

// ACTIVITIES URL

export const activitiesUrl = (activityStatus, dueDateSort) => {
  if (dueDateSort) {
    return `/txactivities?status=${activityStatus}&sort_duedate=${dueDateSort}`;
  } else {
    return `/txactivities?status=${activityStatus}`;
  }
};

export const updateActivityUrl = (activityId) => {
  return `/txactivities/${activityId}`;
};

export const updateReasonForReassignement = (activityId) => {
  return `/txactivities/reassign/${activityId}`;
};

export const patientCareplansUrl = (patientId) => {
  return `/careplans/patient-care-plan-details/${patientId}`;
};

export const patientCareplansSecondaryDoctorUrl = (patientId) => {
  return `/careplans/patient-care-plan-details-sec/${patientId}`;
};

export const getFlashcardByActivityIdUrl = (activityId) => {
  return `/flashcard/activity/${activityId}`;
};

export const addFlashCardUrl = () => {
  return `/flashcard`;
};

export const updateFlashcardUrl = (flashcardId) => {
  return `/flashcard/${flashcardId}`;
};

export const searchActivites = (query) => {
  return `/patients/namesearch?value=${query}`;
};

// REASSIGNMENT URL

export const getSecondaryDoctorUrl = (careplanId) => {
  return `patients/${careplanId}/careplan-details-sec-doc`;
};

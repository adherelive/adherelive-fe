import { logger } from '../../../config/logger';

export const addDietUrl = () => {
    return `/diet`;
};

export const updateDietUrl = (diet_id) => {
    logger.info(`API Request: ${diet_id}`);
    return `/diet/${diet_id}`;
};

export const updateDietTotalCaloriesUrl = (diet_id, total_calories) => {
    return `/diet/update-calories?id=${diet_id}&total_calories=${total_calories}`;
};

export const getDietsForCareplanUrl = (care_plan_id) => {
    return `/diet?care_plan_id=${care_plan_id}`;
};

export const getDietDetailsByIdUrl = (id) => {
    return `/diet/${id}`;
};

export const getAllDietsForDoctorUrl = () => {
    return `/diet/all-diets`;
};

export const getDietTimelineUrl = (id) => {
    return `/diet/${id}/timeline`;
};

export const getPatientPreferenceDietDetailsUrl = (patient_id) => {
    return `/diet/details/patients/${patient_id}`;
};


/**
 * Example API call with logging
export const api = {
    async fetchData(diet_id) {
        logger.info(`API Request: ${diet_id}`);

        try {
            const response = await fetch(diet_id);
            const data = await response.json();

            logger.debug('API Response', { diet_id, data });
            return data;
        } catch (error) {
            logger.error('API Error', { diet_id, error });
            throw error;
        }
    }
};
 */

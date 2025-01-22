import {formatMedicationTableData, TABLE_COLUMN} from "../helper";

export default (data) => {
    const {
        id,
        openResponseDrawer,
        openEditDrawer,
        formatMessage,
        canViewDetails = false,
        medicinesNames = [],
    } = data;
    const formattedData = formatMedicationTableData(data);
    const {medicationData, medicationTemplateData} = formattedData || {};

    return {
        key: id,
        [TABLE_COLUMN.MEDICINE.dataIndex]: {
            medicationTemplateData,
            medicationData,
            medicinesNames,
        },
        [TABLE_COLUMN.TAKEN.dataIndex]: {
            medicationData,
        },
        [TABLE_COLUMN.INTAKE.dataIndex]: {
            medicationData,
        },
        [TABLE_COLUMN.DURATION.dataIndex]: {
            medicationData,
        },
        [TABLE_COLUMN.TIMELINE.dataIndex]: {
            id,
            openResponseDrawer,
            formatMessage,
            medicationData,
        },
        [TABLE_COLUMN.EDIT.dataIndex]: {
            id,
            openEditDrawer,
            formatMessage,
            canViewDetails,
        },
    };
};

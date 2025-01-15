import {formatTemplateTableData, TABLE_COLUMN} from "../helper";

export default (data) => {
    const {id, duplicateCarePlanTemplate, handleOpenEditDrawer} = data;
    const formattedData = formatTemplateTableData(data);
    const {templateData} = formattedData || {};

    return {
        key: id,
        [TABLE_COLUMN.NAME.dataIndex]: {
            templateData,
        },
        [TABLE_COLUMN.CREATED_AT.dataIndex]: {
            templateData,
        },
        [TABLE_COLUMN.UPDATED_AT.dataIndex]: {
            templateData,
        },
        [TABLE_COLUMN.EDIT.dataIndex]: {
            id,
            duplicateCarePlanTemplate,
            handleOpenEditDrawer,
            templateData,
        },
    };
};

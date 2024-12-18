import { TABLE_COLUMN } from "../helper";

export default (data) => {
  const { id = null, formatMessage } = data;
  // console.log("data in datarow",data);

  return {
    key: id,
    [TABLE_COLUMN.DATE.dataIndex]: {
      data,
    },
    [TABLE_COLUMN.ACTIVITY.dataIndex]: {
      data,
    },
    [TABLE_COLUMN.SERVICE.dataIndex]: {
      data,
    },
    [TABLE_COLUMN.PATIENT.dataIndex]: {
      data,
    },
    [TABLE_COLUMN.STATUS.dataIndex]: {
      data,
    },
    [TABLE_COLUMN.SUBSCRIPTION.dataIndex]: {
      data,
      formatMessage,
    },
    [TABLE_COLUMN.REASSIGNMENT.dataIndex]: {
      data,
      formatMessage,
    },
    // [TABLE_COLUMN.EDIT.dataIndex]: {
    //   data,
    //   formatMessage,
    // },
  };
};

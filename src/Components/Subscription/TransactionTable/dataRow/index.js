import {formatTransactionTableData, TABLE_COLUMN} from "../helper";
import { USER_CATEGORY } from "../../../../constant";

export default (data) => {
    const {id, transactions} = data;

    return {
        key: id,
        [TABLE_COLUMN.ID.dataIndex]: {
            transactions,
        },
        [TABLE_COLUMN.DOCTOR.dataIndex]: {
            transactions,
        },
        [TABLE_COLUMN.PATIENT.dataIndex]: {
            transactions,
        },
        [TABLE_COLUMN.SUBSCRIPTION.dataIndex]: {
            transactions,
        },
        [TABLE_COLUMN.DURATION.dataIndex]: {
            transactions,
        },
        // [TABLE_COLUMN.PAYMENT_PRODUCT.dataIndex]: {},
        [TABLE_COLUMN.AMOUNT.dataIndex]: {
            transactions,
        },
        [TABLE_COLUMN.DATE.dataIndex]: {
            transactions,
        },
        [TABLE_COLUMN.STATUS.dataIndex]: {
            transactions,
        },
        [TABLE_COLUMN.PAYMENT.dataIndex]: {
            transactions,
        },
    };
};

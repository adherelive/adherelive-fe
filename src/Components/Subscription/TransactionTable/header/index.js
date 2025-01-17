import React from "react";

import {getTransactionFilters, TABLE_COLUMN} from "../helper";
import messages from "../messages";
import TransactionId from "../dataColumn/id";
import Doctor from "../dataColumn/doctor";
import Patient from "../dataColumn/patient";
import Subscription from "../dataColumn/subscription";
import Duration from "../dataColumn/duration";
import Payment from "../dataColumn/payment";
import PaymentProduct from "../dataColumn/paymentProduct";
import Amount from "../dataColumn/amount";
import Status from "../dataColumn/status";
import Date from "../dataColumn/date";
import { USER_CATEGORY } from "../../../../constant";

export default (props) => {
    const {formatMessage, authenticated_category} = props || {};

    return [
        {
            title: formatMessage(messages.transaction_id),
            ...TABLE_COLUMN.ID,
            render: (data) => {
                return <TransactionId {...data} />;
            },
        },
        {
            title: formatMessage(messages.doctor_header),
            ...TABLE_COLUMN.DOCTOR,
            render: (data) => {
                return <Doctor {...data} />;
            },
        },
        {
            title: formatMessage(messages.patient_header),
            ...TABLE_COLUMN.PATIENT,
            render: (data) => {
                return <Patient {...data} />;
            },
        },
        {
            title: formatMessage(messages.subscription_header),
            ...TABLE_COLUMN.SUBSCRIPTION,
            render: (data) => {
                return <Subscription {...data} />;
            },
        },
        {
            title: formatMessage(messages.duration_header),
            ...TABLE_COLUMN.DURATION,
            render: (data) => {
                return <Duration {...data} />;
            },
        },
        // {
        //   title: formatMessage(messages.paymentProduct_header),
        //   ...TABLE_COLUMN.PAYMENT_PRODUCT,
        //   render: (data) => {
        //     const { paymentProductData } = data || {};
        //     return <PaymentProduct paymentProductData={paymentProductData} />;
        //   },
        // },
        {
            title: formatMessage(messages.amount_header),
            ...TABLE_COLUMN.AMOUNT,
            render: (data) => {
                return <Amount {...data} />;
            },
        },
        {
            title: formatMessage(messages.status_header),
            ...TABLE_COLUMN.STATUS,
            render: (data) => {
                return <Status {...data} />;
            },

            filters: getTransactionFilters() || [],
            onFilter: (value, record) => {
                const {transactionData: {status} = {}} =
                record[TABLE_COLUMN.STATUS.dataIndex] || {};
                return value === status;
            },
        },
        {
            title: formatMessage(messages.date_header),
            ...TABLE_COLUMN.DATE,
            render: (data) => {
                return <Date {...data} />;
            },
        },
        {
            title: formatMessage(messages.payment_header),
            ...TABLE_COLUMN.PAYMENT,
            render: (data) => {
                return <Payment {...data} />;
            },
        },
    ];
};

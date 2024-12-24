import React from "react";

import {TABLE_COLUMN} from "../helper";
import {ASCEND, DESCEND} from "../../../../constant";
// import messages from "../messages";
import Service from "../datacolumn/service";
import Date from "../datacolumn/date";
import Activity from "../datacolumn/activity";
import Patient from "../datacolumn/patient";
import Subscription from "../datacolumn/subscription";
import ActivityStatus from "../datacolumn/activityStatus";
import Reassignment from "../datacolumn/reassignment";
// import Edit from "../datacolumn/edit";

export default (props) => {
    // const { formatMessage } = props || {};
    const {formatMessage, getColumnSearchProps, sortState} = props || {};
    // console.log("sortState", sortState);

    return [
        {
            // title: formatMessage(messages.pid),
            title: "Due by Date",
            ...TABLE_COLUMN.DATE,
            render: (data) => {
                return <Date {...data} />;
            },
            sorter: () => null,
            sortOrder: sortState === null ? null : sortState === 0 ? ASCEND : DESCEND,
        },
        {
            title: "Activity",
            ...TABLE_COLUMN.ACTIVITY,
            render: (data) => <Activity {...data} />,
        },
        {
            title: "Service",
            ...TABLE_COLUMN.SERVICE,
            render: (data) => <Service {...data} />,
        },
        {
            title: "Patient",
            ...TABLE_COLUMN.PATIENT,
            render: (data) => <Patient {...data} />,
            ...getColumnSearchProps(TABLE_COLUMN.PATIENT.dataIndex),
        },
        {
            title: "Activity Status",
            ...TABLE_COLUMN.STATUS,
            render: (data) => <ActivityStatus {...data} />,
            // ...getColumnSearchProps(TABLE_COLUMN.STATUS.dataIndex),
        },
        {
            title: "Subscription Plan",
            ...TABLE_COLUMN.SUBSCRIPTION,
            render: (data) => <Subscription {...data} />,
        },
        {
            title: "Reassignment",
            ...TABLE_COLUMN.REASSIGNMENT,
            render: (data) => <Reassignment {...data} />,
        },
        // {
        //   title: "Edit/Renew",
        //   ...TABLE_COLUMN.EDIT,
        //   render: (data) => <Edit {...data} />,
        // },
    ];
};

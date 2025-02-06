import React from "react";

export default (props) => {
    const {transactions} = props || {};
    const {doctor: {full_name = "", speciality: {name = ""}} = {}} =
    transactions || {};

    // let fullName = "";
    // if (!isEmpty(transactions) && !isEmpty(transactions.doctor)) {
    //   fullName = transactions.doctor.full_name;
    // }

    return (
        <div className="ellipsis wp100 flex direction-column  ">
            <div className="wp100 fs16 fw600">{full_name}</div>
            <div className="wp100 ">{name}</div>
        </div>
    );
};

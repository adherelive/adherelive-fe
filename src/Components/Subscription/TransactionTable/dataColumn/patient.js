import React from "react";
import {getFullName} from "../../../../Helper/common";
import {getName} from "../../../../Helper/validation";
import Tooltip from "antd/es/tooltip";
import Avatar from "antd/es/avatar";

export default (props) => {
    const {transactions} = props || {};
    const {
        patient: {
            user_name = "",
            first_name = "",
            middle_name = "",
            last_name = "",
            user: {prefix = "", mobile_number = ""},
        } = {},
    } = transactions;

    return (
        <div className="ellipsis wp100 flex direction-column  ">
            <div className="wp100 fs16 fw600">
                {" "}
                {`${getName(first_name)}  ${getName(middle_name)} ${getName(
                    last_name
                )}`}
            </div>
            <div className="wp100 ">{`+${prefix + mobile_number}`}</div>
        </div>
    );
};

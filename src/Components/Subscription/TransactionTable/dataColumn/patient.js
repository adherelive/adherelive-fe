import React from "react";
import { getFullName } from "../../../../Helper/common";
import Tooltip from "antd/es/tooltip";
import Avatar from "antd/es/avatar";

export default (props) => {
  const { transactions } = props || {};
  const { patient: { user_name = "", mobile_number = "", prefix = "" } = {} } =
    transactions;

  return (
    <div className="ellipsis wp100 flex direction-column  ">
      <div className="wp100 fs16 fw600">{user_name}</div>
      <div className="wp100 ">{`+${prefix + mobile_number}`}</div>
    </div>
  );
};

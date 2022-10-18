import React from "react";
import { TABLE_DEFAULT_BLANK_FIELD } from "../../../../constant";
import { getName } from "../../../../Helper/validation";
import { Tooltip, Avatar } from "antd";

export default (props) => {
  const { transactions } = props || {};
  const {
    doctor: { full_name = {} },
  } = transactions;

  return (
    <div className="ellipsis wp100 flex direction-column  ">
      <div className="wp100 fs16 fw600">{full_name}</div>
      <div className="wp100 ">
        {/* {feeType ? `${feeType}` : TABLE_DEFAULT_BLANK_FIELD} */}
        akshay@gmail.com
      </div>
    </div>
  );
};

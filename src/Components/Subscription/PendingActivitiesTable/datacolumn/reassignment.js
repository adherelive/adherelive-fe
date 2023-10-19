import React from "react";
import { CONSULTATION_FEE_TYPE_TEXT } from "../../../../constant";
import { Button } from "antd";

export default (props) => {
  const {
    data: {
      basic_info: { id = null, name = "", type = "", amount = "" } = {},
      reassignmentHandler,
    } = {},
  } = props || {};

  return (
    <div>
      <Button
        type="primary"
        className="ml10 add-button "
        // icon={"plus"}
        style={{ backgroundColor: "#92d04f", border: "none" }}
        size={"small"}
        onClick={() => reassignmentHandler(props.data.activities)}
      >
        <span className="fs16">Reassign Activity</span>
      </Button>
    </div>
  );
};

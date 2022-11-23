import React from "react";
import { CONSULTATION_FEE_TYPE_TEXT } from "../../../../constant";

export default (props) => {
  const { data: { type = "", details = {}, patient_status = {} } = {} } =
    props || {};
  // console.log(props);

  let status = "";
  if (type === "service") {
    status = patient_status;
  } else {
    status = details.patient_status;
  }

  return (
    <div>
      {/* <span> {CONSULTATION_FEE_TYPE_TEXT[type]}</span> */}
      {/* <span> {type}</span> */}
      <span className="tab-color">
        {" "}
        {status === "active" ? (
          <div className="wp100 tab-color">ACTIVE</div>
        ) : status === "completed" ? (
          <div className="wp100 tab-color">COMPLETED</div>
        ) : status === "inprogress" ? (
          <div style={{ color: "gray" }} className="wp100">
            INPROGRESS
          </div>
        ) : (
          <div style={{ color: "gray" }} className="wp100">
            IN-ACTIVE
          </div>
        )}
      </span>
    </div>
  );
};

import React from "react";
import moment from "moment";

export default (props) => {
  // const { data: { activities: { due_date = {} } = {} } = {} } = props || {};

  const { data: { activities: { appointment_time = {} } = {} } = {} } =
    props || {};

  return (
    <div>
      {/* <span> {name}</span> */}
      <span className="tab-color">
        {" "}
        {moment(appointment_time).format("Do MMM YYYY")}{" "}
      </span>
    </div>
  );
};

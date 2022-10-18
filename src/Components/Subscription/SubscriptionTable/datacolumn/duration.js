import React from "react";
import moment from "moment";

export default (props) => {
  const {
    data: {
      type = "",
      durations = "",
      service_date = "",
      serviceDetails = {},
      details = {},
      expire_date = "",
    } = {},
  } = props || {};

  return (
    <div>
      {/* <span>{`Rs ${amount}`}</span> */}
      <span>
        {type === "service" ? "Once-off" : `${details.durations} months`}{" "}
        <br></br>{" "}
        {type !== "service" &&
          moment(
            type === "service" ? service_date : details.service_date
          ).format("DD-MMM-YY")}{" "}
        {type !== "service" && "-"}
        {type !== "service" &&
          moment(type === "service" ? expire_date : details.expire_date).format(
            "DD-MMM-YY"
          )}
      </span>
    </div>
  );
};

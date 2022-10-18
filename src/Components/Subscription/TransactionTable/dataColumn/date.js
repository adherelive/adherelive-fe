import React from "react";
import moment from "moment";
import isEmpty from "../../../../Helper/is-empty";

export default (props) => {
  const { transactions } = props || {};
  const { subplan = {}, services = {} } = transactions || {};
  let type = {};

  if (isEmpty(services)) {
    type = "subscription";
  } else {
    type = "service";
  }

  return (
    <div className="fs16 fw700 tab-color">
      {/* {moment(updated_at).format("Do MMM, hh:mm A")} */}
      {moment(
        type === "service" ? services[0].createdAt : subplan[0].createdAt
      ).format("DD-MMM-YY")}{" "}
    </div>
  );
};

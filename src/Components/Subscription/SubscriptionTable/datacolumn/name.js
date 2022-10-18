import React from "react";

export default (props) => {
  const {
    data: {
      serviceDetails: { service_offering_name = "" } = {},
      type = "",
      notes = "",
    } = {},
  } = props || {};

  return (
    <div>
      {/* <span> {name}</span> */}
      <div className="flex direction-column">
        <span>{type === "service" ? service_offering_name : notes} </span>
        <span className="flex justify-space-between ellipsis tab-color">
          ({type === "service" ? "ad-hoc" : "plan"})
        </span>
      </div>
    </div>
  );
};

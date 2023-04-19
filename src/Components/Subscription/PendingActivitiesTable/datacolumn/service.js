import React from "react";

export default (props) => {
  const { data: { activities: { details = {} } = {} } = {} } = props || {};

  return (
    <div>
      {/* <span>{`Rs ${amount}`}</span> */}
      <span>{details.service_offering_name}</span>
    </div>
  );
};

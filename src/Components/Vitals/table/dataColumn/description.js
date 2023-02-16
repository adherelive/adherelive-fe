import React from "react";
import isEmpty from "../../../../Helper/is-empty";

export default (props) => {
  const { vitalData } = props || {};
  // const { description = "" } = vitalData || {};

  console.log("vitalData", vitalData);

  let description = "";
  if (!isEmpty(vitalData) && !isEmpty(vitalData.details)) {
    description = vitalData.details.description;
  }

  return <div>{description ? description : "--"}</div>;
};

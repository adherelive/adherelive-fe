import React from "react";
import moment from "moment";

export default (props) => {
  const { templateData: { updated_at = "" } = {} } = props || {};

  return (
    <div className="fs18 fw600">
      {updated_at ? moment(updated_at).format("MMM Do YY") : "--"}
    </div>
  );
};

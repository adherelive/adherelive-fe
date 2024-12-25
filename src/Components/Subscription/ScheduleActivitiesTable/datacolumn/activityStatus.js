import React from "react";
import {CONSULTATION_FEE_TYPE_TEXT} from "../../../../constant";

export default (props) => {
    const {
        data: {
            activities: {patient = {}, details = {}, activity_status = ""} = {},
        } = {},
    } = props || {};

    return (
        <div>
      <span>
        {" "}
          {activity_status === "notstarted"
              ? "Not started"
              : activity_status === "inprogress"
                  ? "In Progress"
                  : "Completed"}{" "}
      </span>
        </div>
    );
};

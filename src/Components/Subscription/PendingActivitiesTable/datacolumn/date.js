import React from "react";
import moment from "moment";

export default (props) => {
    const {data: {activities: {due_date = {}} = {}} = {}} = props || {};

    return (
        <div>
            {/* <span> {name}</span> */}
            <span className="tab-color">
        {" "}
                {moment(due_date).format("Do MMM YYYY")}{" "}
      </span>
        </div>
    );
};

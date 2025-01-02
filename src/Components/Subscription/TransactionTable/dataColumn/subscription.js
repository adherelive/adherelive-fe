import React from "react";
import isEmpty from "../../../../Helper/is-empty";

export default (props) => {
    const {transactions} = props || {};
    const {subplan = {}, services = {}} = transactions || {};

    // const feeType = CONSULTATION_FEE_TYPE_TEXT[type];

    let type = {};

    if (isEmpty(services)) {
        type = "subscription";
    } else {
        type = "service";
    }

    return (
        <div className="ellipsis wp100 flex direction-column  ">
            <div className="wp100 fs16 fw600">
                {/* {name ? `${name}` : TABLE_DEFAULT_BLANK_FIELD} */}
                {type === "subscription"
                    ? subplan[0].details.notes
                    : services[0].details.service_offering_name}
            </div>
            <div className="wp100 tab-color">
                {/* {feeType ? `${feeType}` : TABLE_DEFAULT_BLANK_FIELD} */}
                {type === "subscription" ? "plan" : "ad-hoc"}
            </div>
        </div>
    );
};

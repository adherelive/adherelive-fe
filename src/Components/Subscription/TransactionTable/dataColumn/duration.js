import React from "react";
import moment from "moment";
import isEmpty from "../../../../Helper/is-empty";

export default (props) => {
    const {transactions} = props || {};
    const {subplan = {}, services = {}} = transactions || {};
    let type = {};

    if (isEmpty(services)) {
        type = "subscription";
    } else {
        type = "service";
    }
    return (
        <div className="ellipsis wp100 flex direction-column  ">
            <div className="wp100 fs16 fw600">
                {type === "service" ? "Once-off" : `${subplan[0].durations} months`}
            </div>
            <div className="wp100 ">
                {type !== "service" &&
                    moment(
                        type === "service"
                            ? services[0].service_date
                            : subplan[0].service_date
                    ).format("DD-MMM-YY")}{" "}
                {type !== "service" && "-"}
                {type !== "service" &&
                    moment(
                        type === "service"
                            ? services[0].expire_date
                            : subplan[0].expire_date
                    ).format("DD-MMM-YY")}
            </div>
        </div>
    );
};

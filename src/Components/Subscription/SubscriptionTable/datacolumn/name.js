import React from "react";
import isEmpty from "../../../../Helper/is-empty";

export default (props) => {
    const {
        data: {
            serviceDetails: {service_offering_name = ""} = {},
            type = "",
            // notes = "",
            subscriptions = "",
        } = {},
    } = props || {};

    return (
        <div>
            {/* <span> {name}</span> */}
            <div className="flex direction-column">
        <span>
          {type === "service"
              ? service_offering_name
              : !isEmpty(subscriptions) && subscriptions.notes}{" "}
        </span>
                <span className="flex justify-space-between ellipsis tab-color">
          ({type === "service" ? "ad-hoc" : "plan"})
        </span>
            </div>
        </div>
    );
};

import React from "react";

export default (props) => {
    const {
        data: {activities: {serviceSubscriptionDetails = {}} = {}} = {},
    } = props || {};

    return (
        <div>
            {/* <span>{`Rs ${amount}`}</span> */}
            <span>
        {serviceSubscriptionDetails !== null &&
            serviceSubscriptionDetails.notes}
      </span>
        </div>
    );
};

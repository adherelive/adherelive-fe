import React from "react";

export default (props) => {
    const {data: {type = "", service_charge = "", details = {}} = {}} =
    props || {};

    return (
        <div>
            {/* <span>{`Rs ${amount}`}</span> */}
            <span>
        {`Rs ${type === "service" ? service_charge : details.service_charge}
        /month`}
      </span>
        </div>
    );
};

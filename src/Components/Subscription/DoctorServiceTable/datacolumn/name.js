import React from "react";

export default (props) => {
    const {
        data: {
            basic_info: {id = null, name = "", type = "", amount = ""} = {},
            services: {service_offering_name = ""},
        } = {},
    } = props || {};

    return (
        <div>
            <span> {service_offering_name}</span>
        </div>
    );
};

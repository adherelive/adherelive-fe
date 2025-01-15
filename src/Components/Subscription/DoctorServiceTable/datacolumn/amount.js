import React from "react";

export default (props) => {
    const {
        data: {
            basic_info: {id = null, name = "", type = "", amount = ""} = {},
            services: {service_charge = "", currency = ""},
        } = {},
        services,
    } = props || {};

    // console.log("this.props", props);

    return (
        <div>
            <span>{`${currency} ${service_charge}`}</span>
        </div>
    );
};

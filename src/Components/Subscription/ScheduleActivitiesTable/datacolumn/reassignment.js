import React from "react";
import {Button} from "antd";

export default (props) => {
    const {
        data: {
            basic_info: {id = null, name = "", type = "", amount = ""} = {},
            activities: {
                patient = {},
                details = {},
                activity_status = "",
                is_reassigned = 0,
            } = {},
            reassignmentHandler,
            reasonHandler,
        } = {},
    } = props || {};

    return (
        <div class="flex">
            <Button
                type="primary"
                className="ml10 add-button "
                // icon={"plus"}
                style={{backgroundColor: "#92d04f", border: "none"}}
                size={"small"}
                onClick={() => reassignmentHandler(props.data.activities)}
            >
                <span className="fs16">Reassign Activity</span>
            </Button>
            {is_reassigned !== 0 && (
                <Button
                    type="primary"
                    className="ml10 add-button "
                    // icon={"plus"}
                    style={{backgroundColor: "#92d04f", border: "none"}}
                    size={"small"}
                    onClick={() => reasonHandler(props.data.activities)}
                >
                    <span className="fs16"> Reason </span>
                </Button>
            )}
        </div>
    );
};

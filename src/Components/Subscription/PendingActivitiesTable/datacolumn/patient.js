import React from "react";
import {Button} from "antd";

import {
  SET_FLASHCARD_OPEN,
  SET_ACTIVITY_DATA_FOR_SCHEDULE,
} from "../../../../reducer/index";
import isEmpty from "../../../../Helper/is-empty";
export default (props) => {
    const {
        data: {
            activities: {
                patient: {
                    _data: {full_name = ""},
                },
                details = {},
            } = {},
        } = {},
    } = props || {};

    const {
        data: {
            basic_info: {id = null, name = "", type = "", amount = ""} = {},
            history,
            scheduleHanlder,
            startHandler,
            onPatientNameClick,
        } = {},
    } = props || {};

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {/* <span>{`Rs ${amount}`}</span> */}
            <span onClick={() => onPatientNameClick(props.data.activities)}>
        {full_name}
      </span>

            {details.service_offering_name !== "Remote monitoring" && (
                <Button
                    type="primary"
                    className="ml10 add-button "
                    // icon={"plus"}
                    style={{backgroundColor: "#92d04f", border: "none"}}
                    size={"small"}
                    onClick={() => scheduleHanlder(props.data.activities)}
                >
                    <span className="fs16">Schedule</span>
                </Button>
            )}

            <Button
                type="primary"
                className="ml10 add-button "
                // icon={"plus"}
                style={{backgroundColor: "#92d04f", border: "none"}}
                size={"small"}
                onClick={() => startHandler(props.data.activities)}
            >
                <span className="fs16">Start now</span>
            </Button>
        </div>
    );
};

import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import {
  SET_FLASHCARD_OPEN,
  SET_ACTIVITY_DATA_FOR_SCHEDULE,
} from "../../../../reducer/index";

export default (props) => {
  const dispatch = useDispatch();
  const {
    data: {
      activities: {
        patient: {
          _data: { full_name = "" },
        },
        details = {},
      } = {},
    } = {},
  } = props || {};

  const {
    data: {
      basic_info: { id = null, name = "", type = "", amount = "" } = {},
      history,
      onPatientNameClick,
    } = {},
  } = props || {};

  let status = props.data.activities.activity_status;

  const startHandler = (e) => {
    // localStorage.setItem("flashcardOpen", true);

    let finalActivityData = props.data.activities;
    finalActivityData.fromButton = "start";

    dispatch({
      type: SET_ACTIVITY_DATA_FOR_SCHEDULE,
      payload: finalActivityData,
    });
    dispatch({
      type: SET_FLASHCARD_OPEN,
      payload: true,
    });
    history.push(`patients/${finalActivityData.patient_id}`);
  };

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
      {status !== "completed" && (
        <Button
          type="primary"
          className="ml10 add-button p10"
          // icon={"plus"}
          style={{ backgroundColor: "#92d04f", border: "none" }}
          size={"small"}
          onClick={startHandler}
        >
          <span className="fs16">Start</span>
        </Button>
      )}
    </div>
  );
};

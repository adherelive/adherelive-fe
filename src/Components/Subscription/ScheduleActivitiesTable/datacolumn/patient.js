import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import {
  SET_FLASHCARD_OPEN,
  SET_ACTIVITY_DATA_FOR_SCHEDULE,
} from "../../../../reducer/index";

export default (props) => {
  const dispatch = useDispatch();
  const { data: { activities: { patient = {}, details = {} } = {} } = {} } =
    props || {};

  const {
    data: {
      basic_info: { id = null, name = "", type = "", amount = "" } = {},
      history,
      onPatientNameClick,
    } = {},
  } = props || {};

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
    <div>
      {/* <span>{`Rs ${amount}`}</span> */}
      <span>
        <span onClick={() => onPatientNameClick()}>{patient.user_name}</span>
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
      </span>
    </div>
  );
};

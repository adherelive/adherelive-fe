import React from "react";
import moment from "moment";
import { CONSULTATION_FEE_TYPE_TEXT } from "../../../../constant";
import Tooltip from "antd/es/tooltip";
import { EditOutlined } from "@ant-design/icons";

export default (props) => {
  const { data: { activities: { appointment_time = {} } = {} } = {} } =
    props || {};

  const {
    data: {
      basic_info: { id = null, name = "", type = "", amount = "" } = {},
      history,
      handleEdit,
    } = {},
  } = props || {};

  // const handleEdit = (id) => {
  //   alert("asd");
  // };

  return (
    <div>
      {/* <span> {CONSULTATION_FEE_TYPE_TEXT[type]}</span> */}
      {/* <span> {type}</span> */}
      <span>
        {" "}
        Appointment <br></br> On {moment(appointment_time).format("Do MMM")} -{" "}
        {moment(appointment_time).format("H:MM A")}
        <Tooltip placement={"bottom"} title={"Edit Appointment"}>
          <EditOutlined
            className={"pointer align-self-end ml10"}
            onClick={() => handleEdit(props.data.activities)}
            style={{ fontSize: "18px", color: "#6d7278" }}
          />
        </Tooltip>
      </span>
    </div>
  );
};

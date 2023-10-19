import React, { Component, Fragment, useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import {
  Drawer,
  Icon,
  Select,
  Input,
  // message,
  Button,
  Spin,
  Radio,
  DatePicker,
} from "antd";
// import { CONSULTATION_FEE_TYPE_TEXT } from "../../../constant";

import moment from "moment";
import throttle from "lodash-es/throttle";

// import messages from "./message";
import Footer from "../../../Drawer/footer";
import { PoweroffOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import {
  getPatientCareplanByPatientIdAndUserRoleId,
  getPatientSecondaryDoctorByCareplanId,
  updateActivityById,
  updateReasonForReassignment,
} from "./../../../../modules/subscription/activities";
import message from "antd/es/message";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function Reassignment({ onCloseDrawer, visible, activityData }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    careplan: "",
    doctor: "",
    reason: "",
  });
  const [careplanList, setCareplanList] = useState([]);
  const [doctorlist, setDoctorList] = useState([]);

  useEffect(() => {
    getCarePlanForPatient();
  }, []);

  // AKSHAY NEW CODE IMPLEMENTATION FOR REASIGNMENT
  const getCarePlanForPatient = async () => {
    try {
      const getCarePlanResponse = await dispatch(
        getPatientCareplanByPatientIdAndUserRoleId(activityData.patient_id)
      );
      const {
        status,
        statusCode,
        payload: { data = {}, message: resp_msg = "" } = {},
      } = getCarePlanResponse || {};
      if (!status) {
        message.error(resp_msg);
      } else if (status) {
        setCareplanList(data.care_plans);
      }
    } catch (error) {
      console.log("Patient Careplans Get errrrorrrr ===>", error);
    }
  };

  // const formatMessage = (data) => this.props.intl.formatMessage(data);

  const onClose = () => {};

  const setCareplan = async (value) => {
    const response = await dispatch(
      getPatientSecondaryDoctorByCareplanId(value)
    );

    const {
      data: { care_plans = {} },
    } = response.payload;

    console.log("response", care_plans);

    let doctors = {};
    for (let carePlan of Object.keys(care_plans)) {
      console.log("are_plans[carePlan]", care_plans[carePlan]);
      doctors = care_plans[carePlan].doctors;
    }

    setValues({
      ...values,
      careplan: value,
    });
    setDoctorList(doctors);
  };

  const setDoctor = (value) => {
    setValues({
      ...values,
      doctor: value,
    });
  };

  const onChangeHandler = (e) => {
    setValues({
      ...values,
      reason: e.target.value,
    });
  };

  const getCareplanOption = () => {
    let options = [];

    for (let carePlan of Object.keys(careplanList)) {
      let {
        details: { diagnosis: { description = "" } } = {},
        basic_info: { id = "" } = {},
      } = careplanList[carePlan];
      options.push(
        <Option key={id} value={id}>
          {description}
        </Option>
      );
    }
    return options;
  };

  const getDoctorOption = () => {
    let options = [];
    for (let doctor of Object.keys(doctorlist)) {
      let { id = "", full_name = "" } = doctorlist[doctor];
      options.push(
        <Option key={id} value={id}>
          {full_name}
        </Option>
      );
    }

    return options;
  };

  const renderReassignment = () => {
    return (
      <div className="form-block-ap">
        <div
          className="form-headings
                //    flex align-center justify-start
                   tac"
        >
          <span className="fwbolder fs18 ">
            {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
            Select Careplan
          </span>
        </div>

        <Select
          className="form-inputs-ap drawer-select"
          placeholder="Select Consultation Type"
          value={values.careplan}
          onChange={setCareplan}
          autoComplete="off"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {getCareplanOption()}
        </Select>

        <div
          className="form-headings
                //    flex align-center justify-start
                   tac"
        >
          <span className="fwbolder fs18 ">
            {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
            Select Doctor
          </span>
        </div>

        <Select
          className="form-inputs-ap drawer-select"
          placeholder="Select Consultation Type"
          value={values.doctor}
          onChange={setDoctor}
          autoComplete="off"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {getDoctorOption()}
        </Select>

        <div
          className="form-headings
                //    flex align-center justify-start
                   tac"
        >
          <span className="fwbolder fs18 ">
            {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
            Reason for Reassignment
          </span>
        </div>

        <TextArea
          autoFocus
          className="mt4"
          maxLength={1000}
          //   placeholder={formatMessage(messages.description_text_placeholder)}
          placeholder={"Not availbale for somedays due to holidays"}
          rows={4}
          name="planDescription"
          value={values.reason}
          onChange={onChangeHandler}
        />
      </div>
    );
  };

  const onSubmit = async () => {
    const formData = {
      doctor_id: values.doctor,
      // appointment_id: appointment_id,
      // appointment_time: newEventStartTime,
      // status: "scheduled",
      // provider_id: newProvider_id,
      status: "pending",
    };

    const updateData = {
      assignedBy: 1,
      assignedTo: 2,
      reason: values.reason,
      doctor_id: 2,
      status: "pending",
    };

    // let updateResponse = await dispatch(
    //   updateActivityById(activityData.id, formData)
    // );

    let reasonUpdate = await dispatch(
      updateReasonForReassignment(activityData.id, updateData)
    );

    if (reasonUpdate) {
      // console.log(updateResponse, reasonUpdate);
      onCloseDrawer();
    }
  };

  const { consultation, submitting } = values;

  return (
    <Fragment>
      <Drawer
        title={"Reassignment Activity"}
        placement="right"
        maskClosable={false}
        headerStyle={{
          position: "sticky",
          zIndex: "9999",
          top: "0px",
        }}
        destroyOnClose={true}
        onClose={onCloseDrawer}
        visible={visible} // todo: change as per state, -- WIP --
        width={400}
      >
        {renderReassignment()}
        <div className="add-patient-footer">
          <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
            {/* {this.formatMessage(messages.cancel)} */}
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            type="primary"
            // icon={submitting ? <PoweroffOutlined /> : null}
            loading={submitting}
          >
            {/* {this.formatMessage(messages.submit)} */}
            Submit
          </Button>
        </div>
      </Drawer>
    </Fragment>
  );
}

export default Reassignment;

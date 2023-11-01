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

import { useDispatch, useSelector } from "react-redux";
import {
  getPatientCareplanByPatientIdAndUserRoleId,
  getPatientSecondaryDoctorByCareplanId,
  updateActivityById,
  updateReasonForReassignment,
  getReassignmentAudit,
} from "./../../../../modules/subscription/activities";
import message from "antd/es/message";
import TextArea from "antd/es/input/TextArea";
import isEmpty from "../../../../Helper/is-empty";

const { Option } = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function Reason({ onCloseDrawer, visible, activityData, status }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    careplan: "",
    doctor: "",
    reason: "",
  });
  const [auditData, setAuditData] = useState([]);

  //   const authenticated_user = useSelector(
  //     (state) => state.auth.authenticated_user
  //   );

  //   const doctors = useSelector((state) => state.doctors);

  //   useEffect(() => {
  //     let id = "";
  //     if (!isEmpty(doctors) && !isEmpty(authenticated_user)) {
  //       for (let each in doctors) {
  //         if (doctors[each].basic_info.user_id == authenticated_user) {
  //           id = doctors[each].basic_info.id;
  //         }
  //       }
  //     }
  //     setDoctorId(id);
  //   }, [doctors, authenticated_user]);

  useEffect(() => {
    getAuditForReassignment();
  }, []);

  // AKSHAY NEW CODE IMPLEMENTATION FOR REASIGNMENT
  const getAuditForReassignment = async () => {
    try {
      const getCarePlanResponse = await dispatch(
        getReassignmentAudit(activityData.id)
      );
      const {
        status,
        statusCode,
        payload: { data = {}, message: resp_msg = "" } = {},
      } = getCarePlanResponse || {};
      if (!status) {
        message.error(resp_msg);
      } else if (status) {
        console.log("data", data);
        setAuditData(data);
      }
    } catch (error) {
      console.log("Patient Careplans Get errrrorrrr ===>", error);
    }
  };

  // const formatMessage = (data) => this.props.intl.formatMessage(data);

  const onClose = () => {};

  const renderReasonDrawer = () => {
    // const newData = {
    //   0: {
    //     reason: "reason ",
    //     assignedByDoctor: {
    //       full_name: "Sparch Jaiswal",
    //       id: 1,
    //       user_id: 1,
    //       city: "New Delhi",
    //       speciality_id: 1,
    //       gender: "m",
    //       profile_pic: null,
    //       first_name: "Sparch",
    //       middle_name: null,
    //       last_name: "Jaiswal",
    //       activated_on: null,
    //       signature_pic: null,
    //       createdAt: "2023-10-19T10:04:57.000Z",
    //       updatedAt: "2023-10-19T10:04:57.000Z",
    //       deletedAt: null,
    //       speciality: {
    //         id: 1,
    //         name: "Anaesthesia",
    //         description: null,
    //         user_created: null,
    //         createdAt: "2023-10-19T10:04:54.000Z",
    //         updatedAt: "2023-10-19T10:04:54.000Z",
    //         deletedAt: null,
    //       },
    //     },
    //     assignedToDoctor: {
    //       full_name: "Vivek Asthana",
    //       id: 2,
    //       user_id: 3,
    //       city: "Meerut",
    //       speciality_id: 2,
    //       gender: "m",
    //       profile_pic: null,
    //       first_name: "Vivek",
    //       middle_name: null,
    //       last_name: "Asthana",
    //       activated_on: null,
    //       signature_pic: null,
    //       createdAt: "2023-10-19T10:04:57.000Z",
    //       updatedAt: "2023-10-19T10:04:57.000Z",
    //       deletedAt: null,
    //       speciality: {
    //         id: 2,
    //         name: "Anatomy:",
    //         description: null,
    //         user_created: null,
    //         createdAt: "2023-10-19T10:04:54.000Z",
    //         updatedAt: "2023-10-19T10:04:54.000Z",
    //         deletedAt: null,
    //       },
    //     },
    //   },
    // };

    let array = [];

    for (let audit of Object.values(auditData)) {
      array.push(audit);
    }

    return (
      <div className="form-block-ap">
        {!isEmpty(array) &&
          array.map((data, index) => {
            return (
              <div key={index} className="wp100">
                <div
                  className="p18 mb10"
                  style={{ border: "1px solid lightgrey", height: "250px" }}
                >
                  {" "}
                  <h3 style={{ fontWeight: "bold" }}>Reassignment Audit</h3>
                  <div className="flex">
                    <h3 className="fwbolder fs12">Assigned By Doctor :</h3>
                    <p className="m0">{data.assignedByDoctor.full_name}</p>
                  </div>
                  <div className="flex">
                    <h3 className="fwbolder fs12">Assigned To Doctor :</h3>
                    <p className="m0">{data.assignedToDoctor.full_name}</p>
                  </div>
                  <div className="flex">
                    <h3 className="fwbolder fs12">Reason :</h3>
                    <p className="m0">{data.reason}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const onSubmit = async () => {};

  const { consultation, submitting } = values;

  return (
    <Fragment>
      <Drawer
        title={"Reassignment Audit"}
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
        {renderReasonDrawer()}
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

export default Reason;

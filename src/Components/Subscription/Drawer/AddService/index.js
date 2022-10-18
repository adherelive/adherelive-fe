import React, { Component, Fragment, useState } from "react";
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
import { addServices } from "./../../../../modules/subscription/services/index";
import message from "antd/es/message";

const { Option } = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function AddService({ onCloseDrawer, visible, doctor_id }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    consultation: "",
    serviceType: "Digital",
    serviceFees: "",
    submitting: false,
    currency: "INR",
    razorpayLink: "",
  });

  const callBack = () => {
    setValues({
      ...values,
      consultation: "",
      serviceType: "Digital",
      serviceFees: "",
      submitting: false,
      currency: "INR",
    });
    onCloseDrawer();
    message.success("Service added sucessfully");
  };

  const onSubmit = () => {
    const { consultation, serviceType, serviceFees, currency } = values;
    setValues({
      ...values,
      submitting: true,
    });
    let formData = {
      // provider_type: "doctor",
      // provider_id: 2,
      service_offering_name: consultation,
      description: serviceType,
      is_active: true,
      service_charge: serviceFees,
      currency: currency,
    };
    if (doctor_id) {
      formData.doctor_id = doctor_id;
    }
    dispatch(addServices(formData, callBack));
  };

  // const formatMessage = (data) => this.props.intl.formatMessage(data);

  const onClose = () => {};

  const setConsultation = (value) => {
    setValues({
      ...values,
      consultation: value,
      serviceType:
        value === "Virtual consultation" || value === "Remote monitoring"
          ? "Digital"
          : "Physical",
    });
  };

  const setCurrency = (value) => {
    setValues({
      ...values,
      currency: value,
    });
  };

  const setRazorpayLink = (e) => {
    setValues({
      ...values,
      razorpayLink: e.target.value,
    });
  };

  const onCurrencySearch = (value) => {
    console.log(value);
  };

  const setServiceFee = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      setValues({ ...values, serviceFees: e.target.value });
    }
  };

  const getConsultationOption = () => {
    let serviceOfferingOptions = [
      { name: "Virtual consultation", id: 1 },
      { name: "Remote monitoring", id: 2 },
      { name: "At clinic physical consultation", id: 3 },
      { name: "At home physical consultation", id: 4 },
    ];
    let options = [];
    serviceOfferingOptions.forEach((service) => {
      options.push(
        <Option key={service.id} value={service.name}>
          {service.name}
        </Option>
      );
    });

    return options;
  };

  const getCurrencyOption = () => {
    let currencyOptions = [
      { name: "INR", id: 1 },
      // { name: "EUR", id: 2 },
      // { name: "USD", id: 3 },
    ];
    let options = [];
    currencyOptions.forEach((currency) => {
      options.push(
        <Option key={currency.id} value={currency.name}>
          {currency.name}
        </Option>
      );
    });

    return options;
  };

  const renderAddNewConsultationFee = () => {
    const {
      consultation = "",
      serviceType = "",
      serviceFees = "",
      currency,
    } = values;

    return (
      <div className="form-block-ap">
        <div
          className="form-headings
                //    flex align-center justify-start
                   tac"
        >
          <span className="fwbolder fs18 ">
            {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
            Service offering options
          </span>
        </div>

        <Select
          className="form-inputs-ap drawer-select"
          placeholder="Select Consultation Type"
          value={consultation}
          onChange={setConsultation}
          autoComplete="off"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {getConsultationOption()}
        </Select>

        <div>
          {consultation !== "" ? (
            <div>
              <div className="form-headings flex align-center justify-start">
                {/* {this.formatMessage(messages.consultationFeeType)} */}
                <span>Service Type</span>
                {/* <div className="star-red">*</div> */}
              </div>

              <Input
                className={"form-inputs-ap"}
                value={serviceType}
                // onChange={this.setConsultationName}
                disabled
              />

              <div className="form-headings flex align-center justify-start">
                {/* {this.formatMessage(messages.consultationFee)} */}
                <span>Service Fees</span>
                <div className="star-red">*</div>
              </div>

              <Input
                className={"form-inputs-ap"}
                value={serviceFees}
                onChange={setServiceFee}
                // disabled={provider_id}
              />

              <div className="form-headings flex align-center justify-start">
                {/* {this.formatMessage(messages.consultationFee)} */}
                <span>Currency</span>
                <div className="star-red">*</div>
              </div>

              <Select
                className="form-inputs-ap drawer-select"
                placeholder="Select Currency"
                showSearch
                onSearch={onCurrencySearch}
                value={currency}
                onChange={setCurrency}
                autoComplete="off"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {getCurrencyOption()}
              </Select>
              <div className="form-headings flex align-center justify-start">
                {/* {this.formatMessage(messages.consultationFee)} */}
                <span>Razorpay Link</span>
                <div className="star-red">*</div>
              </div>

              <Input
                className={"form-inputs-ap"}
                value={values.razorpayLink}
                onChange={setRazorpayLink}
                // disabled={}
                type="string"
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const { consultation, submitting } = values;

  return (
    <Fragment>
      <Drawer
        title={"Add New Service Offering"}
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
        {renderAddNewConsultationFee()}
        {consultation !== "" ? (
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
        ) : null}
      </Drawer>
    </Fragment>
  );
}

export default AddService;

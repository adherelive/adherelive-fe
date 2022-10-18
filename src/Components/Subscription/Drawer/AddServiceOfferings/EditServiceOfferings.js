import React, { useState, useEffect, Fragment } from "react";
import { injectIntl } from "react-intl";
import {
  Drawer,
  Icon,
  Select,
  Input,
  message,
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
import Form from "antd/es/form";
import InputNumber from "antd/es/input-number";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "../../../../Helper/is-empty";

const { Option } = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Item: FormItem } = Form;

function EditServiceOfferings({
  visible,
  onCloseDrawer,
  editServiceOfferingData,
  serviceOfferingsArray,
  setServiceOfferingArray,
  editOfferingIndex,
}) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    serviceOffering: "",
    serviceFees: "",
    submitting: false,
    noOfTimesMonthly: 1,
    selectedServiceOffering: {},
    editOfferingIndex: "",
  });

  useEffect(() => {
    // console.log("editOfferingIndex", editOfferingIndex);
    setValues({
      serviceOffering: editServiceOfferingData.service_offering_name,
      serviceFees: editServiceOfferingData.service_charge,
      noOfTimesMonthly: editServiceOfferingData.noOfTimesMonthly,
      selectedServiceOffering: editServiceOfferingData,
      editOfferingIndex: editOfferingIndex,
    });
  }, [editServiceOfferingData]);

  const services = useSelector((state) => state.subscription.services);

  const onSubmit = () => {
    let finalMapping = [...serviceOfferingsArray];
    let newData = values.selectedServiceOffering;
    newData.noOfTimesMonthly = values.noOfTimesMonthly;
    newData.service_charge = values.serviceFees;
    newData.service_offering_name = values.serviceOffering;

    if (values.editOfferingIndex !== -1) {
      finalMapping[values.editOfferingIndex] = newData;
    }

    console.log("finalMapping", finalMapping);
    console.log("newData", newData);
    console.log("indexOfOffering", values.editOfferingIndex);

    // finalMapping.push(values.selectedServiceOffering);
    setServiceOfferingArray(finalMapping);
    onCloseDrawer();
    setValues({
      ...values,
      serviceOffering: "",
      serviceFees: "",
      submitting: false,
      noOfTimesMonthly: 1,
    });
  };

  const setServiceOffering = (value, keyData) => {
    let selectedService = {};
    for (const key in services) {
      if (services[key].id == keyData.key) {
        selectedService = services[key];
      }
    }

    setValues({
      ...values,
      serviceOffering: value,
      serviceFees: selectedService.service_charge,
      selectedServiceOffering: selectedService,
    });
  };

  const onRadioChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setValues({
      ...values,
      noOfTimesMonthly: values.noOfTimesMonthly + parseInt(e.target.value),
    });
  };

  // formatMessage = (data) => this.props.intl.formatMessage(data);

  const onClose = () => {};

  const getServiceOfferingOption = () => {
    let options = [];

    for (const key in services) {
      options.push(
        <Option
          key={services[key].id}
          value={services[key].service_offering_name}
        >
          {services[key].service_offering_name}
        </Option>
      );
    }

    return options;
  };

  const renderAddServiceOfferings = () => {
    const {
      serviceOffering = "",
      serviceFees = "",
      noOfTimesMonthly = "",
    } = values;

    return (
      <div className="form-block-ap">
        <Form className="fw700 wp100 Form">
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
            value={serviceOffering}
            onChange={setServiceOffering}
            autoComplete="off"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {getServiceOfferingOption()}
          </Select>

          <div className="flex align-items-end justify-content-space-between">
            <div className="flex direction-row flex-grow-1">
              <label htmlFor="quantity" className="form-label" title="Quantity">
                {/* {formatMessage(messages.quantity)} */}
                No of times monthly
              </label>

              <div className="star-red">*</div>
            </div>
            {/* <div className="label-color fontsize12 mb8">
            
            </div> */}
            <div className="flex-grow-0">
              <RadioGroup size="small" className="flex justify-content-end">
                <RadioButton value={1.0} onClick={onRadioChange}>
                  +1.0
                </RadioButton>
              </RadioGroup>
            </div>
          </div>
          <FormItem
            className="flex-1 align-self-end"
            // validateStatus={error ? "error" : ""}
            // help={error ? error[0] : ""}
          >
            <InputNumber
              min={1}
              style={{ width: "100%" }}
              value={noOfTimesMonthly}
            />
          </FormItem>
          <div className="form-headings flex align-center justify-start">
            {/* {this.formatMessage(messages.consultationFee)} */}
            <span>Service Fees</span>
            <div className="star-red">*</div>
          </div>

          <Input
            className={"form-inputs-ap"}
            value={serviceFees}
            // onChange={this.setServiceFee}
            disabled={true}
          />
        </Form>
      </div>
    );
  };

  const { submitting } = values;

  return (
    <Fragment>
      <Drawer
        title={"Edit Services Offerings"}
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
        {renderAddServiceOfferings()}

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

export default EditServiceOfferings;

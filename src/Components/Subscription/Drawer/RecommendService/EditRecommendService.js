import React, { Fragment, useState, useEffect } from "react";
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
import Form from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
// import { CONSULTATION_FEE_TYPE_TEXT } from "../../../constant";

import moment from "moment";
import throttle from "lodash-es/throttle";
import { useDispatch, useSelector } from "react-redux";

// import messages from "./message";
import Footer from "../../../Drawer/footer";
import InputNumber from "antd/es/input-number";
import { updateRecommendService } from "../../../../modules/subscription/recommend";

const { Option } = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Item: FormItem } = Form;

function EditRecommendService({ onCloseDrawer, visible, editData }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    serviceOfferingName: "",
    serviceFees: "",
    submitting: false,
    discount: 0,
    notes: "",
    netServiceFees: "",
    selectedService: {},
    status: "ACTIVE",
  });

  const services = useSelector((state) => state.subscription.services);

  useEffect(() => {
    // console.log("editData", editData);
    setValues({
      ...values,
      serviceOfferingName: editData.serviceDetails.service_offering_name,
      serviceFees: editData.serviceDetails.service_charge,
      notes: editData.notes,
      netServiceFees: editData.service_charge,
      status: editData.patient_status === "inactive" ? "IN-ACTIVE" : "ACTIVE",
    });
  }, [editData]);

  const callBack = () => {
    setValues({
      serviceOfferingName: "",
      serviceFees: "",
      submitting: false,
      discount: 0,
      notes: "",
      netServiceFees: "",
      selectedService: {},
    });
    onCloseDrawer();
    message.success("Recommended service updated sucessfully");
  };

  const onSubmit = () => {
    setValues({
      ...values,
      submitting: true,
    });

    let formData = {
      notes: values.notes,
      service_charge: values.netServiceFees,
      patient_status: values.status === "ACTIVE" ? "active" : "inactive",
    };
    dispatch(
      updateRecommendService(
        editData.id,
        editData.patient_id,
        formData,
        callBack
      )
    );
  };

  // formatMessage = (data) => this.props.intl.formatMessage(data);

  const onClose = () => {};

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onDiscountChange = (e) => {
    let totalDiscountApplied = values.discount + parseInt(e.target.value);
    let netSubscriptionFees = values.serviceFees;
    let numVal1 = netSubscriptionFees;
    let numVal2 = totalDiscountApplied / 100;
    let totalValue = numVal1 - numVal1 * numVal2;
    setValues({
      ...values,
      discount: values.discount + parseInt(e.target.value),
      netServiceFees: totalValue,
    });
  };

  const setStatus = (value) => {
    setValues({
      ...values,
      status: value,
    });
  };

  const getStatusOption = () => {
    let statusOptions = [
      { name: "ACTIVE", id: 1 },
      { name: "IN-ACTIVE", id: 2 },
    ];
    let options = [];
    statusOptions.forEach((status) => {
      options.push(
        <Option key={status.id} value={status.name}>
          {status.name}
        </Option>
      );
    });

    return options;
  };

  const renderRecommendSubscription = () => {
    const {
      serviceOfferingName,
      serviceFees,
      discount,
      notes,
      netServiceFees,
    } = values;

    return (
      <div className="form-block-ap">
        <Form className="fw700 wp100 Form">
          <div className="form-headings flex align-center justify-start">
            <span>
              {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
              Service offerings
            </span>
          </div>

          <FormItem
            className="full-width ant-date-custom"
            //   label={formatMessage(messages.genericName)}
            // label={"Name of subsacription plan"}
          >
            <Input
              autoFocus
              className="mt4"
              //   placeholder={formatMessage(messages.genericName)}
              placeholder={""}
              value={serviceOfferingName}
              disabled
            />
          </FormItem>
          <div className="form-headings flex align-center justify-start">
            <span>
              {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
              Status
            </span>
          </div>

          <Select
            className="form-inputs-ap drawer-select"
            placeholder="Select Consultation Type"
            value={values.status}
            onChange={setStatus}
            autoComplete="off"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {getStatusOption()}
          </Select>

          <div className="form-headings flex align-center justify-start">
            <span>
              {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
              Service fees
            </span>
          </div>

          <FormItem
            className="full-width ant-date-custom"
            //   label={formatMessage(messages.genericName)}
            // label={"Name of subsacription plan"}
          >
            <Input
              autoFocus
              className="mt4"
              //   placeholder={formatMessage(messages.genericName)}
              placeholder={"Rs. 600"}
              value={serviceFees}
              disabled
            />
          </FormItem>
          <div className="flex align-items-end justify-content-space-between">
            <div className="flex direction-row flex-grow-1">
              <label htmlFor="quantity" className="form-label" title="Quantity">
                {/* {formatMessage(messages.quantity)} */}
                Do you want to offer discount ?
              </label>

              {/* <div className="star-red">*</div> */}
            </div>
            {/* <div className="label-color fontsize12 mb8">
            
            </div> */}
            <div className="flex-grow-0">
              <RadioGroup size="small" className="flex justify-content-end">
                <RadioButton
                  style={{ color: "#1890ff" }}
                  value={5}
                  onClick={onDiscountChange}
                >
                  +5%
                </RadioButton>
              </RadioGroup>
            </div>
          </div>

          <FormItem
            className="flex-1 align-self-end"
            // validateStatus={error ? "error" : ""}
            // help={error ? error[0] : ""}
          >
            <InputNumber min={0} style={{ width: "100%" }} value={discount} />
          </FormItem>
          <div className="form-headings flex align-center justify-start">
            <span>
              {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
              Net Service fees after discount
            </span>
          </div>

          <FormItem
            className="full-width ant-date-custom"
            //   label={formatMessage(messages.genericName)}
            // label={"Name of subsacription plan"}
          >
            <Input
              autoFocus
              className="mt4"
              //   placeholder={formatMessage(messages.genericName)}
              placeholder={"Rs. 600"}
              value={netServiceFees}
              disabled
            />
          </FormItem>
          <div className="form-headings flex align-center justify-start">
            {/* {this.formatMessage(messages.razorpayLink)} */}
            <span>Notes</span>
          </div>

          <FormItem
            // label={formatMessage(messages.description_text)}
            className="full-width ant-date-custom"
            // label={"Plan description"}
          >
            <TextArea
              autoFocus
              className="mt4"
              maxLength={1000}
              //   placeholder={formatMessage(messages.description_text_placeholder)}
              placeholder={
                "I suggest let meet virtually and see how you are going. Call the reception or me"
              }
              rows={4}
              name="notes"
              value={notes}
              onChange={onChangeHandler}
            />
          </FormItem>
        </Form>
      </div>
    );
  };

  const { submitting } = values;

  return (
    <Fragment>
      <Drawer
        title={"Recommend services offerings"}
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
        {renderRecommendSubscription()}

        <Footer
          onSubmit={onSubmit}
          onClose={onClose}
          // submitText={this.formatMessage(messages.submit)}
          submitText={"Submit"}
          submitButtonProps={{}}
          cancelComponent={null}
          submitting={submitting}
        />
      </Drawer>
    </Fragment>
  );
}

export default EditRecommendService;

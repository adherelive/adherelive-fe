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

// import messages from "./message";
import Footer from "../../../Drawer/footer";
import InputNumber from "antd/es/input-number";
import { useDispatch, useSelector } from "react-redux";
import { updateRecommendSubscription } from "../../../../modules/subscription/recommend";
import isEmpty from "../../../../Helper/is-empty";

const { Option } = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Item: FormItem } = Form;

function EditRecommendSubscription({ visible, onCloseDrawer, editData }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    subscriptionName: "",
    serviceFees: "",
    netSubscriptionFees: "",
    submitting: false,
    duration: 1,
    discount: 0,
    notes: "",
    selectedSubscription: {},
    status: "ACTIVE",
  });

  const [loginDoctorId, setLoginDoctorId] = useState("");
  const [editAllow, setEdit] = useState(false);

  const subscriptions = useSelector(
    (state) => state.subscription.subscriptions
  );

  const authenticated_user = useSelector(
    (state) => state.auth.authenticated_user
  );
  const doctors = useSelector((state) => state.doctors);

  useEffect(() => {
    if (!isEmpty(doctors) && !isEmpty(authenticated_user)) {
      let doctorId = "";
      for (let each in doctors) {
        if (doctors[each].basic_info.user_id == authenticated_user) {
          doctorId = each;
        }
      }
      setLoginDoctorId(doctorId);
      setEdit(doctorId == editData.doctor_id ? false : true);
    }
  }, [doctors, editData, authenticated_user]);

  useEffect(() => {
    console.log(editData);
    setValues({
      ...values,
      subscriptionName: editData.subscriptions.notes,
      serviceFees: editData.service_charge_per_month,
      notes: editData.notes,
      netSubscriptionFees: editData.details.service_charge,
      duration: editData.details.durations,
      status:
        editData.details.patient_status === "inactive" ? "IN-ACTIVE" : "ACTIVE",
    });
  }, [editData]);

  const callBack = () => {
    setValues({
      subscriptionName: "",
      serviceFees: "",
      netSubscriptionFees: "",
      submitting: false,
      duration: 1,
      discount: 0,
      notes: "",
      selectedSubscription: {},
    });
    onCloseDrawer();
    message.success("Recommend subscription updated sucessfully");
  };

  const onSubmit = () => {
    console.log(values);
    const {
      netSubscriptionFees,
      selectedSubscription,
      notes,
      duration,
      status,
    } = values;
    setValues({
      ...values,
      submitting: true,
    });

    let formData = {
      notes: notes,
      durations: duration,
      service_charge: netSubscriptionFees,
      patient_status: status === "ACTIVE" ? "active" : "inactive",
    };
    dispatch(
      updateRecommendSubscription(
        editData.id,
        editData.details.patient_id,
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

  const setSubscriptionName = (value, keyData) => {
    let selectedSubscription = {};
    for (const key in subscriptions) {
      if (subscriptions[key].id == keyData.key) {
        selectedSubscription = subscriptions[key];
      }
    }

    setValues({
      ...values,
      subscriptionName: value,
      serviceFees: selectedSubscription.service_charge_per_month,
      netSubscriptionFees: selectedSubscription.service_charge_per_month,
      duration: 1,
      discount: 0,
      notes: "",
      selectedSubscription: selectedSubscription,
    });
  };

  const onRadioChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value == 100) {
      setValues({
        ...values,
        duration: e.target.value,
      });
    } else {
      setValues({
        ...values,
        duration:
          values.duration == 100
            ? 1
            : values.duration + parseInt(e.target.value),
      });
    }
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
      netSubscriptionFees: totalValue,
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
      subscriptionName,
      serviceFees,
      duration,
      discount,
      notes,
      netSubscriptionFees,
    } = values;

    return (
      <div className="form-block-ap">
        <Form className="fw700 wp100 Form">
          <div className="form-headings flex align-center justify-start">
            <span>
              {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
              Subscription plan
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
              value={subscriptionName}
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
            disabled
          >
            {getStatusOption()}
          </Select>

          <div className="flex align-items-end justify-content-space-between">
            <div className="flex direction-row flex-grow-1">
              <label htmlFor="quantity" className="form-label" title="Quantity">
                {/* {formatMessage(messages.quantity)} */}
                Duration
              </label>

              {/* <div className="star-red">*</div> */}
            </div>
            {/* <div className="label-color fontsize12 mb8">
            
            </div> */}
            <div className="flex-grow-0">
              <RadioGroup size="small" className="flex justify-content-end">
                <RadioButton
                  style={{ color: "#1890ff" }}
                  value={1}
                  onClick={
                    editAllow
                      ? () => alert("Secondary doctor not allowed to edit")
                      : onRadioChange
                  }
                >
                  +1 month
                </RadioButton>
                <RadioButton
                  style={{ color: "#1890ff" }}
                  value={100}
                  onClick={
                    editAllow
                      ? () => alert("Secondary doctor not allowed to edit")
                      : onRadioChange
                  }
                >
                  ongoing
                </RadioButton>
              </RadioGroup>
            </div>
          </div>
          <FormItem
            className="flex-1 align-self-end"
            // validateStatus={error ? "error" : ""}
            // help={error ? error[0] : ""}
          >
            {duration == 100 ? (
              <Input
                autoFocus
                className="mt4"
                //   placeholder={formatMessage(messages.genericName)}
                placeholder={"Rs. 600"}
                value={"Ongoing"}
                disabled
              />
            ) : (
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                value={duration}
                disabled={editAllow}
              />
            )}
          </FormItem>

          <div className="form-headings flex align-center justify-start">
            <span>
              {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
              Subscription fees
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

          {/* <div className="flex align-items-end justify-content-space-between">
            <div className="flex direction-row flex-grow-1">
              <label htmlFor="quantity" className="form-label" title="Quantity">
              
                Do you want to offer discount ?
              </label>

            
            </div>
          
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
          </div> */}

          {/* <FormItem
            className="flex-1 align-self-end"
           
          >
            <InputNumber min={0} style={{ width: "100%" }} value={discount} />
          </FormItem> */}
          {/* <div className="form-headings flex align-center justify-start">
            <span>
             
              Net subscription fees after discount
            </span>
          </div>

          <FormItem
            className="full-width ant-date-custom"
           
          >
            <Input
              autoFocus
              className="mt4"
             
              placeholder={"Rs. 600"}
              value={netSubscriptionFees}
              disabled
            />
          </FormItem> */}
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
                "I suggest you take four month subscription until we drop some of your elevated vitals for LFT'S, CSR, etc..."
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

  console.log("editAllow", editAllow);

  const {
    submitting,
    serviceOfferingsDrawer,
    createSubscriptionWarn,
    editServiceOfferingDrawer,
  } = values;

  return (
    <Fragment>
      <Drawer
        title={"Recommend Subscription Plan"}
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

export default EditRecommendSubscription;

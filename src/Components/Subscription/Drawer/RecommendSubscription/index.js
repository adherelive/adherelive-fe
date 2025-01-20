import React, {Fragment, useState} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import {recommendSubscription} from "../../../../modules/subscription/recommend";
import isEmpty from "../../../../Helper/is-empty";
import Tooltip from "antd/es/tooltip";

const {Option} = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Item: FormItem} = Form;

function Index({visible, onCloseDrawer, patient_id}) {
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
    });

    const subscriptions = useSelector(
        (state) => state.subscription.subscriptions
    );

    const callBack = (status, apiMessage) => {
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
        if (status === true) {
            message.success("Subscription recommended successfully");
        } else if (status === false) {
            message.error(apiMessage);
        }
    };

    const onSubmit = () => {
        const {netSubscriptionFees, selectedSubscription, notes, duration} =
            values;
        setValues({
            ...values,
            submitting: true,
        });
        dispatch(
            recommendSubscription(
                {
                    patient_id: patient_id,
                    // doctor_id: 1,
                    // provider_id: 1,
                    service_charge: netSubscriptionFees,
                    notes: notes,
                    service_subscription_plan_id: selectedSubscription.id,
                    durations: duration,
                },
                callBack
            )
        );
    };

    // formatMessage = (data) => this.props.intl.formatMessage(data);

    const onClose = () => {};

    const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const onDurationChangeHandler = (value) => {
        if (value !== null) {
            setValues({
                ...values,
                duration: parseInt(value),
            });
        }
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

    const getSubscriptionOption = () => {
        const scoreArr = Object.entries(subscriptions);
        const filteredArr = scoreArr.filter(function ([key, value]) {
            return value.is_active_for_doctor === 1;
        });
        const newScore = Object.fromEntries(filteredArr);

        let options = [];
        for (const key in newScore) {
            console.log("newScore[key]", newScore[key]);
            let services = newScore[key].services;

            let servicesArray = [];

            for (const service in services) {
                servicesArray.push(services[service]);
            }
            console.log("servicesArray", servicesArray);

            options.push(
                <Option
                    key={newScore[key].id}
                    value={newScore[key].notes}
                    className="pointer flex wp100  align-center justify-space-between"
                >
                    <Tooltip
                        title={servicesArray.map((ele, index) => {
                            return (
                                <span key={index} className="block mt10">
                  {`${ele.service_frequency} - ${ele.serviceDetails.service_offering_name}`}
                </span>
                            );
                        })}
                    >
                        {/* Title */}
                        <div>
                            <span className="block fs16">{newScore[key].notes}</span>
                            {/* {servicesArray.map((ele, index) => {
                return (
                  <span key={index} className="block mt10 fs12">
                    {ele.serviceDetails.service_offering_name}
                  </span>
                );
              })} */}
                        </div>
                    </Tooltip>
                </Option>
                // <Option key={newScore[key].id} value={newScore[key].notes}>
                //   {newScore[key].notes}
                // </Option>
            );
        }

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
                Subscription plans
            </span>
                    </div>

                    <Select
                        className="form-inputs-ap drawer-select"
                        placeholder="Select Consultation Type"
                        value={subscriptionName}
                        onChange={setSubscriptionName}
                        autoComplete="off"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {getSubscriptionOption()}
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
                                    style={{color: "#1890ff"}}
                                    value={1}
                                    onClick={onRadioChange}
                                >
                                    +1 month
                                </RadioButton>
                                <RadioButton
                                    style={{color: "#1890ff"}}
                                    value={100}
                                    onClick={onRadioChange}
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
                                style={{width: "100%"}}
                                value={duration}
                                onChange={onDurationChangeHandler}
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
                        className="full-width ant-date-custom mb10"
                        //   label={formatMessage(messages.genericName)}
                        // label={"Name of subsacription plan"}
                    >
                        <Input
                            autoFocus
                            className="form-inputs-ap"
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
          </div>

          <FormItem
            className="flex-1 align-self-end"
            // validateStatus={error ? "error" : ""}
            // help={error ? error[0] : ""}
          >
            <InputNumber min={0} style={{ width: "100%" }} value={discount} />
          </FormItem> */}
                    <div className="form-headings flex align-center justify-start">
            <span>
              {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
                Net subscription fees
            </span>
                    </div>

                    <FormItem
                        className="full-width ant-date-custom mb10"
                        //   label={formatMessage(messages.genericName)}
                        // label={"Name of subsacription plan"}
                    >
                        <Input
                            autoFocus
                            className="form-inputs-ap"
                            //   placeholder={formatMessage(messages.genericName)}
                            placeholder={"Rs. 600"}
                            value={netSubscriptionFees}
                            disabled
                        />
                    </FormItem>
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.razorpayLink)} */}
                        <span>Notes</span>
                    </div>
                    <div className="mb80">
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
                    </div>
                </Form>
            </div>
        );
    };

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

export default Index;

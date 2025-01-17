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
import {useDispatch, useSelector} from "react-redux";

// import messages from "./message";
import Footer from "../../../Drawer/footer";
import InputNumber from "antd/es/input-number";
import {recommendService} from "../../../../modules/subscription/recommend";

const {Option} = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Item: FormItem} = Form;

function Index({onCloseDrawer, visible, patient_id}) {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        serviceOfferingName: "",
        serviceFees: "",
        submitting: false,
        discount: 0,
        notes: "",
        netServiceFees: "",
        selectedService: {},
    });

    const services = useSelector((state) => state.subscription.services);

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
        message.success("Service recommended sucessfully");
    };

    const onSubmit = () => {
        setValues({
            ...values,
            submitting: true,
        });
        dispatch(
            recommendService(
                {
                    patient_id: patient_id,
                    // doctor_id: 1,
                    // provider_id: 1,
                    service_charge: values.netServiceFees,
                    notes: values.notes,
                    service_plan_id: values.selectedService.id,
                    durations: 1,
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

    const setServiceOfferingName = (value, keyData) => {
        let selectedService = {};
        for (const key in services) {
            if (services[key].id == keyData.key) {
                selectedService = services[key];
            }
        }

        setValues({
            ...values,
            serviceOfferingName: value,
            serviceFees: selectedService.service_charge,
            netServiceFees: selectedService.service_charge,
            discount: 0,
            notes: "",
            selectedService: selectedService,
        });
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

    const getServiceOfferingOption = () => {
        let options = [];

        for (const key in services) {
            options.push(
                <Option
                    className="flex justify-content-space-between"
                    key={services[key].id}
                    value={`${services[key].service_offering_name}-${services[key].id}`}
                >
                    <div>{services[key].service_offering_name}</div>
                    <div>
                        {services[key].currency} {services[key].service_charge}
                    </div>
                </Option>
            );
        }

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

                    <Select
                        className="form-inputs-ap drawer-select"
                        placeholder="Select Consultation Type"
                        value={serviceOfferingName}
                        onChange={setServiceOfferingName}
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

                    <div className="form-headings flex align-center justify-start">
            <span>
              {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
                Service fees
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

              <div className="star-red">*</div>
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
                Net Service fees
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

    const {submitting} = values;

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

export default Index;

import React, {Fragment, useEffect, useState} from "react";
import { injectIntl } from "react-intl";
import {
  Drawer,
  // Icon,
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
import AddServiceOfferings from "../AddServiceOfferings";
import EditServiceOfferings from "../AddServiceOfferings/EditServiceOfferings";
import CreateSubscriptionWarn from "./../../Modal/CreateSubscriptionWarn";
import EditSubscriptionFeesWarn from "../../Modal/EditSubscriptionFeesWarn";
import isEmpty from "./../../../../Helper/is-empty";
import {addSubscriptions} from "./../../../../modules/subscription/subscriptions/index";
import {useDispatch} from "react-redux";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

const {Option} = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {Item: FormItem} = Form;

function Index({onCloseDrawer, visible, doctor_id}) {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        subscriptionName: "",
        totalSubscriptionFees: "",
        planDescription: "",
        submitting: false,
        serviceOfferingsDrawer: false,
        createSubscriptionWarn: false,
        editServiceOfferingDrawer: false,
        editSubscriptionFeesWarn: false,
        razorpayLink: "",
        loading: false,
    });

    const [serviceOfferingsArray, setServiceOfferingArray] = useState([]);
    const [editServiceOfferingData, setEditServiceOfferingData] = useState({});
    const [editOfferingIndex, setEditOfferingIndex] = useState("");
    const [enableSubscriptionFees, setEnableSubscriptionFees] = useState(false);

    useEffect(() => {
        if (!isEmpty(serviceOfferingsArray)) {
            let totalAmount = serviceOfferingsArray
                .map((item) => item.service_charge * item.noOfTimesMonthly)
                .reduce((prev, curr) => prev + curr, 0);
            setValues({
                ...values,
                totalSubscriptionFees: totalAmount,
            });
        }
    }, [serviceOfferingsArray]);

    const onSubmit = () => {
        setTimeout(() => {
            const validate = validateData();

            if (validate) {
                setValues({
                    ...values,
                    createSubscriptionWarn: true,
                });
            }
        }, 500);
    };

    const callBack = () => {
        setValues({
            ...values,
            createSubscriptionWarn: false,
            subscriptionName: "",
            totalSubscriptionFees: "",
            planDescription: "",
            submitting: false,
            serviceOfferingsDrawer: false,
            editServiceOfferingDrawer: false,
        });
        setServiceOfferingArray([]);
        setEnableSubscriptionFees(false);
        onCloseDrawer();
        message.success("Subscription added sucessfully");
    };

    const handleOk = () => {
        setValues({
            ...values,
            loading: true,
        });
        let finalServiceArray = [];

        serviceOfferingsArray.forEach((ele) => {
            finalServiceArray.push({
                service_id: ele.id,
                frequency: ele.noOfTimesMonthly,
            });
        });

        // setValues({
        //   ...values,
        //   createSubscriptionWarn: false,
        // });

        let formData = {
            // provider_type: "doctor",
            // provider_id: 1,
            notes: values.subscriptionName,
            service_charge_per_month: values.totalSubscriptionFees,
            is_active_for_doctor: true,
            description: values.planDescription,
            currency: "INR",
            services: finalServiceArray,
            payment_link: values.razorpayLink,
        };

        if (doctor_id) {
            formData.doctor_id = doctor_id;
        }

        dispatch(addSubscriptions(formData, callBack));
    };

    const handleCancel = () => {
        setValues({
            ...values,
            createSubscriptionWarn: false,
        });
        setServiceOfferingArray([]);
        onCloseDrawer();
    };

    // formatMessage = (data) => this.props.intl.formatMessage(data);

    const onClose = () => {
        setValues({
            ...values,
            createSubscriptionWarn: false,
            subscriptionName: "",
            totalSubscriptionFees: "",
            planDescription: "",
            submitting: false,
            serviceOfferingsDrawer: false,
            editServiceOfferingDrawer: false,
        });
        setServiceOfferingArray([]);
        onCloseDrawer();
    };

    const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    };

    const setServiceOfferingDrawer = () => {
        setValues({
            ...values,
            serviceOfferingsDrawer: true,
        });
    };

    const onCloseDrawerNew = () => {
        setValues({
            ...values,
            serviceOfferingsDrawer: false,
            editServiceOfferingDrawer: false,
        });
    };

    const editServiceOfferingHandler =
        (editServiceOfferingData, index) => (e) => {
            e.preventDefault();
            setValues({
                ...values,
                editServiceOfferingDrawer: true,
            });
            setEditServiceOfferingData(editServiceOfferingData);
            setEditOfferingIndex(index);
        };

    const deleteServiceOfferingHandler = (index) => (e) => {
        e.preventDefault();
        let array = [...serviceOfferingsArray];

        array.splice(index, 1);
        setServiceOfferingArray(array);
    };

    const editSubscriptionFees = () => {
        setValues({
            ...values,
            editSubscriptionFeesWarn: true,
        });
    };

    const handleFeesAction = (action) => (e) => {
        e.preventDefault();
        if (action === "ok") {
            setValues({
                ...values,
                editSubscriptionFeesWarn: false,
            });
            setEnableSubscriptionFees(true);
        } else {
            setValues({
                ...values,
                editSubscriptionFeesWarn: false,
            });
        }
    };

    const setRazorpayLink = (e) => {
        setValues({
            ...values,
            razorpayLink: e.target.value,
        });
    };

    const validateData = () => {
        const {subscriptionName = "", razorpayLink = ""} = values;
        if (!subscriptionName) {
            message.error("Subscription name is required");
            return false;
        } else if (isEmpty(serviceOfferingsArray)) {
            message.error("Please select at least one service");
            return false;
        }
        // else if (!razorpayLink) {
        //   message.error("Please add payment link");
        //   return false;
        // }

        return true;
    };

    const renderAddNewSubscription = () => {
        const {subscriptionName, totalSubscriptionFees, planDescription} = values;

        return (
            <div className="form-block-ap">
                <Form className="fw700 wp100 Form">
                    <div className="form-headings flex align-center justify-start">
            <span>
              {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
                Name of subscription plan
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
                            placeholder={"Health lite"}
                            name="subscriptionName"
                            value={subscriptionName}
                            onChange={onChangeHandler}
                        />
                    </FormItem>

                    <div className="wp100 flex align-center justify-space-between">
                        <div className="form-headings flex align-center justify-start">
              <span>
                {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
                  Service offerings
              </span>
                        </div>

                        <div className="add-more" onClick={setServiceOfferingDrawer}>
                            {/* {this.formatMessage(messages.addMore)} */}
                            {isEmpty(serviceOfferingsArray) ? "Add" : "Add More"}
                        </div>
                    </div>
                    {!isEmpty(serviceOfferingsArray) ? (
                        serviceOfferingsArray.map((data, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex wp100 flex-grow-1 align-center"
                                >
                                    <div className="drawer-block">
                                        <div className="flex direction-row justify-space-between align-center">
                                            <div
                                                className="form-headings-ap">{`${data.noOfTimesMonthly} * ${data.service_offering_name}`}</div>
                                            <div>
                                                <EditOutlined
                                                    // type="edit"
                                                    className="ml20"
                                                    style={{color: "#4a90e2"}}
                                                    theme="filled"
                                                    onClick={editServiceOfferingHandler(data, index)}
                                                />
                                                <DeleteOutlined
                                                    // type="delete"
                                                    className="ml20"
                                                    style={{color: "#d12a0b"}}
                                                    theme="filled"
                                                    onClick={deleteServiceOfferingHandler(index)}
                                                />
                                            </div>
                                        </div>
                                        <div className="drawer-block-description">
                                            {data.description}
                                        </div>
                                        <div
                                            className="drawer-block-description">{`${data.currency} ${data.service_charge}`}</div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex wp100 flex-grow-1 align-center mb10">
                            {" "}
                            <div className="drawer-block">No service offering added</div>
                        </div>
                    )}

                    <div className="wp100 flex align-center justify-space-between">
                        <div className="form-headings flex align-center justify-start">
              <span>
                {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
                  Total subscription fees
              </span>
                        </div>

                        {!isEmpty(serviceOfferingsArray) && (
                            <EditSubscriptionFeesWarn
                                editSubscriptionFeesWarn={values.editSubscriptionFeesWarn}
                                editSubscriptionFees={editSubscriptionFees}
                                handleFeesAction={handleFeesAction}
                            />
                        )}
                    </div>

                    <FormItem
                        className="full-width ant-date-custom"
                        //   label={formatMessage(messages.genericName)}
                        // label={"Name of subsacription plan"}
                    >
                        <Input
                            autoFocus
                            className="form-inputs-ap"
                            //   placeholder={formatMessage(messages.genericName)}
                            name="totalSubscriptionFees"
                            placeholder={"Rs. 0"}
                            value={totalSubscriptionFees}
                            onChange={onChangeHandler}
                            disabled={enableSubscriptionFees ? false : true}
                        />
                    </FormItem>
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.razorpayLink)} */}
                        <span>Plan Description</span>
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
                                "This is recommended for patients with severe chronic illness"
                            }
                            rows={4}
                            name="planDescription"
                            value={planDescription}
                            onChange={onChangeHandler}
                        />
                    </FormItem>
                    <div className="mb80">
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
                        <h3>
                            Subscription period is always monthly please refer to T&C for
                            details
                        </h3>
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

    // console.log("serviceOfferingsArray", serviceOfferingsArray);
    // console.log("editServiceOfferingData", editServiceOfferingData);

    return (
        <Fragment>
            <Drawer
                title={"Add New Subscription Plan"}
                placement="right"
                maskClosable={false}
                headerStyle={{
                    position: "sticky",
                    zIndex: "9999",
                    top: "0px",
                }}
                destroyOnClose={true}
                onClose={onClose}
                visible={visible} // todo: change as per state, -- WIP --
                width={400}
            >
                {renderAddNewSubscription()}
                {serviceOfferingsDrawer === true && (
                    <AddServiceOfferings
                        visible={serviceOfferingsDrawer}
                        onCloseDrawer={onCloseDrawerNew}
                        setServiceOfferingArray={setServiceOfferingArray}
                        serviceOfferingsArray={serviceOfferingsArray}
                    />
                )}
                {editServiceOfferingDrawer === true && (
                    <EditServiceOfferings
                        visible={editServiceOfferingDrawer}
                        onCloseDrawer={onCloseDrawerNew}
                        setServiceOfferingArray={setServiceOfferingArray}
                        editServiceOfferingData={editServiceOfferingData}
                        serviceOfferingsArray={serviceOfferingsArray}
                        editOfferingIndex={editOfferingIndex}
                    />
                )}
                <Footer
                    onSubmit={onSubmit}
                    onClose={onClose}
                    // submitText={this.formatMessage(messages.submit)}
                    submitText={"Submit"}
                    submitButtonProps={{}}
                    cancelComponent={null}
                    submitting={submitting}
                />
                <CreateSubscriptionWarn
                    isModalVisible={createSubscriptionWarn}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    loading={values.loading}
                />
            </Drawer>
        </Fragment>
    );
}

export default Index;

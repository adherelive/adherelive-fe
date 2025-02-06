import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { hasErrors } from "../../../Helper/validation";
import moment from "moment";

import Drawer from "antd/es/drawer";
// import Form from "antd/es/form";
import message from "antd/es/message";

import messages from "./message";
import AddAppointmentForm from "./form";
import Footer from "../footer";
import { RADIOLOGY } from "../../../constant";
// code implementation after phase 1 for antd v4
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import isEmpty from "../../../Helper/is-empty";
import ScheduledAppointments from "./ScheduledAppointments";

class AddAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            disabledSubmit: true,
            submitting: false,
            scheduleDrawer: false,
            scheduleDate: "",
            pageUrl: window.location.pathname.split("/"),
            loading: false,
        };

        this.FormWrapper = Form.create({onFieldsChange: this.onFormFieldChanges})(
            AddAppointmentForm
        );
    }

    onFormFieldChanges = (props) => {
        const {
            form: {getFieldsError, isFieldsTouched},
        } = props;
        const isError = hasErrors(getFieldsError());
        const {disabledSubmit} = this.state;
        if (disabledSubmit !== isError && isFieldsTouched()) {
            this.setState({disabledSubmit: isError});
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            addCarePlanAppointment,
            payload: {patient_id},
            carePlanId,
            updateActivityById,
            scheduleAppointment,
            setFlashCard,
            history,
            setScheduleAppointmentData,
        } = this.props;
        const {formRef = {}, formatMessage} = this;

        // const { basic_info: { user_id } = {} } = patients[patient_id] || {};
        const {
            props: {
                form: {validateFields, resetFields},
            },
        } = formRef;

        validateFields(async (err, values) => {
            if (!err) {
                let {
                    date,
                    type,
                    type_description,
                    provider_id,
                    critical = false,
                    start_time,
                    reason,
                    end_time,
                    description = "",
                    treatment = "",
                    radiology_type = "",
                    appointment_careplan = {},
                } = values;

                // if(type === RADIOLOGY){
                //   type_description = radiology_type;
                // }

                let provider_name = typeof provider_id === "string" ? provider_id : "";

                let newProvider_id =
                    typeof provider_id === "string" ? null : provider_id;

                const startDate = date ? moment(date) : moment();
                const newMonth = date ? startDate.get("month") : moment().get("month");
                const newDate = date ? startDate.get("date") : moment().get("date");
                const newYear = date ? startDate.get("year") : moment().get("year");
                let newEventStartTime = date
                    ? moment(start_time)
                        .clone()
                        .set({month: newMonth, year: newYear, date: newDate})
                    : start_time;
                let newEventEndTime = date
                    ? moment(end_time)
                        .clone()
                        .set({month: newMonth, year: newYear, date: newDate})
                    : end_time;

                const data = newProvider_id
                    ? {
                        // TODO: change participant one with patient from store
                        // participant_one: {
                        //   id: patient_id,
                        //   category: "patient",
                        // },
                        // code implementation after phase 1 for Subscription
                        participant_two: {
                            id:
                                !isEmpty(scheduleAppointment) &&
                                this.state.pageUrl[1] !== "patients"
                                    ? scheduleAppointment.patient_id
                                    : patient_id,
                            category: "patient",
                        },
                        date,
                        start_time: newEventStartTime,
                        end_time: newEventEndTime,
                        reason,
                        description,
                        type,
                        type_description,
                        provider_id: newProvider_id,
                        provider_name,
                        critical,
                        treatment_id: treatment,
                        // treatment_id: !isEmpty(scheduleAppointment)
                        //   ? appointment_careplan
                        //   : treatment,
                    }
                    : {
                        // todo: change participant one with patient from store
                        // participant_two: {
                        //   id: patient_id,
                        //   category: "patient",
                        // },
                        participant_two: {
                            id:
                                !isEmpty(scheduleAppointment) &&
                                this.state.pageUrl[1] !== "patients"
                                    ? scheduleAppointment.patient_id
                                    : patient_id,
                            category: "patient",
                        },
                        date,
                        start_time: newEventStartTime,
                        end_time: newEventEndTime,
                        reason,
                        description,
                        type,
                        type_description,
                        provider_name,
                        critical,
                        treatment_id: treatment,
                        // treatment_id: !isEmpty(scheduleAppointment)
                        //   ? appointment_careplan
                        //   : treatment,
                    };

                if (type === RADIOLOGY) {
                    data["radiology_type"] = radiology_type;
                }

                if (
                    !date ||
                    !start_time ||
                    !end_time ||
                    !type ||
                    !type_description ||
                    !reason ||
                    (!provider_id && !provider_name)
                ) {
                    message.error(this.formatMessage(messages.fillMandatory));
                } else if (
                    moment(date).isSame(moment(), "day") &&
                    moment(start_time).diff(moment(), "minutes") < 0
                ) {
                    message.error(this.formatMessage(messages.pastTimeError));
                } else if (moment(end_time).isBefore(moment(start_time))) {
                    message.error(this.formatMessage(messages.validTimingError));
                } else {
                    try {
                        this.setState({submitting: true});
                        let finalCareplanId =
                            !isEmpty(scheduleAppointment) &&
                            this.state.pageUrl[1] !== "patients"
                                ? appointment_careplan
                                : carePlanId;
                        const response = await addCarePlanAppointment(
                            data,
                            finalCareplanId
                        );
                        if (!isEmpty(response.payload.error)) {
                            message.error(response.payload.message);
                        }
                        const {
                            status,
                            statusCode: code,
                            payload: {
                                data: {appointment_id = ""},
                                message: errorMessage = "",
                                error: {error_type = ""} = {},
                            },
                        } = response || {};

                        if (code === 422 && error_type === "slot_present") {
                            message.warn(
                                `${errorMessage} range: ${moment(start_time).format(
                                    "LT"
                                )} - ${moment(end_time).format("LT")}`
                            );
                        } else if (status === true) {
                            resetFields();
                            message.success(formatMessage(messages.add_appointment_success));

                            // code implementation after phase 1 for Subscription

                            if (
                                !isEmpty(scheduleAppointment) &&
                                this.state.pageUrl[1] !== "patients"
                            ) {
                                const formData = {
                                    appointment_id: appointment_id,
                                    appointment_time: newEventStartTime,
                                    status: "scheduled",
                                    // provider_id: newProvider_id,
                                };
                                let updateResponse = await updateActivityById(
                                    scheduleAppointment.id,
                                    formData
                                );
                                if (
                                    updateResponse &&
                                    scheduleAppointment.fromButton === "start"
                                ) {
                                    localStorage.setItem("flashcardOpen", true);
                                    setFlashCard(true);
                                    history.push(`patients/${scheduleAppointment.patient_id}`);
                                } else if (
                                    updateResponse &&
                                    scheduleAppointment.fromButton === "schedule"
                                ) {
                                    setScheduleAppointmentData({});
                                }
                            }
                            // getAppointments(patient_id);
                        } else {
                            if (code === 500) {
                                message.warn(formatMessage(messages.somethingWentWrong));
                            } else {
                                message.warn(errorMessage);
                            }
                        }
                        this.setState({submitting: false});
                    } catch (error) {
                        this.setState({submitting: false});
                    }
                }
            }
        });
    };

    formatMessage = (data) => this.props.intl.formatMessage(data);

    // SCHEDULE COMPONENT HANDLER

    openScheduleHandler = (data) => {
        console.log(data);
        this.setState({
            scheduleDrawer: true,
            scheduleDate: data,
        });
    };

    loadingHandler = (value) => {
        this.setState({
            loading: value,
        });
    };

    closeScheduleHanlder = () => {
        this.setState({
            scheduleDrawer: false,
        });
    };

    setTimeHandlerOnClick = (timeData) => {
        const {formRef} = this;
        const {
            props: {
                form: {setFieldsValue},
            },
        } = formRef;
        // console.log("timeData", timeData);
        let startTime = timeData.startDate.toISOString();
        let endTime = timeData.endDate.toISOString();
        // console.log("startTime", startTime);
        // console.log("endTime", endTime);
        this.setState({
            scheduleDrawer: false,
        });
        setFieldsValue({
            ["start_time"]: moment(startTime),
            ["end_time"]: moment(endTime),
            ["date"]: moment(startTime),
        });
    };

    onClose = () => {
        const {close, setScheduleAppointmentData} = this.props;
        const {formRef} = this;
        const {
            props: {
                form: {resetFields},
            },
        } = formRef;
        resetFields();
        close();
        // code implementation after phase 1 for Subscription
        if (this.state.pageUrl[1] !== "patients") {
            setScheduleAppointmentData({});
        }
    };

    setFormRef = (formRef) => {
        this.formRef = formRef;
        if (formRef) {
            this.setState({formRef: true});
        }
    };

    render() {
        const {
            visible,
            hideAppointment,
            appointmentVisible,
            editAppointment,
            scheduleAppointment,
            getAppointmentsDataForDay,
        } = this.props;
        const {disabledSubmit, submitting = false} = this.state;

        const {onClose, formatMessage, setFormRef, handleSubmit, FormWrapper} =
            this;

        const submitButtonProps = {
            disabled: disabledSubmit,
            // loading: loading && !deleteLoading
        };

        // if (visible !== true) {
        //   return null;
        // }

        return (
            <Fragment>
                <Drawer
                    placement="right"
                    // closable={false}
                    maskClosable={false}
                    headerStyle={{
                        position: "sticky",
                        zIndex: "9999",
                        top: "0px",
                    }}
                    destroyOnClose={true}
                    onClose={editAppointment ? hideAppointment : onClose}
                    visible={editAppointment ? appointmentVisible : visible}
                    width={"35%"}
                    title={
                        editAppointment
                            ? formatMessage(messages.appointment)
                            : formatMessage(messages.add_appointment)
                    }
                    // headerStyle={{
                    //     display:"flex",
                    //     justifyContent:"space-between",
                    //     alignItems:"center"
                    // }}
                >
                    {/* <div className="flex direction-row justify-space-between"> */}
                    <FormWrapper
                        wrappedComponentRef={setFormRef}
                        {...this.props}
                        openScheduleHandler={this.openScheduleHandler}
                        loadingHandler={this.loadingHandler}
                    />
                    {/* <CalendarTimeSelection
                className="calendar-section wp60"
            /> */}
                    {/* </div> */}

                    <Footer
                        onSubmit={handleSubmit}
                        onClose={onClose}
                        submitText={
                            !isEmpty(scheduleAppointment) &&
                            scheduleAppointment.fromButton === "start" &&
                            this.state.pageUrl[1] !== "patients"
                                ? "Submit and start"
                                : formatMessage(messages.submit_text)
                        }
                        submitButtonProps={submitButtonProps}
                        cancelComponent={null}
                        submitting={submitting}
                    />
                    <ScheduledAppointments
                        visible={this.state.scheduleDrawer}
                        onCloseDrawer={this.closeScheduleHanlder}
                        scheduleDate={this.state.scheduleDate}
                        setTimeHandlerOnClick={this.setTimeHandlerOnClick}
                        loading={this.state.loading}
                        loadingHandler={this.loadingHandler}
                    />
                </Drawer>
            </Fragment>
        );
    }
}

export default injectIntl(AddAppointment);

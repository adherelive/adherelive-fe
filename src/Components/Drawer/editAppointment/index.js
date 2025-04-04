import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { hasErrors } from "../../../Helper/validation";
import moment from "moment";

import Drawer from "antd/es/drawer";
// import Form from "antd/es/form";
import message from "antd/es/message";
import Button from "antd/es/button";
import confirm from "antd/es/modal/confirm";

import messages from "./message";
import EditAppointmentForm from "./form";
import Footer from "../footer";

import { RADIOLOGY } from "../../../constant";
// code implementation after phase 1 for antd v4
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import isEmpty from "./../../../Helper/is-empty";
import ScheduledAppointments from "../addAppointment/ScheduledAppointments";

class EditAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            disabledSubmit: true,
            submitting: false,
            scheduleDrawer: false,
            scheduleDate: "",
            // pageUrl: window.location.pathname.split("/"),
            loading: true,
        };

        this.FormWrapper = Form.create({onFieldsChange: this.onFormFieldChanges})(
            EditAppointmentForm
        );
    }

    componentDidMount = () => {};

    enableSubmit = () => {
        this.setState({disabledSubmit: false});
    };

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
            updateAppointment,
            payload: {id} = {},
            patients,
            patientId,
            getAppointments,
            editAppointment,
            addAppointment,
            payload: {patient_id} = {},
            updateActivityById,
            scheduleAppointment,
        } = this.props;
        const {formRef = {}, formatMessage} = this;
        const {
            props: {
                form: {validateFields},
            },
        } = formRef;

        let pId = patientId ? patientId : patient_id;
        // const { basic_info: { user_id } = {} } = patients[pId] || {};

        validateFields(async (err, values) => {
            if (!err) {
                let {
                    patient = {},
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
                } = values;

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
                // code implementation after phase 1
                let finalDate = moment();
                finalDate.set("year", newYear);
                finalDate.set("month", newMonth);
                finalDate.set("date", newDate);

                const data = newProvider_id
                    ? {
                        // todo: change participant one with patient from store
                        id,
                        // participant_two: {
                        //   id: pId,
                        //   category: "patient",
                        // },
                        participant_two: {
                            id: !isEmpty(scheduleAppointment)
                                ? scheduleAppointment.patient_id
                                : pId,
                            category: "patient",
                        },
                        date: finalDate,
                        start_time: newEventStartTime,
                        end_time: newEventEndTime,
                        reason,
                        description,
                        type,
                        type_description,
                        provider_id: newProvider_id,
                        provider_name,
                        critical,
                        treatment_id: !isEmpty(treatment) ? treatment : 1,
                        // treatment_id: !isEmpty(scheduleAppointment) ? 1 : treatment,
                    }
                    : {
                        // todo: change participant one with patient from store
                        id,
                        // participant_two: {
                        //   id: pId,
                        //   category: "patient",
                        // },
                        participant_two: {
                            id: !isEmpty(scheduleAppointment)
                                ? scheduleAppointment.patient_id
                                : pId,
                            category: "patient",
                        },
                        date: finalDate,
                        start_time: newEventStartTime,
                        end_time: newEventEndTime,
                        reason,
                        description,
                        type,
                        type_description,
                        provider_name,
                        critical,
                        treatment_id: !isEmpty(treatment) ? treatment : 1,
                        // treatment_id: !isEmpty(scheduleAppointment) ? 1 : treatment,
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
                    message.error(formatMessage(messages.fillMandatory));
                } else if (
                    moment(date).isSame(moment(), "day") &&
                    moment(start_time).isBefore(moment())
                ) {
                    message.error(formatMessage(messages.pastTimeError));
                } else if (moment(end_time).isBefore(moment(start_time))) {
                    message.error(formatMessage(messages.validTimingError));
                } else if (editAppointment) {
                    // this.setState({ disabledSubmit: true });
                    editAppointment(data);
                } else if (addAppointment) {
                    // this.setState({ disabledSubmit: true });
                    addAppointment(data);
                } else {
                    console.log("finalDate", finalDate.toISOString());
                    console.log("data", data);
                    try {
                        this.setState({submitting: true});
                        const response = await updateAppointment(data);
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
                            this.setState({disabledSubmit: true});
                            message.success(formatMessage(messages.edit_appointment_success));
                            getAppointments(pId);

                            // code implementation after phase 1 for Subscription

                            if (!isEmpty(scheduleAppointment)) {
                                const formData = {
                                    appointment_id: appointment_id,
                                    appointment_time: newEventStartTime,
                                    status: "scheduled",
                                    // provider_id: newProvider_id,
                                };
                                updateActivityById(scheduleAppointment.id, formData);
                            }
                        } else {
                            message.warn(formatMessage(messages.somethingWentWrong));
                        }

                        this.setState({submitting: false});
                    } catch (error) {
                        this.setState({submitting: false});
                        console.log("ADD APPOINTMENT UI ERROR ---> ", error);
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
        const {close} = this.props;
        this.setState({disabledSubmit: true});
        close();
    };

    setFormRef = (formRef) => {
        this.formRef = formRef;
        if (formRef) {
            this.setState({formRef: true});
        }
    };

    warnNote = () => {
        return (
            <div className="pt16">
                <p className="red">
                    <span className="fw600">{"Note"}</span>
                    {" : This delete is irreversible"}
                </p>
            </div>
        );
    };

    handleDelete = (e) => {
        e.preventDefault();
        const {payload: {id, patient_id} = {}, patients} = this.props;
        const {warnNote} = this;

        const {basic_info: {first_name, middle_name, last_name} = {}} =
        patients[patient_id] || {};

        confirm({
            title: `Are you sure you want to delete the appointment with ${first_name} ${
                middle_name ? `${middle_name} ` : ""
            }${last_name ? last_name : ""}?`,
            content: <div>{warnNote()}</div>,
            onOk: async () => {
                this.setState({loading: true});
                const {
                    deleteAppointment,
                    getAppointments,
                    getPatientCarePlanDetails,
                } = this.props;
                const response = await deleteAppointment(id);
                const {status} = response || {};
                if (status === true) {
                    getPatientCarePlanDetails(patient_id);
                    getAppointments(patient_id);
                }
            },
            onCancel() {},
        });
    };

    getDeleteButton = () => {
        const {handleDelete} = this;
        const {
            loading,
            deleteAppointmentOfTemplate,
            addAppointment,
            hideAppointment,
        } = this.props;
        if (addAppointment) {
            return (
                <Button onClick={hideAppointment} style={{marginRight: 8}}>
                    Cancel
                </Button>
            );
        }
        return (
            <Button
                type="danger"
                ghost
                className="fs14 no-border style-delete"
                onClick={
                    deleteAppointmentOfTemplate
                        ? deleteAppointmentOfTemplate
                        : handleDelete
                }
                loading={loading}
            >
                <div className="flex align-center delete-text">
                    <div className="ml4">Delete</div>
                </div>
            </Button>
        );
    };

    render() {
        const {
            visible,
            editAppointment,
            addAppointment,
            appointmentVisible = false,
            hideAppointment,
            payload: {canViewDetails = false} = {},
        } = this.props;
        const {disabledSubmit, submitting = false} = this.state;
        const {
            onClose,
            formatMessage,
            setFormRef,
            handleSubmit,
            FormWrapper,
            getDeleteButton,
        } = this;

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
                    onClose={
                        editAppointment || addAppointment ? hideAppointment : onClose
                    }
                    visible={
                        editAppointment || addAppointment ? appointmentVisible : visible
                    } // todo: change as per prop -> "visible", -- WIP --
                    width={"35%"}
                    title={
                        canViewDetails
                            ? formatMessage(messages.viewDetails)
                            : editAppointment
                                ? formatMessage(messages.appointment)
                                : addAppointment
                                    ? "Add Appointment"
                                    : formatMessage(messages.edit_appointment)
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
                        enableSubmit={this.enableSubmit}
                        {...this.props}
                        openScheduleHandler={this.openScheduleHandler}
                        loadingHandler={this.loadingHandler}
                    />
                    {/* <CalendarTimeSelection
                className="calendar-section wp60"
            /> */}
                    {/* </div> */}

                    {!canViewDetails && (
                        <Footer
                            className="flex justify-space-between"
                            onSubmit={handleSubmit}
                            onClose={
                                editAppointment || addAppointment ? hideAppointment : onClose
                            }
                            submitText={formatMessage(messages.submit_text)}
                            submitButtonProps={submitButtonProps}
                            cancelComponent={getDeleteButton()}
                            submitting={submitting}
                        />
                    )}
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

export default injectIntl(EditAppointment);

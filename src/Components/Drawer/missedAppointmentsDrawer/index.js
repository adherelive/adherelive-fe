import React, {Component, Fragment} from "react";
import {injectIntl} from "react-intl";
import { Drawer, message, Spin } from "antd";
import {USER_CATEGORY} from "../../../constant";
import messages from "./message";
import {getName} from "../../../Helper/validation";
import MissedAppointmentCard from "../../Cards/patient/missedAppointment";

class MissedAppointmentsDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            missed_appointments: {},
            criticalAppointmentIds: [],
            nonCriticalAppointmentIds: [],
            fetching: false,
        };
    }

    componentDidMount() {
        // this.handleGetMissedAppointments();
    }

    //   async handleGetMissedAppointments(){
    //     try {
    //         const {getAllMissedScheduleEvents} = this.props;
    //         this.setState({fetching:true});
    //         const response = await getAllMissedScheduleEvents();
    //         const { status, payload: {  data : {
    //            missed_appointments = {},
    //            appointment_ids : {critical=[],non_critical=[]} =  {}
    //         }  } = {} ,statusCode } =
    //         response || {};
    //
    //             if (status && statusCode === 200 ) {
    //                 this.setState({
    //                     missed_appointments:missed_appointments,
    //                     criticalAppointmentIds:critical,
    //                     nonCriticalAppointmentIds:non_critical,
    //                     fetching:false
    //               })
    //
    //             } else{
    //               this.setState({fetching:false});
    //             }
    //
    //     } catch (err) {
    //         console.log("err", err);
    //         message.warn(this.formatMessage(messages.somethingWentWrong));
    //         this.setState({fetching:false});
    //
    //     }
    //
    // }

    formatMessage = (data) => this.props.intl.formatMessage(data);

    onClose = () => {
        const {close} = this.props;
        close();
    };

    handlePatientDetailsRedirect = (patient_id) => (e) => {
        const {authenticated_category} = this.props;

        if (authenticated_category === USER_CATEGORY.PROVIDER) {
            return;
        }

        const {history} = this.props;
        this.onClose();
        history.push(`/patients/${patient_id}`);
    };

    getAppointmentList = () => {
        const { patients = {}, missed_appointments = {} } = this.props;
        const { handlePatientDetailsRedirect } = this;
        const appointmentList = [];
        const criticalList = [];
        const nonCriticalList = [];
        const timings = [];
        let type_description = "";
        let isCritical = false;
        let participant_id = "";

        for (let appointment in missed_appointments) {
            const eachAppointmentEventArray = missed_appointments[appointment];
            console.log("In the getAppointmentList eachAppointmentEventArray: ", eachAppointmentEventArray);

            for (let eachAppointmentEvent of eachAppointmentEventArray) {
                const {
                    critical,
                    start_time,
                    date: start_date,
                    details: {
                        basic_info: {
                            details: {
                                type_description: typeDescription = "",
                                type = "",
                            } = {},
                        } = {},
                        participant_one = {}, // Default to empty object if undefined
                        participant_two = {}, // Default to empty object if undefined
                    } = {},
                } = eachAppointmentEvent;

                console.log("In the getAppointmentList eachAppointmentEvent: ", eachAppointmentEvent);

                // Safely access participant_one and participant_two properties
                const participant_one_category = participant_one?.category || "";
                const participant_one_id = participant_one?.id || "";
                const participant_two_category = participant_two?.category || "";
                const participant_two_id = participant_two?.id || "";

                console.log("In the getAppointmentList participant_one_category: ", participant_one_category);

                // Determine participant_id based on category
                if (participant_one_category === USER_CATEGORY.PATIENT) {
                    participant_id = participant_one_id;
                } else if (participant_two_category === USER_CATEGORY.PATIENT) {
                    participant_id = participant_two_id;
                } else {
                    console.warn("No participant with PATIENT category found in appointment:", eachAppointmentEvent);
                    continue; // Skip this appointment if no valid participant is found
                }

                // Validate participant_id before accessing patients object
                if (!patients[participant_id]) {
                    console.warn(`Patient with ID ${participant_id} not found in patients object.`);
                    continue; // Skip this appointment
                }

                isCritical = critical;
                timings.push(start_time);
                type_description = typeDescription;

                // Safely destructure basic_info from patients[participant_id]
                const patient = patients[participant_id] || {};
                const {
                    basic_info: {
                        id: pId = "",
                        first_name = "",
                        middle_name = "",
                        last_name = "",
                    } = {},
                } = patient;

                let pName = `${first_name} ${getName(middle_name)} ${getName(last_name)}`;
                let treatment_type = type_description.length > 0 ? type_description : " ";

                if (isCritical) {
                    criticalList.push(
                        <MissedAppointmentCard
                            formatMessage={this.formatMessage}
                            name={pName}
                            time={timings}
                            treatment_type={treatment_type}
                            onClick={handlePatientDetailsRedirect(pId)}
                        />
                    );
                } else {
                    nonCriticalList.push(
                        <MissedAppointmentCard
                            formatMessage={this.formatMessage}
                            name={pName}
                            time={timings}
                            treatment_type={treatment_type}
                            onClick={handlePatientDetailsRedirect(pId)}
                        />
                    );
                }
            }
        }

        appointmentList.push(
            <div>
                <div>
                <span className="fs18 fw700 brown-grey tac mb20">
                    {this.formatMessage(messages.critical)}
                </span>
                    {criticalList.length > 0 ? (
                        criticalList
                    ) : (
                        <div className="mt10 mb10">
                            {this.formatMessage(messages.no_critical_missed)}
                        </div>
                    )}
                </div>
                <div>
                <span className="fs18 fw700 brown-grey tac">
                    {this.formatMessage(messages.non_critical)}
                </span>
                    {nonCriticalList.length > 0 ? (
                        nonCriticalList
                    ) : (
                        <div className="mt10 mb10">
                            {this.formatMessage(messages.no_non_critical_missed)}
                        </div>
                    )}
                </div>
            </div>
        );

        return appointmentList;
    };

    render() {
        const {visible = false, missedChartDrawerLoading} = this.props;
        const {fetching} = this.state;

        if (visible !== true) {
            return null;
        }
        return (
            <Fragment>
                <Drawer
                    title={this.formatMessage(messages.appointment_header)}
                    placement="right"
                    maskClosable={false}
                    onClose={this.onClose}
                    visible={visible}
                    width={`30%`}
                >
                    <div className="mt20 black-85 wp100">
                        {missedChartDrawerLoading ? (
                            <Spin size="small" className="flex align-center justify-center"/>
                        ) : (
                            this.getAppointmentList()
                        )}
                    </div>
                </Drawer>
            </Fragment>
        );
    }
}

export default injectIntl(MissedAppointmentsDrawer);

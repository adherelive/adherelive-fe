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
        const {patients = {}, missed_appointments = {}} = this.props;
        const {handlePatientDetailsRedirect} = this;
        const appointmentList = [];
        const criticalList = [];
        const nonCriticalList = [];

        for (let appointment in missed_appointments) {
            const eachAppointmentEventArray = missed_appointments[appointment];

            // Add a safety check if the array is empty or undefined
            if (!eachAppointmentEventArray || !eachAppointmentEventArray.length) {
                continue;
            }

            // Reset these for each appointment
            const timings = [];
            let type_description = "";
            let isCritical = false;
            let participant_id = "";

            for (let eachAppointmentEvent of eachAppointmentEventArray) {
                // Add safety checks for nested destructuring
                const {
                    critical = false,
                    start_time,
                    date: start_date,
                    details = {}
                } = eachAppointmentEvent || {};

                const {
                    basic_info = {},
                    participant_one = {},
                    participant_two = {}
                } = details;

                const {
                    details: {
                        type_description: typeDescription = "",
                        type = "",
                    } = {}
                } = basic_info;

                const {
                    category: participant_one_category = "",
                    id: participant_one_id = ""
                } = participant_one;

                const {
                    category: participant_two_category = "",
                    id: participant_two_id = ""
                } = participant_two;

                // Determine participant_id with additional safety checks
                if (participant_one_category === USER_CATEGORY.PATIENT && participant_one_id) {
                    participant_id = participant_one_id;
                } else if (participant_two_category === USER_CATEGORY.PATIENT && participant_two_id) {
                    participant_id = participant_two_id;
                } else {
                    // Skip this iteration if no valid patient ID is found
                    continue;
                }

                isCritical = critical;
                timings.push(start_time);
                type_description = typeDescription;

                // Look up patient details with safety check
                const patientDetails = patients[participant_id] || {};
                const {
                    basic_info: {
                        id: pId = "",
                        first_name = "",
                        middle_name = "",
                        last_name = "",
                    } = {}
                } = patientDetails;

                // TODO: Check why the patient information is not coming through
                // const {basic_info : {id : pId = '', first_name = '',middle_name = '',last_name = ''}}=patients[participant_id] || {};

                let pName = `${first_name} ${getName(middle_name)} ${getName(last_name)}`.trim();
                let treatment_type = type_description.length > 0 ? type_description : " ";

                // Create list items
                const appointmentCard = (
                    <MissedAppointmentCard
                        key={pId || Math.random()} // Add key to prevent React warnings
                        formatMessage={this.formatMessage}
                        name={pName}
                        time={timings}
                        treatment_type={treatment_type}
                        onClick={handlePatientDetailsRedirect(pId)}
                    />
                );

                if (isCritical) {
                    criticalList.push(appointmentCard);
                } else {
                    nonCriticalList.push(appointmentCard);
                }
            }
        }

        // Rest of the function remains the same...
        appointmentList.push(
            <div key="missed-appointments">
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

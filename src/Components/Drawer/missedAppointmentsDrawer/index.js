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

        console.log("getAppointmentList missed_appointments ---> ", missed_appointments);
        console.log("getAppointmentList patients ---> ", patients);

        for (let appointment in missed_appointments) {
            const eachAppointmentEventArray = missed_appointments[appointment];

            console.log("getAppointmentList eachAppointmentEventArray ---> ", eachAppointmentEventArray);

            // Safety check for empty array
            if (!eachAppointmentEventArray || !eachAppointmentEventArray.length) {
                continue;
            }

            eachAppointmentEventArray.forEach(eachAppointmentEvent => {
                const {
                    critical = false,
                    start_time,
                    date,
                    end_time,
                    details = {},
                    id: eventId
                } = eachAppointmentEvent || {};

                const {
                    actor = {}
                } = details;

                const {
                    id: actorId,
                    details: actorDetails = {},
                    user_role_id
                } = actor;

                const {
                    name: actorName = "",
                    category: actorCategory = ""
                } = actorDetails;

                // Assuming you want to handle only specific categories
                // Modify this logic based on your specific requirements
                if (actorCategory !== USER_CATEGORY.DOCTOR) {
                    // Skip non-patient events or handle differently
                    return;
                }

                // You might need to map the actor ID to a patient ID
                const participant_id = actorId;

                console.log("getAppointmentList participant_id ---> ", participant_id, eachAppointmentEvent);

                // Look up patient details
                // TODO: We are not getting the Patient details, so will be looking up the Doctor details
                const patientDetails = patients[participant_id] || {};
                const {
                    basic_info: {
                        id: pId = "",
                        first_name = "",
                        middle_name = "",
                        last_name = "",
                    } = {}
                } = patientDetails;

                let pName = `${first_name} ${getName(middle_name)} ${getName(last_name)}`.trim();

                const appointmentCard = (
                    <MissedAppointmentCard
                        key={eventId || Math.random()}
                        formatMessage={this.formatMessage}
                        name={pName || actorName}
                        time={[start_time]}
                        treatment_type={" "} // You might want to add logic to get treatment type
                        onClick={handlePatientDetailsRedirect(pId)}
                    />
                );

                if (critical) {
                    criticalList.push(appointmentCard);
                } else {
                    nonCriticalList.push(appointmentCard);
                }
            });
        }

        // Rest of the function remains the same as in the previous example
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

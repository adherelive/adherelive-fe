import React, {Component} from "react";
import {injectIntl} from "react-intl";
import moment from "../../../../Helper/moment";
import messages from "./messages";
import {EVENT_STATUS, EVENT_TYPE} from "../../../../constant";
import PropTypes from 'prop-types'; // Add prop validation

class PatientAlerts extends Component {
    static propTypes = {
        getLastVisitAlerts: PropTypes.func.isRequired,
        schedule_events: PropTypes.object.isRequired,
        symptoms: PropTypes.object.isRequired,
        intl: PropTypes.object.isRequired,
    };

    state = {
        loading: true,
        areEvents: false,
        last_visit: [],
        lastUpdated: null,
    };

    componentDidMount() {
        this.getAlertData();
    }

    getAlertData = async () => {
        try {
            this.setState({loading: true});
            const {getLastVisitAlerts} = this.props;
            const response = await getLastVisitAlerts();

            const {status, payload: {data: {last_visit = []} = {}} = {}} = response || {};
            if (!status) return;

            const latestTimestamp = last_visit.reduce((acc, curr) => {
                const currDate = curr && curr.updatedAt ? new Date(curr.updatedAt) : 0;
                return Math.max(acc, currDate);
            }, 0);

            this.setState({
                last_visit,
                areEvents: last_visit.length > 0,
                loading: false,
                lastUpdated: latestTimestamp || null,
            });

        } catch (error) {
            console.error('Error fetching alerts: ', error);
            this.setState({loading: false, areEvents: false});
        }
    };

    getBlankState = () => {
        const {intl: {formatMessage} = {}} = this.props;
        return (
            <div className="wp100 flex align-center justify-center pt20 pb20 fs20 fw500">
                {formatMessage(messages.blank_state_text)}
            </div>
        );
    };

    getGenericEvent = ({data, time}, typeConfig) => {
        const {status, details} = data || {};
        const itemName = (details &&
            details[typeConfig.detailsPath] &&
            details[typeConfig.detailsPath][typeConfig.idKey] &&
            details[typeConfig.detailsPath][typeConfig.idKey].basic_info &&
            details[typeConfig.detailsPath][typeConfig.idKey].basic_info.name) || '';

        return this.renderEvent({
            time,
            statusKey: status,
            successMessage: typeConfig.successMessage,
            warningMessage: typeConfig.warningMessage,
            additionalContent: `(${itemName})`,
        });
    };

    getSymptom = ({id, time}) => {
        const {symptoms} = this.props;
        const {text} = symptoms[id] || {};
        return this.renderEvent({
            time,
            statusKey: null,
            successMessage: messages.symptom_added_text,
            additionalContent: text,
        });
    };

    getMedication = (params) => this.getGenericEvent(params, {
        warningMessage: messages.missed_medication,
        successMessage: messages.taken_medication,
    });

    getAppointment = (params) => this.getGenericEvent(params, {
        warningMessage: messages.missed_appointment,
        successMessage: messages.completed_appointment,
    });

    getVitals = ({data, time}) => {
        const {details: {vital_templates: {basic_info: {name} = {}} = {}} = {}} = data || {};
        return this.renderEvent({
            time,
            statusKey: data?.status,
            successMessage: messages.completed_vital,
            warningMessage: messages.missed_vital,
            additionalContent: `(${name})`,
        });
    };

    getDiets = ({data, time}) => {
        const {details: {diets = {}, diet_id = null} = {}} = data || {};
        const {basic_info: {name = ""} = {}} = diets[diet_id] || {};
        return this.renderEvent({
            time,
            statusKey: data?.status,
            successMessage: messages.completed_diet,
            warningMessage: messages.missed_diet,
            additionalContent: `(${name})`,
        });
    };

    getWorkouts = ({data, time}) => {
        const {details: {workouts = {}, workout_id = null} = {}} = data || {};
        const {basic_info: {name = ""} = {}} = workouts[workout_id] || {};
        return this.renderEvent({
            time,
            statusKey: data?.status,
            successMessage: messages.completed_workout,
            warningMessage: messages.missed_workout,
            additionalContent: `(${name})`,
        });

    };

    // Unified event renderer to reduce duplication
    renderEvent = (config) => {
        const {formatMessage} = this.props.intl;
        const {time, statusKey, successMessage, warningMessage, additionalContent} = config;

        return (
            <div className="wp100 flex align-center pt10 pb10 pl6 pr6 tal">
                <div className={`wp30 pl16 fw600 ${statusKey === EVENT_STATUS.EXPIRED ? 'bl-warning-red' : 'bl-green'}`}>
                    {formatMessage(statusKey === EVENT_STATUS.EXPIRED ? warningMessage : successMessage)}
                </div>
                <div className="wp50 fw600">
                    {moment(time).format("DD MMM, YYYY")} ({moment(time).format("LT")})
                </div>
                {additionalContent && (
                    <div className="wp20 fw500 word-wrap">
                        {additionalContent}
                    </div>
                )}
            </div>
        );
    };

    renderLastUpdated = () => {
        const {lastUpdated} = this.state;
        const {formatMessage} = this.props.intl;

        if (!lastUpdated) return null;

        return (
            <div className="wp100 pl6 pt4 fs12 fw400 warm-grey">
                {formatMessage(messages.last_updated)}: {moment(lastUpdated).format("LLL")}
            </div>
        );
    };

    renderHeader = () => {
        const {intl: {formatMessage}} = this.props;
        const {last_visit} = this.state;

        return (
            <div className="wp100 pl6 pt10 pb10 flex align-center bb-light-grey">
                <div className="fs20 fw700">
                    {formatMessage(messages.alert_header)}
                </div>
                <div className="fs20 fw500 warm-grey ml4">
                    ({last_visit.length})
                </div>
                {this.renderLastUpdated()}
            </div>
        );
    };

    /**
     * This is the helper function for the 'getEvents', which fetches the vitals:
     * - Medication
     * - Appointments
     * - Actions
     * - Diets
     * - Workouts
     * for a given scheduled event ID, with a given time, that is obtained from the 'getEvents' call
     *
     * @param data
     * @param time
     * @returns {*}
     */
    getScheduleEvent = ({data, time}) => {
        const {getMedication, getVitals, getAppointment, getDiets, getWorkouts} = this;
        const {event_type} = data || {};

        switch (event_type) {
            case EVENT_TYPE.MEDICATION_REMINDER:
                return getMedication({data, time});
            case EVENT_TYPE.APPOINTMENT:
                return getAppointment({data, time});
            case EVENT_TYPE.VITALS:
                return getVitals({data, time});
            case EVENT_TYPE.DIET:
                return getDiets({data, time});
            case EVENT_TYPE.WORKOUT:
                return getWorkouts({data, time});
        }
    };

    /**
     * This function gathers and shows the alerts for the Patient page, since the last visit from the Doctor
     *
     *
     * @returns {*}
     */
    getEvents = () => {
        const {schedule_events} = this.props;
        const {last_visit} = this.state;
        console.log("Get Events -> last_visit array: ", {last_visit});

        const events = last_visit.map((details) => {
            const {event_type, id, updatedAt} = details || {};

            switch (event_type) {
                case EVENT_TYPE.SYMPTOMS:
                    return this.getSymptom({time: updatedAt, id});
                default:
                    return this.getScheduleEvent({
                        data: schedule_events[id],
                        time: updatedAt,
                    });
            }
        });

        return events;
    };

    render() {
        const {loading, areEvents} = this.state;
        const {getBlankState, getEvents} = this;

        if (loading) return null;

        return (
            <div className="br10 p10 wp100 bg-rosy-pink">
                {this.renderHeader()}
                {!areEvents ? getBlankState() : getEvents()}
            </div>
        );
    }
}

export default injectIntl(PatientAlerts);
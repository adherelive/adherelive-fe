import React, {Component, Fragment} from "react";
import {injectIntl} from "react-intl";
import { Drawer, message, Spin } from "antd";
import MissedMedicationCard from "../../Cards/patient/missedMedication";
import {USER_CATEGORY} from "../../../constant";

import messages from "./message";

class MissedMedicationsDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            missed_medications: {},
            criticalMedicationIds: [],
            nonCriticalMedicationIds: [],
            fetching: false,
        };
    }

    componentDidMount() {
        // this.getMissedMedication();
    }

    formatMessage = (data) => this.props.intl.formatMessage(data);

    onClose = () => {
        const {close} = this.props;
        close();
    };

    /**
     * TODO: Implement getMissedMedication
    getMissedMedication = async () => {
      try {
        const { getAllMissedScheduleEvents, missed_medications, medication_ids: {critical, non_critical} = {} } = this.props;
        this.setState({fetching:true});
        const response = await getAllMissedScheduleEvents();
        const {
          status,
          payload: {
            data: {
              missed_medications = {},
              medication_ids : {critical=[],non_critical=[]} =  {}
            }
          } = {},
          statusCode
        } = response || {};


        if (status && statusCode === 200) {
          this.setState({
            missed_medications: missed_medications,
            criticalMedicationIds: critical,
            nonCriticalMedicationIds: non_critical,
            // fetching:false
          });
        }else{
          this.setState({fetching:false})
        }
      } catch (err) {
        console.log("err", err);
        message.warn(this.formatMessage(messages.somethingWentWrong));
        this.setState({fetching:false});
      }
    };
     */

    handlePatientDetailsRedirect = (patient_id) => (e) => {
        console.log("Missed Medication handlePatientDetailsRedirect ---> patient_id: ", patient_id);
        const {authenticated_category} = this.props;

        if (authenticated_category === USER_CATEGORY.PROVIDER) {
            return;
        }

        const {history} = this.props;
        this.onClose();
        history.push(`/patients/${patient_id}`);
    };

    getFullNameAndPatientId(data) {
        if (!data) {
            return { fullName: "", patientId: null };
        }
        for (const patientId in data) {
            if (data.hasOwnProperty(patientId)) {
                const patient = data[patientId];
                const fullName = patient?.basic_info?.full_name || "";

                if (fullName) {
                    return { fullName, patientId };
                }
            }
        }
        return { fullName: "", patientId: null };
    }

    getMedicationList = () => {
        const {patients = {}, missed_medications = {}} = this.props;
        const {handlePatientDetailsRedirect, formatMessage} = this;

        const patient = this.getFullNameAndPatientId(patients);

        const medicationList = [];
        const criticalList = [];
        const nonCriticalList = [];

        Object.keys(missed_medications).forEach((id) => {
            const {
                critical,
                participant_id,
                medicines: { // {basic_info: {name: medicineName} = {}} = {}
                    basic_info: {
                        name: medicineName = "",
                        type: medicineType = "",
                    } = {},
                } = {},
                timings,
            } = missed_medications[id] || {};

            // TODO: Check why the JSON structure for the 'patients' is different from the 'missedDiet' drawer
            //       src/Components/Drawer/missedDietsDrawer/index.js
            // const {basic_info: {id: patientId, full_name} = {}} = patients[participant_id] || {};

            const medication = missed_medications[id] || {};

            // Get patient ID either from participant_id or another field
            // We need to verify where the patient ID is stored in the missed_medications object
            // const patientId = medication.participant_id || patients[participant_id] || id;

            // Access patient using the correct ID
            // const patient = patients[patientId];
            // const patientName = patient?.basic_info?.full_name || `Patient ID: ${patientId}`;

            const patientId = patient.patientId;
            const patientName = patient.fullName;

            console.log("Found patient original loop: ", patient, patientId, patientName);
            console.log("Missed Medication Drawer Medicine ID: ", missed_medications[id]);

            if (critical) {
                criticalList.push(
                    <MissedMedicationCard
                        formatMessage={formatMessage}
                        name={patientName}
                        time={timings}
                        medicineName={medicineName}
                        medicineType={medicineType}
                        onClick={handlePatientDetailsRedirect(patientId)}
                    />
                );
            } else {
                nonCriticalList.push(
                    <MissedMedicationCard
                        formatMessage={this.formatMessage}
                        name={patientName}
                        time={timings}
                        medicineName={medicineName}
                        medicineType={medicineType}
                        onClick={handlePatientDetailsRedirect(patientId)}
                    />
                );
            }
        });

        /**
         * TODO: Why is this commented out?
        for (let medication in missed_medications) {
          const eachMedicationEventArray = missed_medications[medication];
          for(let eachMedicationEvent of eachMedicationEventArray){

          const {
            critical:Critical,
            start_time,
            details:{
                medications: {
                    participant_id : participantId= ""
                } = {},
                medicines: {
                    basic_info: {
                        name: medicineName = "",
                        type: medicineType = ""
                    } = {}
                } = {}

            } = {},

          } = eachMedicationEvent || {};

          if(timings.indexOf(start_time) === -1) {
            timings.push(start_time);
          }
          participant_id=participantId;
          medicine_name=medicineName;
          medicine_type=medicineType;
          critical=Critical;
          }

          const {
            basic_info: {
              id: pId = "",
              first_name = "",
              middle_name = "",
              last_name = "",
                full_name = "",
            } = {}
          } = patients[participant_id] || {};

          let pName = `${first_name} ${getName(middle_name)} ${getName(last_name)}`;
          const isCritical=critical;

        }
         */

        medicationList.push(
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
        return medicationList;
    };

    // TODO: Add the Patient Name to the list of medicines shown in the drawer
    render() {
        const {visible = false, missedChartDrawerLoading} = this.props;
        const {fetching} = this.state;

        if (visible !== true) {
            return null;
        }
        return (
            <Fragment>
                <Drawer
                    title={this.formatMessage(messages.medication_header)}
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
                            this.getMedicationList()
                        )}
                    </div>
                </Drawer>
            </Fragment>
        );
    }
}

export default injectIntl(MissedMedicationsDrawer);

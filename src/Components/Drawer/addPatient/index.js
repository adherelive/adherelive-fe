import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Button, Drawer, Input, message, Radio, Select, Spin, Switch, } from "antd";
import moment from "moment";
import throttle from "lodash-es/throttle";

// antd components

import india from "../../../Assets/images/india.png";
import australia from "../../../Assets/images/australia.png";
import us from "../../../Assets/images/flag.png";
import uk from "../../../Assets/images/uk.png";
import russia from "../../../Assets/images/russia.png";
import germany from "../../../Assets/images/germany.png";
import southAfrica from "../../../Assets/images/south-africa.png";
import pakistan from "../../../Assets/images/pakistan.png";
import bangladesh from "../../../Assets/images/bangladesh.png";
import japan from "../../../Assets/images/japan.png";
import china from "../../../Assets/images/china.png";
import switzerland from "../../../Assets/images/switzerland.png";
import france from "../../../Assets/images/france.png";
import messages from "./message";
import "react-datepicker/dist/react-datepicker.css";
import TextArea from "antd/lib/input/TextArea";
import { PATIENT_CONSTANTS, } from "../../../constant";

import { MinusCircleOutlined, PlusCircleOutlined, PoweroffOutlined } from "@ant-design/icons";
import isEmpty from "../../../Helper/is-empty";

// code implementation after phase 1
import CustomSymptoms from "./CustomSymptoms";
import CustomDiagnosis from "./CustomDiagnosis";
import MultipleTreatmentAlert from "./MultipleTreatmentAlert";
import WidgetDrawer from "./WidgetDrawer";

const {Option} = Select;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const MALE = "m";
const FEMALE = "f";
const OTHER = "o";

class PatientDetailsDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile_number: "",
            name: "",
            patient_uid: "",
            gender: "",
            date_of_birth: "",
            treatment: "",
            severity: null,
            condition: 1,
            prefix: "91",
            fetchingCondition: false,
            fetchingTreatment: false,
            fetchingSeverity: false,
            fetchingPatients: false,
            comorbidities: "",
            allergies: "",
            clinical_notes: "",
            diagnosis_description: "",
            diagnosis_type: "2",
            patient_ids: [],
            isdisabled: true,
            selectedPatientId: null,
            addNewPatient: false,
            height: "",
            weight: "",
            symptoms: "",
            address: "",
            patients: {},
            isCollapse: false,
            // code implementation after phase 1
            widgetDrawerOpen: false,
            finalSymptomData: [],
            diagnosisType: false,
            his_id: "",
        };
        this.handleConditionSearch = throttle(
            this.handleConditionSearch.bind(this),
            2000
        );
        this.handleTreatmentSearch = throttle(
            this.handleTreatmentSearch.bind(this),
            2000
        );
        this.handleSeveritySearch = throttle(
            this.handleSeveritySearch.bind(this),
            2000
        );
        this.handleConditionSearch = throttle(
            this.handleConditionSearch.bind(this),
            2000
        );
        this.handlePatientSearch = throttle(
            this.handlePatientSearch.bind(this),
            2000
        );
    }

    componentDidMount() {}

    // code implementation after phase 1
    static getDerivedStateFromProps(nextProps, nextState) {
        if (nextProps.patientSearchData !== nextState.patientSearchData) {
            const {
                basic_info: {
                    first_name = "",
                    middle_name = "",
                    last_name = "",
                    gender = "",
                    height = "",
                    weight = "",
                    address = "",
                    full_name,
                    user_id = null,
                    uid = "",
                } = {},
                dob,
                details: {allergies = "", comorbidities = ""} = {},
            } = nextProps.patientSearchData.patients[
                nextProps.patientSearchData.patientId
                ] || {};
            const {
                basic_info: {
                    email = "",
                    mobile_number: user_mobile_numer = "",
                    prefix: user_prefix = "",
                } = {},
                his_id = "",
            } = nextProps.patientSearchData.users[user_id] || {};

            let date = new Date(dob);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let dt = date.getDate();

            if (dt < 10) {
                dt = "0" + dt;
            }
            if (month < 10) {
                month = "0" + month;
            }

            return {
                mobile_number: user_mobile_numer,
                gender,
                date_of_birth: moment(year + "-" + month + "-" + dt),
                height,
                weight,
                name: full_name,
                addNewPatient: false,
                isdisabled: true,
                allergies,
                comorbidities,
                address,
                patientSearchData: nextProps.patientSearchData,
                patient_uid: uid,
                his_id: his_id,
            };
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        // const { patients } = this.state;
        const {
            selectedPatientId,
            isdisabled,
            addNewPatient,
            mobile_number,
            patients,
        } = this.state;
        const {
            selectedPatientId: prev_selectedPatientId = null,
            addNewPatient: prev_addNewPatient,
        } = prevState;
        const {
            basic_info: {
                first_name = "",
                middle_name = "",
                last_name = "",
                gender = "",
                height = "",
                weight = "",
                address = "",
                full_name,
            } = {},
            dob,
            details: {allergies = "", comorbidities = ""} = {},
        } = patients[selectedPatientId] || {};

        const formattedDate = this.getFormattedDate(dob);

        if (
            selectedPatientId !== null &&
            selectedPatientId !== prev_selectedPatientId
        ) {
            this.setState({
                mobile_number,
                gender,
                date_of_birth: moment(formattedDate),
                height,
                weight,
                name: full_name,
                addNewPatient: false,
                isdisabled: true,
                allergies,
                comorbidities,
                address,
            });
        }

        if (addNewPatient && addNewPatient !== prev_addNewPatient) {
            this.setState({
                isdisabled: false,
                selectedPatientId: null,
                // patient_ids:[],
                name: "",
                gender: "",
                date_of_birth: "",
                treatment: "",
                severity: null,
                condition: 1,
                prefix: "91",
                fetchingCondition: false,
                fetchingTreatment: false,
                fetchingSeverity: false,
                fetchingPatients: false,
                comorbidities: "",
                allergies: "",
                clinical_notes: "",
                diagnosis_description: "",
                diagnosis_type: "2",
                addNewPatient: false,
                height: "",
                weight: "",
                symptoms: "",
                address: "",
                his_id: "",
            });
        }
    }

    setComorbiditiesNone = (e) => {
        e.preventDefault();
        const {comorbidities = ""} = this.state;
        if (comorbidities === "none") {
            this.setState({comorbidities: ""});
            return;
        }
        this.setState({comorbidities: "none"});
    };

    setAllergiesNone = (e) => {
        e.preventDefault();
        const {allergies = ""} = this.state;
        if (allergies === "none") {
            this.setState({allergies: ""});
            return;
        }
        this.setState({allergies: "none"});
    };

    getFormattedDate = (dob) => {
        let date = new Date(dob);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = "0" + dt;
        }
        if (month < 10) {
            month = "0" + month;
        }

        return year + "-" + month + "-" + dt;
    };

    setPrefix = (value) => {
        this.setState({prefix: value});
    };

    setNumber = (e) => {
        const {value} = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
            this.setState({mobile_number: e.target.value});
            if (value.length === 10) {
                {
                    this.handlePatientSearch(value);
                }
            } else {
                this.setState({
                    patient_ids: [],
                });
            }
        } else {
            this.setState({
                patient_ids: [],
            });
        }
    };

    async handlePatientSearch(data) {
        try {
            if (data) {
                this.setState({fetchingPatients: true});
                const {searchPatientFromNum} = this.props;
                const response = await searchPatientFromNum(data);
                const {
                    status,
                    payload: {
                        data: {patient_ids: response_patient_ids = [], patients},
                    } = {},
                } = response || {};
                // console.log("Patient search Response =====>",response);
                if (status) {
                    if (response_patient_ids.length > 0) {
                        this.setState({
                            patient_ids: response_patient_ids,
                            fetchingPatients: false,
                            patients,
                        });
                    } else {
                        this.setState({
                            patient_ids: [],
                            fetchingPatients: false,
                        });
                    }
                } else {
                    this.setState({fetchingPatients: false});
                }
            } else {
                this.setState({fetchingPatients: false});
            }
        } catch (err) {
            console.log("err", err);
            message.warn(this.formatMessage(messages.somethingWentWrong));
            this.setState({fetchingPatients: false});
        }
    }

    getPatientOptions = () => {
        const {patient_ids, patients} = this.state;
        let options = [];
        options.push(
            <Option
                key={"new-patient-opt"}
                onClick={this.setAddnewPatient}
                value={null}
            >
                {this.formatMessage(messages.addNewPatient)}
            </Option>
        );

        for (let id of patient_ids) {
            const {
                basic_info: {
                    first_name,
                    middle_name,
                    last_name,
                    full_name: patient_full_name,
                } = {},
            } = patients[id] || {};

            let full_name = patient_full_name;
            if (
                !patient_full_name ||
                patient_full_name === "" ||
                patient_full_name === null
            ) {
                full_name = `AdhereLive Patient: ${id}`;
            }
            options.push(
                <Option
                    key={id}
                    value={id}
                    name={full_name}
                    className={`${
                        !patient_full_name ||
                        patient_full_name === "" ||
                        patient_full_name === null
                            ? "italic fw600"
                            : ""
                    }`}
                >
                    {full_name}
                </Option>
            );
        }

        return options;
    };

    setAddnewPatient = () => {
        this.setState({
            addNewPatient: true,
        });
    };

    setSearchedPatientId = (value) => {
        this.setState({selectedPatientId: value});
    };

    getGenderOptions = () => {
        const genderes = [
            {name: "Female", value: "f"},
            {name: "Male", value: "m"},
            {name: "Other", value: "o"},
        ];
        let options = [];

        for (let id = 0; id < genderes.length; ++id) {
            const {name, value} = genderes[id];
            options.push(
                <Option key={id} value={value} name={name}>
                    {name}
                </Option>
            );
        }
        return options;
    };

    setName = (e) => {
        const {value} = e.target;
        const reg = /^[a-zA-Z][a-zA-Z\s]*$/;
        if (reg.test(value) || value === "") {
            this.setState({name: e.target.value});
        }
    };

    setPid = (e) => {
        const {value} = e.target;
        this.setState({patient_uid: value.trim()});
    };

    setComorbidities = (e) => {
        const value = e.target.value.trim();

        if (value.length > 0 || value === "") {
            this.setState({comorbidities: e.target.value});
        }
    };

    setPastedComorbidities = (e) => {
        e.preventDefault();
        let pastedValue = "";
        if (typeof e.clipboardData !== "undefined") {
            pastedValue = e.clipboardData.getData("text").trim();
        }
        if (pastedValue.length > 0 || pastedValue === "") {
            this.setState({comorbidities: pastedValue});
        }
    };

    setClinicalNotes = (e) => {
        const value = e.target.value.trim();

        if (value.length > 0 || value === "") {
            this.setState({clinical_notes: e.target.value});
        }
    };

    setSymptoms = (e) => {
        const value = e.target.value.trim();

        if (value.length > 0 || value === "") {
            this.setState({symptoms: e.target.value});
        }
    };

    setAddress = (e) => {
        const value = e.target.value.trim();

        if (value.length > 0 || value === "") {
            this.setState({address: e.target.value});
        }
    };

    setPastedClinicalNotes = (e) => {
        e.preventDefault();
        let pastedValue = "";
        if (typeof e.clipboardData !== "undefined") {
            pastedValue = e.clipboardData.getData("text").trim();
        }
        if (pastedValue.length > 0 || pastedValue === "") {
            this.setState({clinical_notes: pastedValue});
        }
    };

    setPastedSymptoms = (e) => {
        e.preventDefault();
        let pastedValue = "";
        if (typeof e.clipboardData !== "undefined") {
            pastedValue = e.clipboardData.getData("text").trim();
        }
        if (pastedValue.length > 0 || pastedValue === "") {
            this.setState({symptoms: pastedValue});
        }
    };

    setAllergies = (e) => {
        const value = e.target.value.trim();

        if (value.length > 0 || value === "") {
            this.setState({allergies: e.target.value});
        }
    };

    setPastedAllergies = (e) => {
        e.preventDefault();
        let pastedValue = "";
        if (typeof e.clipboardData !== "undefined") {
            pastedValue = e.clipboardData.getData("text").trim();
        }
        if (pastedValue.length > 0 || pastedValue === "") {
            this.setState({allergies: pastedValue});
        }
    };

    setDiagnosis = (e) => {
        const value = e.target.value.trim();

        if (value.length > 0 || value === "") {
            this.setState({diagnosis_description: e.target.value});
        }
    };

    setPastedDiagnosis = (e) => {
        e.preventDefault();
        let pastedValue = "";
        if (typeof e.clipboardData !== "undefined") {
            pastedValue = e.clipboardData.getData("text").trim();
        }
        if (pastedValue.length > 0 || pastedValue === "") {
            this.setState({diagnosis_description: pastedValue});
        }
    };

    // code implementation after phase 1 for CDSS/mongodb

    onDiagnosisSearchHanlder = (value) => {
        this.props.diagnosisSearch(value);
    };

    handleDiagnosisChanges = (value) => {
        console.log(`selected ${value}`);

        this.setState({diagnosis_description: value});
    };

    handleSymptomsChanges = (value) => {
        this.props.getDiagnosisList(value);
        console.log(`selected ${value}`);

        this.setState({symptoms: value});
    };

    handleSymptomSelect = (value) => {
        console.log(`selected ${value}`);
        if (!isEmpty(value)) {
            let data = this.state.finalSymptomData;
            let symptomObject = {
                symptomName: value,
                bodyParts: ["Generalised"],
                duration: "1 Day",
            };
            data.push(symptomObject);

            this.setState({
                widgetDrawerOpen: true,
                finalSymptomData: data,
                selectedSymptom: value,
            });
        }
    };

    hendleSymptomDeselect = (value) => {
        console.log(`deselected ${value}`);
        let data = this.state.finalSymptomData;
        var filteredArray = data.filter((ele) => ele.symptomName !== value);

        this.setState({
            finalSymptomData: filteredArray,
        });
    };

    generateFinalSymptomData = (data) => {
        console.log("finalSymptomData", data);
        this.setState({
            finalSymptomData: data,
        });
    };

    handleSelectSymptom = (selectedSymptom) => {
        this.setState({
            selectedSymptom: selectedSymptom,
        });
    };

    openEditWidgetHandler = () => {
        this.setState({
            widgetDrawerOpen: true,
            EditWidget: true,
        });
    };

    setDiagnosisType = (value) => {
        this.setState({diagnosis_type: value});
    };

    onDiagnosisTypeChange = (value) => {
        this.setState({
            diagnosisType: value,
        });
    };

    setTreatment = (value) => {
        this.setState({treatment: value});
    };

    setSeverity = (value) => {
        this.setState({severity: value});
    };

    setCondition = async (value) => {
        const {searchTreatment} = this.props;
        this.setState({condition: value});

        const response = await searchTreatment(value);

        const {
            status,
            payload: {data: {treatments = {}} = {}, message} = {},
        } = response;
        if (status) {
            this.setState({treatments, treatment: ""});
        }
    };

    setGender = (value) => () => {
        this.setState({gender: value});
    };

    setDOB = (e) => {
        this.setState({date_of_birth: moment(e.target.value)});
    };

    getTreatmentOption = () => {
        let {treatments = {}} = this.props;
        let newTreatments = [];
        for (let treatment of Object.values(treatments)) {
            let {basic_info: {id = 0, name = ""} = {}} = treatment;
            newTreatments.push(
                <Option key={id} value={id}>
                    {name}
                </Option>
            );
        }
        return newTreatments;
    };

    getSeverityOption = () => {
        let {severity = {}} = this.props;
        let newSeverity = [];
        for (let sev of Object.values(severity)) {
            let {basic_info: {id = 0, name = ""} = {}} = sev;
            newSeverity.push(
                <Option key={id} value={id}>
                    {name}
                </Option>
            );
        }
        return newSeverity;
    };

    getConditionOption = () => {
        let {conditions = {}} = this.props;
        let newConditions = [];
        for (let condition of Object.values(conditions)) {
            let {basic_info: {id = 0, name = ""} = {}} = condition;
            newConditions.push(
                <Option key={id} value={id}>
                    {name}
                </Option>
            );
        }
        return newConditions;
    };

    async handleConditionSearch(data) {
        try {
            if (data) {
                const {searchCondition} = this.props;
                this.setState({fetchingCondition: true});
                const response = await searchCondition(data);
                const {status, payload: {data: responseData, message} = {}} =
                    response;
                if (status) {
                    this.setState({fetchingCondition: false});
                } else {
                    this.setState({fetchingCondition: false});
                }
            } else {
                this.setState({fetchingCondition: false});
            }
        } catch (err) {
            console.log("err", err);
            message.warn(this.formatMessage(messages.somethingWentWrong));
            this.setState({fetchingCondition: false});
        }
    }

    async handleTreatmentSearch(data) {
        try {
            if (data) {
                const {searchTreatment} = this.props;
                this.setState({fetchingTreatment: true});
                const response = await searchTreatment(data);
                const {status, payload: {data: treatments, message} = {}} =
                    response;
                if (status) {
                    this.setState({fetchingTreatment: false});
                } else {
                    this.setState({fetchingTreatment: false});
                }
            } else {
                this.setState({fetchingTreatment: false});
            }
        } catch (err) {
            console.log("err", err);
            message.warn(this.formatMessage(messages.somethingWentWrong));
            this.setState({fetchingCondition: false});
        }
    }

    async handleSeveritySearch(data) {
        try {
            if (data) {
                const {searchSeverity} = this.props;
                this.setState({fetchingSeverity: true});
                const response = await searchSeverity(data);
                const {status} = response;
                if (status) {
                    this.setState({fetchingSeverity: false});
                } else {
                    this.setState({fetchingSeverity: false});
                }
            } else {
                this.setState({fetchingSeverity: false});
            }
        } catch (err) {
            console.log("err", err);
            message.warn(this.formatMessage(messages.somethingWentWrong));
            this.setState({fetchingSeverity: false});
        }
    }

    setHeight = (e) => {
        const {value} = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (value === "") {
            this.setState({height: value});
        } else {
            if ((!isNaN(value) && reg.test(value)) || value === "-") {
                if (
                    parseFloat(value) <= PATIENT_CONSTANTS.MAX_HEIGHT_ALLOWED &&
                    parseFloat(value) > 0
                ) {
                    this.setState({height: value});
                } else {
                    message.warn(this.formatMessage(messages.heightWarnText));
                }
            }
        }
    };

    setWeight = (e) => {
        const {value} = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (value === "") {
            this.setState({weight: value});
        } else {
            if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
                if (
                    parseFloat(value) <= PATIENT_CONSTANTS.MAX_WEIGHT_ALLOWED &&
                    parseFloat(value) > 0
                ) {
                    this.setState({weight: value});
                } else {
                    message.warn(this.formatMessage(messages.weightWarnText));
                }
            }
        }
    };

    generateRandomMobileNumber = async (e) => {
        const {searchPatientFromNum} = this.props;
        let randomNumber = `00${parseInt(
            Math.floor(Math.random() * (19999999 - 10000000 + 1)) + 10000000
        )}`;
        const response = await searchPatientFromNum(randomNumber);
        const {status, payload: {data: {patients}} = {}} = response || {};

        if (isEmpty(patients)) {
            this.setState({
                mobile_number: randomNumber,
            });
        } else {
            this.setState({
                mobile_number: `00${parseInt(
                    Math.floor(Math.random() * (19999999 - 10000000 + 1)) + 10000000
                )}`,
            });
        }
    };

    collpaseHanlder = (label) => {
        this.setState({
            isCollapse: label,
        });
    };

    renderAddPatient = () => {
        let dtToday = new Date();

        let month = dtToday.getMonth() + 1;
        let day = dtToday.getDate();
        let year = dtToday.getFullYear();

        if (day < 10) {
            day = "0" + day;
        } else if (month < 10) {
            month = "0" + month;
        }

        const {
            fetchingPatients = false,
            mobile_number = "",
            name = "",
            patient_uid = "",
            // condition = null,
            date_of_birth = "",
            prefix = "",
            allergies = "",
            comorbidities = "",
            gender = "",
            diagnosis_description = "",
            clinical_notes = "",
            diagnosis_type = "2",
            // isdisabled,
            // addNewPatient,
            severity = "",
            treatment = "",
            height = "",
            weight = "",
            symptoms = "",
            address = "",
            isCollapse = "",
            his_id = "",
        } = this.state;

        const prefixSelector = (
            <Select
                className="flex align-center h50 w80"
                value={prefix}
                onChange={this.setPrefix}
            >
                {/* india */}
                <Option value="91">
                    <div className="flex align-center">
                        <img src={india} className="w16 h16"/>{" "}
                        <div className="ml4">+91</div>
                    </div>
                </Option>
                {/* australia */}
                <Option value="61">
                    <div className="flex align-center">
                        <img src={australia} className="w16 h16"/>{" "}
                        <div className="ml4">+61</div>
                    </div>
                </Option>
                {/* us */}
                <Option value="1">
                    <div className="flex align-center">
                        <img src={us} className="w16 h16"/>
                        <div className="ml4">+1</div>
                    </div>
                </Option>
                {/* uk */}
                <Option value="44">
                    <div className="flex align-center">
                        <img src={uk} className="w16 h16"/>
                        <div className="ml4">+44</div>
                    </div>
                </Option>
                {/* china */}
                <Option value="86">
                    <div className="flex align-center">
                        <img src={china} className="w16 h16"/>{" "}
                        <div className="ml4">+86</div>
                    </div>
                </Option>
                {/* japan */}
                <Option value="81">
                    <div className="flex align-center">
                        <img src={japan} className="w16 h16"/>{" "}
                        <div className="ml4">+81</div>
                    </div>
                </Option>
                {/* germany */}
                <Option value="49">
                    <div className="flex align-center">
                        <img src={germany} className="w16 h16"/>{" "}
                        <div className="ml4">+49</div>
                    </div>
                </Option>
                {/* france */}
                <Option value="33">
                    <div className="flex align-center">
                        <img src={france} className="w16 h16"/>{" "}
                        <div className="ml4">+33</div>
                    </div>
                </Option>
                {/* switzerland */}
                <Option value="41">
                    <div className="flex align-center">
                        <img src={switzerland} className="w16 h16"/>{" "}
                        <div className="ml4">+41</div>
                    </div>
                </Option>

                {/* russia */}
                <Option value="7">
                    <div className="flex align-center">
                        <img src={russia} className="w16 h16"/>{" "}
                        <div className="ml4">+7</div>
                    </div>
                </Option>
                {/* south africa */}
                <Option value="27">
                    <div className="flex align-center">
                        <img src={southAfrica} className="w16 h16"/>{" "}
                        <div className="ml4">+27</div>
                    </div>
                </Option>
                {/* pakistan */}
                <Option value="92">
                    <div className="flex align-center">
                        <img src={pakistan} className="w16 h16"/>{" "}
                        <div className="ml4">+92</div>
                    </div>
                </Option>
                {/* bangladesh */}
                <Option value="880">
                    <div className="flex align-center">
                        <img src={bangladesh} className="w16 h16"/>{" "}
                        <div className="ml4">+880</div>
                    </div>
                </Option>
            </Select>
        );

        const spin = (
            <div className="mh40 mw40 flex direction-column align-center justify-center">
                {fetchingPatients ? <Spin size="small"/> : null}
            </div>
        );

        let existingDOB = moment(date_of_birth).format("YYYY-MM-DD");

        return (
            <div className="form-block-ap addEdit-patient-drawer-container">
                <div className="form-headings flex align-center ">
                    <div className="wp100 flex justify-space-between">
                        <div>
                            {this.formatMessage(messages.phoneNo)}
                            <span className="star-red">*</span>
                        </div>
                        <Button
                            onClick={this.generateRandomMobileNumber}
                            type="ghost"
                            // className="ml140"
                            //
                        >
                            Don't have number ?
                        </Button>
                    </div>
                </div>

                <Input
                    addonBefore={prefixSelector}
                    className={"form-inputs-ap add-patient-phone"}
                    placeholder={this.formatMessage(messages.phoneNo)}
                    minLength={6}
                    maxLength={12}
                    value={mobile_number}
                    onChange={this.setNumber}
                    addonAfter={fetchingPatients ? spin : null}
                />

                <div>
                    {/* <Button type="ghost" onClick={this.setAddnewPatient} className="mauto" >Add New Patient</Button> */}

                    <Select
                        className="form-inputs-ap drawer-select"
                        placeholder="Select Name"
                        value={this.state.selectedPatientId}
                        onChange={this.setSearchedPatientId}
                        notFoundContent={
                            fetchingPatients ? <Spin size="small"/> : "No match found"
                        }
                        // showSearch
                        // autoFocus
                        autoComplete="off"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {this.getPatientOptions()}
                    </Select>
                </div>

                <div className="form-headings-ap ">
                    {this.formatMessage(messages.name)}
                </div>
                <Input
                    placeholder={this.formatMessage(messages.name)}
                    value={name}
                    className={"form-inputs-ap"}
                    onChange={this.setName}
                    // disabled={isdisabled}
                />

                <div className="form-headings-ap">
                    {this.formatMessage(messages.gender)}
                </div>
                <div className="add-patient-radio wp100 mt6 mb18 flex">
                    <Radio.Group buttonStyle="solid" value={gender}>
                        {" "}
                        {/*disabled = {isdisabled}*/}
                        <Radio.Button value={MALE} onClick={this.setGender(MALE)}>
                            M
                        </Radio.Button>
                        <Radio.Button value={FEMALE} onClick={this.setGender(FEMALE)}>
                            F
                        </Radio.Button>
                        <Radio.Button value={OTHER} onClick={this.setGender(OTHER)}>
                            O
                        </Radio.Button>
                    </Radio.Group>
                </div>

                <div className="form-headings-ap flex align-center justify-start">
                    {this.formatMessage(messages.dob)}
                    <div className="star-red">*</div>
                </div>

                {/*{isdisabled ? (*/}
                {/*  <Input*/}
                {/*    className={"form-inputs-ap"}*/}
                {/*    placeholder={`${date_of_birth ? existingDOB : "dd/mm/yyyy"}`}*/}
                {/*    max={`${year}-${month}-${day}`}*/}
                {/*    // disabled={true}*/}
                {/*    type="date"*/}
                {/*  />*/}
                {/*) : (*/}

                {/*todo: need to check bug with value and defaultValue*/}
                <Input
                    className={"form-inputs-ap"}
                    type="date"
                    value={existingDOB}
                    // defaultValue={existingDOB}
                    max={`${year}-${month}-${day}`}
                    onChange={this.setDOB}
                    // disabled={isdisabled}
                />
                {/*)}*/}

                <div className="form-headings-ap flex align-center justify-space-between mt10 mb10">
                    {this.formatMessage(messages.pid)}
                    <div>
                        {isCollapse === "pid" ? (
                            <MinusCircleOutlined onClick={() => this.collpaseHanlder("")}/>
                        ) : (
                            <PlusCircleOutlined onClick={() => this.collpaseHanlder("pid")}/>
                        )}
                    </div>
                </div>
                {isCollapse === "pid" && (
                    <Input
                        placeholder={this.formatMessage(messages.pid)}
                        value={patient_uid}
                        className={"form-inputs-ap"}
                        onChange={this.setPid}
                        disabled={!his_id ? false : true}
                    />
                )}

                <div className="form-headings-ap flex align-center justify-space-between mt10 mb10">
                    {this.formatMessage(messages.address)}
                    <div>
                        {isCollapse === "address" ? (
                            <MinusCircleOutlined onClick={() => this.collpaseHanlder("")}/>
                        ) : (
                            <PlusCircleOutlined
                                onClick={() => this.collpaseHanlder("address")}
                            />
                        )}
                    </div>
                </div>
                {isCollapse === "address" && (
                    <TextArea
                        placeholder={this.formatMessage(messages.writeHere)}
                        value={address}
                        className={"form-textarea-ap form-inputs-ap "}
                        onChange={this.setAddress}
                        // disabled={isdisabled}
                        style={{resize: "none"}}
                    />
                )}

                <div className="form-headings-ap  flex align-center justify-space-between mt10 mb10">
                    {this.formatMessage(messages.height)}
                    <div>
                        {isCollapse === "height" ? (
                            <MinusCircleOutlined onClick={() => this.collpaseHanlder("")}/>
                        ) : (
                            <PlusCircleOutlined
                                onClick={() => this.collpaseHanlder("height")}
                            />
                        )}
                    </div>
                </div>
                {isCollapse === "height" && (
                    <Input
                        className={"form-inputs-ap add-patient-height-field"}
                        type={"number"}
                        placeholder={this.formatMessage(messages.height_placeholder)}
                        value={height}
                        onChange={this.setHeight}
                        max={PATIENT_CONSTANTS.MAX_HEIGHT_ALLOWED}
                        suffix={"cm"}
                    />
                )}

                <div className="form-headings-ap flex align-center justify-space-between mt10 mb10">
                    {this.formatMessage(messages.weight)}
                    <div>
                        {isCollapse === "weight" ? (
                            <MinusCircleOutlined onClick={() => this.collpaseHanlder("")}/>
                        ) : (
                            <PlusCircleOutlined
                                onClick={() => this.collpaseHanlder("weight")}
                            />
                        )}
                    </div>
                </div>
                {isCollapse === "weight" && (
                    <Input
                        type={"number"}
                        className={"form-inputs-ap add-patient-height-field"}
                        placeholder={this.formatMessage(messages.weight_placeholder)}
                        value={weight}
                        onChange={this.setWeight}
                        max={PATIENT_CONSTANTS.MAX_WEIGHT_ALLOWED}
                        suffix={"kg"}
                    />
                )}

                <div className="form-headings-ap flex align-center justify-space-between mt10 mb10">
                    <div className="flex direction-row flex-grow-1">
                        {this.formatMessage(messages.comorbidities)}
                    </div>
                    {isCollapse === "comorbidities" && (
                        <div className="flex-grow-0">
                            <RadioGroup
                                className="flex justify-content-end "
                                buttonStyle="solid"
                                value={comorbidities}
                            >
                                <RadioButton value={"none"} onClick={this.setComorbiditiesNone}>
                                    {this.formatMessage(messages.none)}
                                </RadioButton>
                            </RadioGroup>
                        </div>
                    )}
                    <div>
                        {isCollapse === "comorbidities" ? (
                            <MinusCircleOutlined onClick={() => this.collpaseHanlder("")}/>
                        ) : (
                            <PlusCircleOutlined
                                onClick={() => this.collpaseHanlder("comorbidities")}
                            />
                        )}
                    </div>
                </div>
                {isCollapse === "comorbidities" && (
                    <TextArea
                        placeholder={this.formatMessage(messages.writeHere)}
                        value={comorbidities}
                        className={"form-textarea-ap form-inputs-ap"}
                        onChange={this.setComorbidities}
                        onPaste={this.setPastedComorbidities}
                        // disabled={isdisabled}
                        style={{resize: "none"}}
                    />
                )}

                <div className="form-headings-ap flex align-center justify-space-between mt10 mb10">
                    <div className="flex direction-row flex-grow-1">
                        {this.formatMessage(messages.allergies)}
                    </div>
                    {isCollapse === "allergies" && (
                        <div className="flex-grow-0">
                            <RadioGroup
                                className="flex justify-content-end "
                                buttonStyle="solid"
                                value={allergies}
                            >
                                <RadioButton value={"none"} onClick={this.setAllergiesNone}>
                                    {this.formatMessage(messages.none)}
                                </RadioButton>
                            </RadioGroup>
                        </div>
                    )}

                    <div>
                        {isCollapse === "allergies" ? (
                            <MinusCircleOutlined onClick={() => this.collpaseHanlder("")}/>
                        ) : (
                            <PlusCircleOutlined
                                onClick={() => this.collpaseHanlder("allergies")}
                            />
                        )}
                    </div>
                </div>
                {isCollapse === "allergies" && (
                    <TextArea
                        placeholder={this.formatMessage(messages.writeHere)}
                        value={allergies}
                        className={"form-textarea-ap form-inputs-ap"}
                        onChange={this.setAllergies}
                        onPaste={this.setPastedAllergies}
                        // disabled={isdisabled}
                        style={{resize: "none"}}
                    />
                )}

                <div className="form-category-headings-ap">
                    {this.formatMessage(messages.treatmentPlan)}
                </div>

                {/* code implementation after phase 1 */}

                <div className="form-headings-ap flex align-center justify-space-between">
                    {this.formatMessage(messages.symptoms)}
                    {!isEmpty(this.state.finalSymptomData) && (
                        <div className="add-more" onClick={this.openEditWidgetHandler}>
                            {/* {this.formatMessage(messages.addMore)} */}
                            Edit
                        </div>
                    )}
                </div>

                <CustomSymptoms
                    handleSymptomsChanges={this.handleSymptomsChanges}
                    handleSymptomSelect={this.handleSymptomSelect}
                    hendleSymptomDeselect={this.hendleSymptomDeselect}
                />

                <div className="form-headings-ap flex  justify-space-between ">
                    <div className="flex direction-column align-center justify-center">
                        <div className="flex direction-row " key="diagnosis-h">
                            {this.formatMessage(messages.diagnosis)}
                            <div className="star-red">*</div>
                        </div>
                    </div>
                    <div>
                        <div className="probable-swicth">
                            <p
                                className={
                                    !this.state.diagnosisType
                                        ? "probable-text active-text"
                                        : "probable-text"
                                }
                            >
                                Probable
                            </p>
                            <Switch
                                defaultChecked={false}
                                checked={this.state.diagnosisType}
                                onChange={this.onDiagnosisTypeChange}
                            />
                            <p
                                className={
                                    this.state.diagnosisType
                                        ? "final-text active-text"
                                        : "final-text"
                                }
                            >
                                Final
                            </p>
                        </div>
                        {/* <Select
              key={`diagnonsis-${diagnosis_type}`}
              value={diagnosis_type}
              onChange={this.setDiagnosisType}
            >
              <Option
                value={DIAGNOSIS_TYPE[FINAL].diagnosis_type}
                key={`final-${DIAGNOSIS_TYPE[FINAL].diagnosis_type}`}
              >
                {DIAGNOSIS_TYPE[FINAL].value}
              </Option>

              <Option
                value={DIAGNOSIS_TYPE[PROBABLE].diagnosis_type}
                key={`probable-${DIAGNOSIS_TYPE[PROBABLE].diagnosis_type}`}
              >
                {DIAGNOSIS_TYPE[PROBABLE].value}
              </Option>
            </Select> */}
                    </div>
                </div>
                <CustomDiagnosis
                    handleDiagnosisChanges={this.handleDiagnosisChanges}
                    onDiagnosisSearchHanlder={this.onDiagnosisSearchHanlder}
                />

                {/* <TextArea
          placeholder={this.formatMessage(messages.writeHere)}
          value={diagnosis_description}
          className={"form-textarea-ap form-inputs-ap"}
          onChange={this.setDiagnosis}
          onPaste={this.setPastedDiagnosis}
          style={{ resize: "none" }}
        /> */}

                <div className="form-headings-ap flex align-center justify-start">
                    {this.formatMessage(messages.treatment)}
                    <div className="star-red">*</div>
                </div>

                <Select
                    className="form-inputs-ap drawer-select"
                    placeholder="Select Treatment"
                    value={treatment}
                    onChange={this.setTreatment}
                    notFoundContent={
                        this.state.fetchingTreatment ? (
                            <Spin size="small"/>
                        ) : (
                            "No match found"
                        )
                    }
                    showSearch
                    // onSearch={this.handleTreatmentSearch}
                    autoComplete="off"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    }
                >
                    {this.getTreatmentOption()}
                </Select>

                <div className="form-headings-ap flex align-center justify-space-between mt10 mb10">
                    {this.formatMessage(messages.clinicalNotes)}
                    <div>
                        {isCollapse === "clinicalNotes" ? (
                            <MinusCircleOutlined onClick={() => this.collpaseHanlder("")}/>
                        ) : (
                            <PlusCircleOutlined
                                onClick={() => this.collpaseHanlder("clinicalNotes")}
                            />
                        )}
                    </div>
                </div>
                {isCollapse === "clinicalNotes" && (
                    <TextArea
                        placeholder={this.formatMessage(messages.writeHere)}
                        value={clinical_notes}
                        className={"form-textarea-ap form-inputs-ap"}
                        onChange={this.setClinicalNotes}
                        onPaste={this.setPastedClinicalNotes}
                        style={{resize: "none"}}
                    />
                )}

                {/* <div className="form-headings-ap flex align-center justify-space-between mt10 mb10">
          {this.formatMessage(messages.symptoms)}
          <div>
            {isCollapse === "symptoms" ? (
              <MinusCircleOutlined onClick={() => this.collpaseHanlder("")} />
            ) : (
              <PlusCircleOutlined
                onClick={() => this.collpaseHanlder("symptoms")}
              />
            )}
          </div>
        </div>
        {isCollapse === "symptoms" && (
          <TextArea
            placeholder={this.formatMessage(messages.writeHere)}
            value={symptoms}
            className={"form-textarea-ap form-inputs-ap"}
            onChange={this.setSymptoms}
            onPaste={this.setPastedSymptoms}
            style={{ resize: "none" }}
          />
        )} */}

                <div className="form-headings-ap flex align-center justify-space-between mt10 mb10">
                    {this.formatMessage(messages.condition)}
                    <div>
                        {isCollapse === "condition" ? (
                            <MinusCircleOutlined onClick={() => this.collpaseHanlder("")}/>
                        ) : (
                            <PlusCircleOutlined
                                onClick={() => this.collpaseHanlder("condition")}
                            />
                        )}
                    </div>
                </div>
                <div>
                    {isCollapse === "condition" && (
                        <Select
                            className="form-inputs-ap drawer-select"
                            placeholder="Select Condition"
                            value={this.state.condition}
                            onChange={this.setCondition}
                            onSearch={this.handleConditionSearch}
                            notFoundContent={
                                this.state.fetchingCondition ? (
                                    <Spin size="small"/>
                                ) : (
                                    "No match found"
                                )
                            }
                            showSearch
                            autoComplete="off"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.getConditionOption()}
                        </Select>
                    )}
                </div>

                <div className="form-headings-ap  flex align-center justify-space-between mt10 mb10">
                    {this.formatMessage(messages.severity)}
                    <div>
                        {isCollapse === "severity" ? (
                            <MinusCircleOutlined onClick={() => this.collpaseHanlder("")}/>
                        ) : (
                            <PlusCircleOutlined
                                onClick={() => this.collpaseHanlder("severity")}
                            />
                        )}
                    </div>
                </div>
                <div className="severity-field-container">
                    {isCollapse === "severity" && (
                        <Select
                            className="form-inputs-ap drawer-select "
                            placeholder="Select Severity"
                            value={severity}
                            onChange={this.setSeverity}
                            onSearch={this.handleSeveritySearch}
                            notFoundContent={
                                this.state.fetchingSeverity ? (
                                    <Spin size="small"/>
                                ) : (
                                    "No match found"
                                )
                            }
                            showSearch
                            autoComplete="off"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {this.getSeverityOption()}
                        </Select>
                    )}
                </div>
            </div>
        );
    };

    validateData = () => {
        const {
            mobile_number = "",
            date_of_birth = "",
            treatment = "",
            severity = null,
            condition = null,
            prefix = "",
            diagnosis_description = "",
            diagnosis_type = "",
        } = this.state;
        let age = date_of_birth
            ? moment().diff(moment(date_of_birth), "years")
            : -1;

        if (!prefix) {
            message.error(this.formatMessage(messages.prefixError));
            return false;
        } else if (
            mobile_number.length < 10 ||
            mobile_number.length > 10 ||
            !mobile_number
        ) {
            message.error(this.formatMessage(messages.mobNoError));
            return false;
        } else if (!date_of_birth) {
            message.error(this.formatMessage(messages.dobError));
            return false;
        } else if (
            date_of_birth &&
            (age < 0 || age > 140 || moment(date_of_birth).isAfter(moment()))
        ) {
            //handle case of newBorn

            message.error(this.formatMessage(messages.validDobError));
            return false;
        } else if (!treatment) {
            message.error(this.formatMessage(messages.treatmentError));
            return false;
        } else if (!diagnosis_description) {
            message.error(this.formatMessage(messages.diagnosisError));
            return false;
        } else if (!diagnosis_type) {
            message.error(this.formatMessage(messages.diagnosisTypeError));
            return false;
        }

        return true;
    };

    onSubmit = () => {
        console.log("finalSymptomData", this.state.finalSymptomData);
        const {
            mobile_number = "",
            name = "",
            patient_uid = "",
            gender = "",
            date_of_birth = "",
            treatment = "",
            severity = "",
            condition = "",
            prefix = "",
            diagnosis_description = "",
            diagnosis_type = "",
            comorbidities = "",
            allergies = "",
            clinical_notes = "",
            height = "",
            weight = "",
            symptoms = "",
            address = "",
            diagnosisType = false,
        } = this.state;
        const validate = this.validateData();
        const {submit} = this.props;
        if (validate) {
            submit({
                mobile_number,
                name,
                patient_uid,
                gender,
                date_of_birth,
                treatment_id: treatment,
                severity_id: severity,
                condition_id: condition,
                prefix,
                allergies,
                diagnosis_description: String(diagnosis_description),
                diagnosis_type: diagnosisType === false ? "2" : "1",
                comorbidities,
                clinical_notes,
                height,
                weight,
                symptoms: JSON.stringify(this.state.finalSymptomData),
                address,
            });
        }
    };

    formatMessage = (data) => this.props.intl.formatMessage(data);

    onClose = () => {
        const {close, submitting = false} = this.props;
        this.setState({
            mobile_number: "",
            name: "",
            gender: "",
            date_of_birth: "",
            treatment: "",
            severity: null,
            condition: 1,
            prefix: "91",
            fetchingCondition: false,
            fetchingTreatment: false,
            fetchingSeverity: false,
            fetchingPatients: false,
            comorbidities: "",
            allergies: "",
            clinical_notes: "",
            diagnosis_description: "",
            diagnosis_type: "2",
            patient_ids: [],
            isdisabled: true,
            selectedPatientId: null,
            addNewPatient: false,
            height: "",
            weight: "",
            symptoms: "",
            address: "",
            finalSymptomData: [],
        });
        close();
    };

    onCloseWidgetDrawer = () => {
        this.setState({
            widgetDrawerOpen: false,
            EditWidget: false,
        });
    };

    render() {
        const {visible, submitting = false} = this.props;
        const {onClose, renderAddPatient} = this;
        const {widgetDrawerOpen} = this.state;

        if (visible !== true) {
            return null;
        }
        return (
            <Fragment>
                <Drawer
                    title={this.formatMessage(messages.addPatient)}
                    placement="right"
                    maskClosable={false}
                    headerStyle={{
                        position: "sticky",
                        zIndex: "9999",
                        top: "0px",
                    }}
                    onClose={onClose}
                    visible={visible}
                    width={"30%"}
                >
                    {renderAddPatient()}
                    {/* code implementation after phase 1 */}
                    <WidgetDrawer
                        visible={widgetDrawerOpen}
                        onCloseDrawer={this.onCloseWidgetDrawer}
                        finalSymptomData={this.state.finalSymptomData}
                        generateFinalSymptomData={this.generateFinalSymptomData}
                        selectedSymptom={this.state.selectedSymptom}
                        handleSelectSymptom={this.handleSelectSymptom}
                        EditWidget={this.state.EditWidget}
                    />
                    <div className="add-patient-footer">
                        <Button onClick={this.onClose} style={{marginRight: 8}}>
                            {this.formatMessage(messages.cancel)}
                        </Button>
                        <Button
                            onClick={this.onSubmit}
                            type="primary"
                            icon={submitting ? <PoweroffOutlined/> : null}
                            loading={submitting}
                        >
                            {this.formatMessage(messages.submit)}
                        </Button>
                    </div>
                </Drawer>

                <MultipleTreatmentAlert
                    diagnosis_description={this.state.diagnosis_description}
                />
            </Fragment>
        );
    }
}

export default injectIntl(PatientDetailsDrawer);

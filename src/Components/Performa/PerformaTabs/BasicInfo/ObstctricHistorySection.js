import React, {useState} from "react";
import {Checkbox, Input} from "antd";
import ObstctricHistorytable from "./ObstctricHistorytable";
import MiddleTable from "./MiddleTable";

function ObstctricHistorySection() {
    const [values, setValues] = useState({
        fatherName: "",
        education: "",
        mrNumber: "",
        bmi: "",
        bloodGroup: "",
        lmp: "",
        edd: "",
        riskFactors: "",
        drugAllergies: "",
        menstrualHistory: "",
        pastHistory: "",
        familyHistory: "",
        thyroid: "",
        breast: "",
        respiratorySystem: "",
        cardioVasculerSystem: "",
        plan: "",
    });

    const [checkedList, setCheckedList] = useState([]);

    const onChangeHandler = (e) => {
        // const { value } = e.target;
        // const reg = /^-?\d*(\.\d*)?$/;
        // if ((!isNaN(value) && reg.test(value)) || value === "") {
        setValues({...values, [e.target.name]: e.target.value});
        // }
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (checkedValues) => {
        setCheckedList(checkedValues);
    };

    const firstSection = () => {
        return (
            <div style={{marginTop: "60px"}} className="first-section">
                <div className="mr20 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>Husband/Father Name</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input
                        className={"ant-legacy-form-item-children"}
                        value={values.fatherName}
                        name="fatherName"
                        onChange={onChangeHandler}
                        placeholder="Add husband or father name"
                        // disabled={provider_id}
                    />
                </div>
                <div className="mr20 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>Education</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input
                        className={"ant-legacy-form-item-children"}
                        value={values.education}
                        onChange={onChangeHandler}
                        placeholder="Add Education"
                        name="education"
                        // disabled={provider_id}
                    />
                </div>
                <div className="mr20 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>MR NO</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input
                        className={"ant-legacy-form-item-children"}
                        value={values.mrNumber}
                        onChange={onChangeHandler}
                        placeholder="Add MR NO"
                        name="mrNumber"
                        // disabled={provider_id}
                    />
                </div>
                <div className="mr20 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>BMI</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input
                        className={"ant-legacy-form-item-children"}
                        value={values.bmi}
                        onChange={onChangeHandler}
                        placeholder="Add BMI"
                        name="bmi"
                        // disabled={provider_id}
                    />
                </div>

                <div className="mr20 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>BLOOD GROUP</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input
                        className={"ant-legacy-form-item-children"}
                        value={values.bloodGroup}
                        onChange={onChangeHandler}
                        placeholder="Add Blood Group"
                        name="bloodGroup"
                        // disabled={provider_id}
                    />
                </div>
                <div className="mr20 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>LMP</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input
                        className={"ant-legacy-form-item-children"}
                        value={values.lmp}
                        onChange={onChangeHandler}
                        placeholder="Add LMP"
                        name="lmp"
                        // disabled={provider_id}
                    />
                </div>
                <div className="mr20 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>EDD</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input
                        className={"ant-legacy-form-item-children"}
                        value={values.edd}
                        onChange={onChangeHandler}
                        placeholder="Add EDD"
                        name="edd"
                        // disabled={provider_id}
                    />
                </div>
            </div>
        );
    };

    const secondSection = () => {
        return (
            <div style={{marginTop: "60px"}}>
                <h3>Obstetric History</h3>
                <div className="mr20 mb18">
                    <ObstctricHistorytable/>
                </div>
                <div className="flex">
                    <div className="mr20 wp50 mb20">
                        {" "}
                        <div className="form-headings flex align-center justify-start">
                            {/* {this.formatMessage(messages.consultationFee)} */}
                            <h3>Risk Factors</h3>
                            {/* <div className="star-red">*</div> */}
                        </div>
                        <Input
                            className={"ant-legacy-form-item-children"}
                            value={values.riskFactors}
                            onChange={onChangeHandler}
                            placeholder="Add Risk Factors"
                            name="riskFactors"
                            // disabled={provider_id}
                        />
                    </div>
                    <div className="mr20 wp50 mb20">
                        {" "}
                        <div className="form-headings flex align-center justify-start">
                            {/* {this.formatMessage(messages.consultationFee)} */}
                            <h3>Drug allergies</h3>
                            {/* <div className="star-red">*</div> */}
                        </div>
                        <Input
                            className={"ant-legacy-form-item-children"}
                            value={values.drugAllergies}
                            onChange={onChangeHandler}
                            placeholder="Add Drug Allergies"
                            name="drugAllergies"
                            // disabled={provider_id}
                        />
                    </div>
                </div>

                <div>
                    <h3>Immunization Status</h3>
                    <Checkbox.Group onChange={handleCheckboxChange} value={checkedList}>
                        <Checkbox value="TT1">TT1</Checkbox>
                        <Checkbox value="TT2">TT2</Checkbox>
                    </Checkbox.Group>
                </div>
                <div>
                    <MiddleTable/>
                </div>
            </div>
        );
    };

    const thirdSection = () => {
        return (
            <div className="flex" style={{marginTop: "60px"}}>
                <div className="mr20 wp50 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>Menstrual History</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input.TextArea
                        rows={4}
                        className={"ant-legacy-form-item-children"}
                        value={values.menstrualHistory}
                        onChange={onChangeHandler}
                        placeholder="Add Menstrual History"
                        name="menstrualHistory"
                        // disabled={provider_id}
                    />
                </div>
                <div className="mr20 wp50 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>Past History</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input.TextArea
                        rows={4}
                        className={"ant-legacy-form-item-children"}
                        value={values.pastHistory}
                        onChange={onChangeHandler}
                        placeholder="Add Past History"
                        name="pastHistory"
                        // disabled={provider_id}
                    />
                </div>
                <div className="mr20 wp50 mb20">
                    {" "}
                    <div className="form-headings flex align-center justify-start">
                        {/* {this.formatMessage(messages.consultationFee)} */}
                        <h3>Family History</h3>
                        {/* <div className="star-red">*</div> */}
                    </div>
                    <Input.TextArea
                        rows={4}
                        className={"ant-legacy-form-item-children"}
                        value={values.familyHistory}
                        onChange={onChangeHandler}
                        placeholder="Add Family History"
                        name="familyHistory"
                        // disabled={provider_id}
                    />
                </div>
            </div>
        );
    };

    const fourthSection = () => {
        return (
            <div style={{marginTop: "60px"}}>
                <h3>O/E</h3>
                <div className="fourth-section">
                    <div className="mr20 mb20">
                        {" "}
                        <div className="form-headings flex align-center justify-start">
                            {/* {this.formatMessage(messages.consultationFee)} */}
                            <h3>Thyroid</h3>
                            {/* <div className="star-red">*</div> */}
                        </div>
                        <Input
                            className={"ant-legacy-form-item-children"}
                            value={values.thyroid}
                            onChange={onChangeHandler}
                            placeholder="Add Thyroid"
                            name="thyroid"
                            // disabled={provider_id}
                        />
                    </div>
                    <div className="mr20 mb20">
                        {" "}
                        <div className="form-headings flex align-center justify-start">
                            {/* {this.formatMessage(messages.consultationFee)} */}
                            <h3>Breast</h3>
                            {/* <div className="star-red">*</div> */}
                        </div>
                        <Input
                            className={"ant-legacy-form-item-children"}
                            value={values.breast}
                            onChange={onChangeHandler}
                            placeholder="Add Breast"
                            name="breast"
                            // disabled={provider_id}
                        />
                    </div>
                    <div className="mr20 mb20">
                        {" "}
                        <div className="form-headings flex align-center justify-start">
                            {/* {this.formatMessage(messages.consultationFee)} */}
                            <h3>Respiratory System</h3>
                            {/* <div className="star-red">*</div> */}
                        </div>
                        <Input
                            className={"ant-legacy-form-item-children"}
                            value={values.respiratorySystem}
                            onChange={onChangeHandler}
                            placeholder="Add Respiratory System"
                            name="respiratorySystem"
                            // disabled={provider_id}
                        />
                    </div>
                    <div className="mr20 mb20">
                        {" "}
                        <div className="form-headings flex align-center justify-start">
                            {/* {this.formatMessage(messages.consultationFee)} */}
                            <h3>Cardiovasculer System</h3>
                            {/* <div className="star-red">*</div> */}
                        </div>
                        <Input
                            className={"ant-legacy-form-item-children"}
                            value={values.cardioVasculerSystem}
                            onChange={onChangeHandler}
                            placeholder="Add Cardiovasculer System"
                            name="cardioVasculerSystem"
                            // disabled={provider_id}
                        />
                    </div>
                </div>
                <div>
                    <div className="mr20 mb20">
                        {" "}
                        <div className="form-headings flex align-center justify-start">
                            {/* {this.formatMessage(messages.consultationFee)} */}
                            <h3>Plan</h3>
                            {/* <div className="star-red">*</div> */}
                        </div>
                        <Input.TextArea
                            rows={4}
                            placeholder="Add plan here"
                            className={"ant-legacy-form-item-children"}
                            value={values.plan}
                            onChange={onChangeHandler}
                            name="plan"
                            // disabled={provider_id}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="performa-basic-profile-container">
            {/* {firstSection()} */}
            {secondSection()}
            {thirdSection()}
            {fourthSection()}
        </div>
    );
}

export default ObstctricHistorySection;

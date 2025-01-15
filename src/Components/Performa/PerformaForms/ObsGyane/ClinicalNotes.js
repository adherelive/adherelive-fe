import React, {useState} from "react";
import LabReportsOptions from "./Dropdowns/LabReportsOptions";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import isEmpty from "../../../../Helper/is-empty";
import moment from "moment";

function ClinicalNotes() {
    const [inputFields, setInputFields] = useState([]);
    const [isCollapse, setCollapse] = useState("");

    const handleFormChange = (reportIndex, index, event) => {
        let data = [...inputFields];
        data[reportIndex].reportValues[index][event.target.name] =
            event.target.value;
        setInputFields(data);
    };

    const addFields = (reportName) => {
        let allData = inputFields;
        let filterData =
            !isEmpty(allData) &&
            allData.filter((ele) => ele.reportName === reportName);
        // if (isEmpty(filterData)) {
        let newfield = {
            contentBlock: "Lab Report",
            reportName: `${reportName}`,
            reportValues: [
                {
                    value: "",
                    date: new Date().toDateString(),
                    doctorName: "Akshay Nagargoje",
                },
            ],
        };
        setCollapse(reportName);
        setInputFields([...inputFields, newfield]);
        // } else {
        //   alert(`${reportName} is already added`);
        // }
    };

    const addValueHandler = (index, label) => {
        setCollapse(label);
        let data = [...inputFields];
        data[index].reportValues.push({
            value: "",
            date: new Date().toDateString(),
            doctorName: "Akshay Nagargoje",
        });
        setInputFields(data);
    };

    const removeFields = (reportIndex, index) => {
        let data = [...inputFields];
        data[reportIndex].reportValues.splice(index, 1);
        setInputFields(data);
    };

    const collapseHanlder = (label) => {
        setCollapse(label);
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields);
    };

    return (
        <div className="performa-lab-report-form-container">
            <form onSubmit={submit}>
                <h1>CLINICAL NOTES</h1>
                <LabReportsOptions
                    addFields={addFields}
                    setInputFields={setInputFields}
                />
                {/* <button onClick={addFields}>Add More..</button> */}
                {inputFields.map((report, reportIndex) => {
                    return (
                        <div key={reportIndex}>
                            <div className="heading">
                                {isCollapse === report.reportName ? (
                                    <MinusCircleOutlined onClick={() => collapseHanlder("")}/>
                                ) : (
                                    <PlusCircleOutlined
                                        onClick={() => collapseHanlder(report.reportName)}
                                    />
                                )}
                                <h3>{report.reportName}</h3>
                                <p
                                    onClick={() =>
                                        addValueHandler(reportIndex, report.reportName)
                                    }
                                    className="translate-text pointer mr10"
                                >
                                    Add Value
                                </p>
                            </div>
                            {isCollapse === report.reportName && (
                                <ul className="values-container">
                                    {!isEmpty(report.reportValues) ? (
                                        report.reportValues.map((input, index) => {
                                            return (
                                                <li style={{marginBottom: "10px"}} key={index}>
                                                    <input
                                                        name="value"
                                                        placeholder="value"
                                                        value={input.value}
                                                        onChange={(event) =>
                                                            handleFormChange(reportIndex, index, event)
                                                        }
                                                    />

                                                    <input
                                                        name="value"
                                                        placeholder="value"
                                                        value={`Dr ${input.doctorName}`}
                                                        disabled
                                                    />

                                                    <input
                                                        name="value"
                                                        placeholder="value"
                                                        value={moment(input.date).format("YYYY-MM-DD")}
                                                        disabled
                                                    />

                                                    <button
                                                        onClick={() => removeFields(reportIndex, index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <div>No Values added for {report.reportName}</div>
                                    )}
                                </ul>
                            )}
                        </div>
                    );
                })}
                {/* <button onClick={submit}>Submit</button> */}
            </form>
        </div>
    );
}

export default ClinicalNotes;

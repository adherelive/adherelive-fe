import React, {useState} from "react";
import LabReportsOptions from "./Dropdowns/LabReportsOptions";
import {
    PlusCircleOutlined,
    MinusCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import isEmpty from "../../../../Helper/is-empty";
import moment from "moment";
import {Select, message, Input} from "antd";

const {Option} = Select;

function LabReports() {
    const [inputFields, setInputFields] = useState([]);
    const [isCollapse, setCollapse] = useState("");

    const handleFormChange = (reportIndex, index, event) => {
        let data = [...inputFields];
        data[reportIndex].reportValues[index][event.target.name] =
            event.target.value;
        setInputFields(data);
    };

    const handleReportChange = async (selectedValue, reportIndex, index) => {
        let data = [...inputFields];
        data[reportIndex].reportValues[index]["reportId"] = selectedValue;
        setInputFields(data);
    };

    const addFields = (reportName) => {
        let allData = inputFields;
        let filterData = allData.filter((ele) => ele.reportName === reportName);

        if (isEmpty(filterData) || isEmpty(inputFields)) {
            let newfield = {
                contentBlock: "Lab Report",
                reportName: `${reportName}`,
                reportValues: [
                    {
                        value: "",
                        date: new Date().toDateString(),
                        doctorName: "Akshay Nagargoje",
                        reportId: 1,
                    },
                ],
            };
            setCollapse(reportName);
            setInputFields([...inputFields, newfield]);
        } else if (!isEmpty(filterData)) {
            message.info(`${reportName} is already added`);
        }
    };

    const removeReportHandler = (reportIndex) => {
        let data = [...inputFields];
        data.splice(reportIndex, 1);
        setInputFields(data);
    };

    const addValueHandler = (index, label) => {
        setCollapse(label);
        let data = [...inputFields];
        data[index].reportValues.push({
            value: "",
            date: new Date().toDateString(),
            doctorName: "Akshay Nagargoje",
            reportId: 2,
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

    const getConditionOption = () => {
        let conditions = {
            1: {id: 1, name: "Report One"},
            2: {id: 2, name: "Report Two"},
        };
        let newConditions = [];
        for (let condition of Object.values(conditions)) {
            let {id, name} = condition;
            newConditions.push(
                <Option key={id} value={id}>
                    {name}
                </Option>
            );
        }
        console.log("newConditions", newConditions);
        return newConditions;
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields);
    };

    return (
        <div className="performa-lab-report-form-container">
            <form onSubmit={submit}>
                <h1>LAB REPORTS</h1>
                <LabReportsOptions
                    addFields={addFields}
                    setInputFields={setInputFields}
                />
                {/* <button onClick={addFields}>Add More..</button> */}
                {inputFields.map((report, reportIndex) => {
                    return (
                        <div key={reportIndex}>
                            <div className="heading">
                                <div className="flex align-baseline">
                                    {" "}
                                    {isCollapse === report.reportName ? (
                                        <MinusCircleOutlined onClick={() => collapseHanlder("")}/>
                                    ) : (
                                        <PlusCircleOutlined
                                            onClick={() => collapseHanlder(report.reportName)}
                                        />
                                    )}
                                    <h3>{report.reportName}</h3>
                                </div>

                                <div className="flex">
                                    {" "}
                                    <p
                                        onClick={() =>
                                            addValueHandler(reportIndex, report.reportName)
                                        }
                                        className="translate-text pointer mr10"
                                    >
                                        Add Value
                                    </p>
                                    <p
                                        onClick={() => removeReportHandler(reportIndex)}
                                        className="translate-text pointer mr10"
                                    >
                                        Remove {report.reportName}
                                    </p>
                                </div>
                            </div>
                            {isCollapse === report.reportName && (
                                <ul className="values-container">
                                    {!isEmpty(report.reportValues) ? (
                                        report.reportValues.map((input, index) => {
                                            return (
                                                <li style={{marginBottom: "10px"}} key={index}>
                                                    <div className="mr20 wp20 mb20">
                                                        <Input
                                                            className={"ant-legacy-form-item-children"}
                                                            value={input.value}
                                                            onChange={(event) =>
                                                                handleFormChange(reportIndex, index, event)
                                                            }
                                                            placeholder="value"
                                                            name="value"
                                                            // disabled={provider_id}
                                                        />
                                                    </div>

                                                    <div className="mr20 wp20 mb20">
                                                        {" "}
                                                        <Input
                                                            className={"ant-legacy-form-item-children"}
                                                            name="value"
                                                            placeholder="value"
                                                            value={`unit`}
                                                            disabled
                                                        />
                                                    </div>

                                                    <div className="mr20 wp20 mb20">
                                                        {" "}
                                                        <Input
                                                            className={"ant-legacy-form-item-children"}
                                                            name="value"
                                                            placeholder="value"
                                                            value={`Dr ${input.doctorName}`}
                                                            disabled
                                                        />
                                                    </div>

                                                    <div className="mr20 wp20 mb20">
                                                        {" "}
                                                        <Input
                                                            className={"ant-legacy-form-item-children"}
                                                            name="value"
                                                            placeholder="value"
                                                            value={moment(input.date).format("YYYY-MM-DD")}
                                                            disabled
                                                        />
                                                    </div>

                                                    <Select
                                                        className="performa-report-select drawer-select"
                                                        placeholder="Select Report"
                                                        value={input.reportId}
                                                        onChange={(e) =>
                                                            handleReportChange(e, reportIndex, index)
                                                        }
                                                        // onSearch={this.handleConditionSearch}
                                                        // notFoundContent={
                                                        //   this.state.fetchingCondition ? (
                                                        //     <Spin size="small" />
                                                        //   ) : (
                                                        //     "No match found"
                                                        //   )
                                                        // }
                                                        // showSearch
                                                        autoComplete="off"
                                                        optionFilterProp="children"
                                                        // filterOption={(input, option) =>
                                                        //   option.props.children
                                                        //     .toLowerCase()
                                                        //     .indexOf(input.toLowerCase()) >= 0
                                                        // }
                                                    >
                                                        {getConditionOption()}
                                                    </Select>

                                                    <p
                                                        onClick={() => removeFields(reportIndex, index)}
                                                        className="translate-text pointer mr10"
                                                    >
                                                        Remove value
                                                    </p>
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

export default LabReports;

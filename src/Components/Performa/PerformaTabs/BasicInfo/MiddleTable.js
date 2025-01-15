import React, {useState} from "react";
import {Input} from "antd";
import isEmpty from "../../../../Helper/is-empty";

function MiddleTable() {
    const [tableData, setTableData] = useState([
        {
            yearOfDelivery: "",
            gastationalAge: "",
            riskFactors: "",
            modeOfDelivery: "",
            bodyDetails: "",
            postNatalPeriod: "",
            presentStatus: "",
        },
        {
            yearOfDelivery: "",
            gastationalAge: "",
            riskFactors: "",
            modeOfDelivery: "",
            bodyDetails: "",
            postNatalPeriod: "",
            presentStatus: "",
        },
        {
            yearOfDelivery: "",
            gastationalAge: "",
            riskFactors: "",
            modeOfDelivery: "",
            bodyDetails: "",
            postNatalPeriod: "",
            presentStatus: "",
        },
    ]);

    const addRowHandler = () => {
        let data = [...tableData];
        data.push({
            yearOfDelivery: "",
            gastationalAge: "",
            riskFactors: "",
            modeOfDelivery: "",
            bodyDetails: "",
            postNatalPeriod: "",
            presentStatus: "",
        });
        setTableData(data);
    };

    const removeRowHandler = () => {
        let data = [...tableData];
        data.splice(1);
        setTableData(data);
    };

    return (
        <div className="middle-table-container">
            <div className="flex">
                <p onClick={addRowHandler} className="translate-text pointer mr10">
                    Add Row
                </p>
                <p onClick={removeRowHandler} className="translate-text pointer mr10">
                    Remove row
                </p>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Sr No</th>
                    <th scope="col">Year Of Delivery</th>
                    <th scope="col">Gastational Age</th>
                    <th scope="col">Risk Factors</th>
                    <th scope="col">Mode Of Delivery</th>
                    <th scope="col">Baby Details</th>
                    <th scope="col">Post Natal Period</th>
                    <th scope="col">Present Status</th>
                </tr>
                </thead>
                <tbody>
                {!isEmpty(tableData) &&
                    tableData.map((row, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <Input className={"ant-legacy-form-item-children"}/>
                                </td>
                                <td>
                                    {" "}
                                    <Input className={"ant-legacy-form-item-children"}/>
                                </td>
                                <td>
                                    <Input className={"ant-legacy-form-item-children"}/>
                                </td>
                                <td>
                                    <Input className={"ant-legacy-form-item-children"}/>
                                </td>
                                <td>
                                    <Input className={"ant-legacy-form-item-children"}/>
                                </td>
                                <td>
                                    <Input className={"ant-legacy-form-item-children"}/>
                                </td>
                                <td>
                                    <Input className={"ant-legacy-form-item-children"}/>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default MiddleTable;

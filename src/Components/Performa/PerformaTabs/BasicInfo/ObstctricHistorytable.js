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

    return (
        <div className="middle-table-container">
            <table className="table">
                <thead>
                <tr>
                    <th style={{width: "100px"}} scope="col">
                        G
                    </th>
                    <th style={{width: "100px"}} scope="col">
                        P
                    </th>
                    <th style={{width: "100px"}} scope="col">
                        L
                    </th>
                    <th style={{width: "100px"}} scope="col">
                        A
                    </th>
                    <th style={{width: "100px"}} scope="col">
                        E
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
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
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MiddleTable;

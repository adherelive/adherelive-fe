import React from "react";
import { Button } from "antd";
import ActivateTransactionInfo from "../../Modal/ActivateTransactionInfo";

export default (props) => {
    const {transactions} = props || {};

    /**
     * TODO: Check why the 'Received Payment' is not active?
     */
    return (
        <div className="ellipsis wp100  ">
            <div className="wp100 ">
                {/* <TableStatus displayProps={displayProps} /> */}
                {/* <Button
                      type="primary"
                      className="ml10 add-button "
                      // icon={"plus"}
                      style={{ backgroundColor: "#92d04f", border: "none" }}
                      size={"small"}
                    >
                      <span className="fs16">Activate</span>
                    </Button> */
                }
                <ActivateTransactionInfo transactionData={transactions}/>
                <Button
                    type="primary"
                    className="ml10 add-button "
                    // icon={"plus"}
                    style={{
                        backgroundColor:
                            transactions.patient_status === "active" ? "#dddddd" : "#FF3131",
                        border: "none",
                    }}
                    size={"small"}
                    disabled={transactions.patient_status === "active" ? true : false}
                >
                    <span className="fs16">Request payment</span>
                </Button>
            </div>
        </div>
    );
};

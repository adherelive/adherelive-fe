import React from "react";

export default (props) => {
    const {transactions} = props || {};
    const {patient_status = {}} = transactions;

    return (
        <div className="ellipsis wp100 fw700">
            {patient_status === "active" ? (
                <div className="wp100 tab-color">ACTIVE</div>
            ) : (
                <div style={{color: "gray"}} className="wp100">
                    IN-ACTIVE
                </div>
            )}
        </div>
    );
};

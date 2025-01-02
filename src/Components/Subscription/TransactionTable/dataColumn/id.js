import React from "react";

export default (props) => {
    const {transactions} = props || {};

    return (
        <div className="ellipsis wp100">
            <div className="wp100 fs16 fw700">
                {/* {transaction_id ? transaction_id : TABLE_DEFAULT_BLANK_FIELD} */}
                {transactions.id}
            </div>
        </div>
    );
};

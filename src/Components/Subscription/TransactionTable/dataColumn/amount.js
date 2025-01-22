import React from "react";
import { TABLE_DEFAULT_BLANK_FIELD } from "../../../../constant";

export default (props) => {
    const {transactions} = props || {};

    return (
        <div className="ellipsis wp100  ">
            <div className="wp100 fs16 fw700">
                {/* {amount
          ? `Rs ${parseFloat(amount).toFixed(2)}`
          : TABLE_DEFAULT_BLANK_FIELD} */}
                {`Rs ${transactions.amount}/ month`}
            </div>
        </div>
    );
};

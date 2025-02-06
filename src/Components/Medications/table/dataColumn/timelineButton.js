import React from "react";
import Tooltip from "antd/es/tooltip";
import messages from "../messages";

export default (props) => {
    const {openResponseDrawer, formatMessage, id} = props || {};

    // code implementation after phase 1
    const {medicationData} = props || {};
    const {remaining = 0, total = 0} = medicationData || {};

    return (
        <Tooltip
            placement="bottom"
            title={formatMessage(messages.response_timeline)}
        >
            <div className="p10" onClick={openResponseDrawer(id)}>
                {/* <FieldTimeOutlined className="flex align-center justify-center" /> */}
                {/* code implementation after phase 1 */}
                <div className="ml10">{`${total - remaining}/${total}`}</div>
            </div>
        </Tooltip>
    );
};

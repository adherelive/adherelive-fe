import React from "react";
import edit_image from "../../../../Assets/images/edit.svg";

import messages from "../message";
import Tooltip from "antd/es/tooltip";
import isEmpty from "./../../../../Helper/is-empty";
import EyeFilled from "@ant-design/icons/EyeFilled";

export default (props) => {
    const {
        openEditDrawer,
        id,
        formatMessage,
        reportData,
        uploaderData,
        documentData,
    } = props || {};

    const {flashCard} = reportData || {};

    if (!isEmpty(flashCard)) {
        return (
            <Tooltip
                placement="bottom"
                title={
                    flashCard[0].is_published === 0
                        ? formatMessage(messages.edit)
                        : "View"
                }
            >
                <div
                    className="p10"
                    onClick={openEditDrawer({
                        id,
                        reportData,
                        uploaderData,
                        documentData,
                        report_id: id,
                        flashCard,
                    })}
                >
                    <div className="flex align-center justify-center">
                        {flashCard[0].is_published === 0 ? (
                            <img src={edit_image} alt="edit button"/>
                        ) : (
                            <EyeFilled
                                className="w20"
                                // className={"del doc-opt"}
                                style={{fontSize: "18px", color: "#1890ff"}}
                            />
                        )}
                    </div>
                </div>
            </Tooltip>
        );
    } else {
        return (
            <Tooltip placement="bottom" title={formatMessage(messages.edit)}>
                <div
                    className="p10"
                    onClick={openEditDrawer({
                        id,
                        reportData,
                        uploaderData,
                        documentData,
                        report_id: id,
                    })}
                >
                    <div className="flex align-center justify-center">
                        <img src={edit_image} alt="edit button"/>
                    </div>
                </div>
            </Tooltip>
        );
    }
};

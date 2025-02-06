import React from "react";
import { Modal } from "antd";

function EditSubscriptionFeesWarn({
                                      editSubscriptionFeesWarn,
                                      editSubscriptionFees,
                                      handleFeesAction,
                                  }) {
    return (
        <>
            <div className="add-more" onClick={editSubscriptionFees}>
                {/* {this.formatMessage(messages.addMore)} */}
                Edit
            </div>
            <Modal
                title="Subscription Fees Info"
                visible={editSubscriptionFeesWarn}
                onOk={handleFeesAction("ok")}
                onCancel={handleFeesAction("cancel")}
            >
                <p>Are you sure ?</p>
            </Modal>
        </>
    );
}

export default EditSubscriptionFeesWarn;

import React, {useState} from "react";
import {Modal, Button} from "antd";
import message from "antd/es/message";
import {useDispatch} from "react-redux";
import {updateSubscriptions} from "../../../modules/subscription/subscriptions";

function DeactivateSubscriptionWarn({data}) {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModelHandler = () => {
        setIsModalVisible(true);
    };

    const callBack = () => {
        setIsModalVisible(false);
        message.success("Subscription deactivated sucessfully");
    };

    const handleOk = () => {
        dispatch(
            updateSubscriptions({is_active_for_doctor: 0}, data.id, callBack)
        );
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button
                type="primary"
                className="ml10 add-button "
                // icon={"plus"}
                style={{
                    backgroundColor:
                        data.is_active_for_doctor === 0 ? "lightgray" : "#1890ff",
                    border: "none",
                }}
                onClick={openModelHandler}
                disabled={data.is_active_for_doctor === 0 ? true : false}
            >
        <span className="fs16">
          {data.is_active_for_doctor === 0 ? "Deactivated" : "Deactivate"}
        </span>
            </Button>
            <Modal
                title="Deactivation Info"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure ?</p>
            </Modal>
        </>
    );
}

export default DeactivateSubscriptionWarn;

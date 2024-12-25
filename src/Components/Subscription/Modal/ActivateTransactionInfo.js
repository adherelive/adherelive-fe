import React, {useState} from "react";
import {Modal, Button} from "antd";
import message from "antd/es/message";
import {useDispatch} from "react-redux";
import {activateTransaction} from "../../../modules/subscription/transactions";
import moment from "moment";
import isEmpty from "../../../Helper/is-empty";

function ActivateTransactionInfo({transactionData}) {
    const {subplan = {}, services = {}} = transactionData || {};
    let type = {};

    if (isEmpty(services)) {
        type = "subscription";
    } else {
        type = "service";
    }
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModelHandler = () => {
        setIsModalVisible(true);
    };

    const callBack = () => {
        setIsModalVisible(false);
        message.success("Transaction activated sucessfully");
    };

    const handleOk = () => {
        setLoading(true);

        const {subplan = {}, services = {}} = transactionData || {};
        let type = {};

        if (isEmpty(services)) {
            type = "subscription";
        } else {
            type = "service";
        }
        console.log("transactionData", transactionData);
        let formData = {};
        if (type === "subscription") {
            formData = {
                id: transactionData.id,
                service_subscription_id: subplan[0].service_subscription_plan_id,
            };
        } else {
            formData = {
                id: transactionData.id,
                service_plan_id: services[0].service_plan_id,
            };
        }

        dispatch(activateTransaction(formData, callBack));
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    let todaysDate = moment();
    // demoDate = demoDate.format("DD-MM-YYYY");

    let expiryDate = moment(
        type === "service" ? services[0].expire_date : subplan[0].expire_date
    );
    expiryDate = expiryDate.subtract(7, "days");

    // console.log(new Date(startdate) > new Date(demoDate));

    console.log("todaysDate", todaysDate);
    console.log("expiryDate", expiryDate.format("DD-MM-YYYY"));

    console.log(new Date(todaysDate) >= new Date(expiryDate));

    return (
        <>
            <Button
                type="primary"
                className="ml10 add-button "
                // icon={"plus"}
                style={{
                    backgroundColor:
                        transactionData.patient_status === "active" ? "#dddddd" : "#92d04f",
                    border: "none",
                }}
                size={"small"}
                onClick={openModelHandler}
                disabled={transactionData.patient_status === "active" ? true : false}
            >
                <span className="fs16">Activate</span>
            </Button>
            <Modal
                title="Activation Info"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
            >
                <p>Are you sure ?</p>
            </Modal>
        </>
    );
}

export default ActivateTransactionInfo;

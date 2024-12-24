import React, {useState, useEffect, Fragment} from "react";
import {Modal, Button} from "antd";
import message from "antd/es/message";
import isEmpty from "../../../Helper/is-empty";

function MultipleTreatmentAlert({diagnosis_description}) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        console.log("diagnosis_description", diagnosis_description.length);
        if (
            !isEmpty(diagnosis_description) &&
            typeof diagnosis_description == "object" &&
            diagnosis_description.length >= 2
        ) {
            setIsModalVisible(true);
        }

        return () => {
            setIsModalVisible(false);
        };
    }, [diagnosis_description]);

    const openModelHandler = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Fragment>
            <Modal
                title="Multiple treatment info"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>
                    You added multiple treatment in diagnosis, later on you can add from
                    patient details page
                </p>
            </Modal>
        </Fragment>
    );
}

export default MultipleTreatmentAlert;

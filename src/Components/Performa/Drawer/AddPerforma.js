import React, { Component, Fragment, useState } from "react";
import { injectIntl } from "react-intl";
import {
  Drawer,
  Icon,
  Select,
  Input,
  // message,
  Button,
  Spin,
  Radio,
  DatePicker,
} from "antd";
// import { CONSULTATION_FEE_TYPE_TEXT } from "../../../constant";
// import moment from "moment";
// import throttle from "lodash-es/throttle";
// import messages from "./message";
// import Footer from "../../../Drawer/footer";
// import { PoweroffOutlined } from "@ant-design/icons";
import {useDispatch} from "react-redux";
// import { addServices } from "./../../../../modules/subscription/services/index";
import message from "antd/es/message";

const {Option} = Select;

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function AddPerforma({onCloseDrawer, visible, doctor_id}) {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        consultation: "",
        submitting: false,
    });

    const callBack = () => {
        setValues({
            ...values,
            consultation: "",
            serviceType: "Digital",
            serviceFees: "",
            submitting: false,
            currency: "INR",
        });
        onCloseDrawer();
        message.success("Service added successfully");
    };

    const onSubmit = () => {
        const {consultation, serviceType, serviceFees, currency, razorpayLink} =
            values;
        setValues({
            ...values,
            submitting: true,
        });

        // dispatch(addServices(formData, callBack));
    };

    // const formatMessage = (data) => this.props.intl.formatMessage(data);

    const onClose = () => {};

    const setConsultation = (value) => {
        setValues({
            ...values,
            consultation: value,
            serviceType:
                value === "Virtual consultation" || value === "Remote monitoring"
                    ? "Digital"
                    : "Physical",
        });
    };

    const getConsultationOption = () => {
        let serviceOfferingOptions = [
            {name: "Obs Gyane", id: 1},
            {name: "Mental Health", id: 2},
        ];
        let options = [];
        serviceOfferingOptions.forEach((service) => {
            options.push(
                <Option key={service.id} value={service.name}>
                    {service.name}
                </Option>
            );
        });

        return options;
    };

    const renderAddNewConsultationFee = () => {
        const {
            consultation = "",
            serviceType = "",
            serviceFees = "",
            currency,
        } = values;

        return (
            <div className="form-block-ap">
                <div
                    className="form-headings
                //    flex align-center justify-start
                   tac"
                >
          <span className="fwbolder fs18 ">
            {/* {this.formatMessage(messages.defaultConsultationOptions)} */}
              Select Performa
          </span>
                </div>

                <Select
                    className="form-inputs-ap drawer-select"
                    placeholder="Select Consultation Type"
                    value={consultation}
                    onChange={setConsultation}
                    autoComplete="off"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                        0
                    }
                >
                    {getConsultationOption()}
                </Select>
            </div>
        );
    };

    const {consultation, submitting} = values;

    return (
        <Fragment>
            <Drawer
                title={"Add New Performa"}
                placement="right"
                maskClosable={false}
                headerStyle={{
                    position: "sticky",
                    zIndex: "9999",
                    top: "0px",
                }}
                destroyOnClose={true}
                onClose={onCloseDrawer}
                visible={visible} // todo: change as per state, -- WIP --
                width={400}
            >
                {renderAddNewConsultationFee()}
                {consultation !== "" ? (
                    <div className="add-patient-footer">
                        <Button onClick={onCloseDrawer} style={{marginRight: 8}}>
                            {/* {this.formatMessage(messages.cancel)} */}
                            Cancel
                        </Button>
                        <Button
                            onClick={onSubmit}
                            type="primary"
                            // icon={submitting ? <PoweroffOutlined /> : null}
                            loading={submitting}
                        >
                            {/* {this.formatMessage(messages.submit)} */}
                            Submit
                        </Button>
                    </div>
                ) : null}
            </Drawer>
        </Fragment>
    );
}

export default AddPerforma;

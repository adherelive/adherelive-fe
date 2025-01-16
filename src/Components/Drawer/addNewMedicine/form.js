import React, {Component} from "react";
import {injectIntl} from "react-intl";

// import Form from "antd/es/form";
import Select from "antd/es/select";
import Input from "antd/es/input";
import messages from "./messages";
import message from "antd/es/message";
// AKSHAY NEW COE FOR ANTD V4
import {Form, Mention} from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";

const {Item: FormItem} = Form;
const {Option, OptGroup} = Select;

const NAME = "name";
const TYPE = "type";
const GENERIC_NAME = "generic_name";

const FIELDS = [NAME, TYPE, GENERIC_NAME];

let medicine_type = {
    1: {
        index: "1",
        name: "",
        items: [
            {
                name: "TABLET",
                defaultUnit: "1",
                id: 1,
            },
            {
                name: "SYRUP",
                defaultUnit: "2",
                id: 2,
            },
            {
                name: "CAPSULE",
                defaultUnit: "1",
                id: 3,
            },
            {
                name: "SUSPENSION",
                defaultUnit: "1",
                id: 4,
            },
            {
                name: "GELS",
                defaultUnit: "2",
                id: 5,
            },
            {
                name: "LOTIONS",
                defaultUnit: "2",
                id: 6,
            },
            {
                name: "LINIMENTS",
                defaultUnit: "2",
                id: 7,
            },
            {
                name: "LOZENGES",
                defaultUnit: "1",
                id: 8,
            },
        ],
    },
    2: {
        index: "2",
        name: "",
        items: [
            {
                name: "SPRAY",
                defaultUnit: "2",
                id: 9,
            },
            {
                name: "NEBULISER",
                defaultUnit: "1",
                id: 10,
            },
            {
                name: "CREAM",
                defaultUnit: "2",
                id: 11,
            },
            {
                name: "OINTMENT",
                defaultUnit: "2",
                id: 12,
            },
        ],
    },
    3: {
        index: "3",
        name: "",
        items: [
            {
                name: "RECTAL SUPPOSITORY",
                defaultUnit: "1",
                id: 13,
            },
            {
                name: "RECTAL ENEMA",
                defaultUnit: "1",
                id: 14,
            },
            {
                name: "PESSARIES OF VAGINAL",
                defaultUnit: "1",
                id: 15,
            },
        ],
    },
    4: {
        index: "4",
        name: "",
        items: [
            {
                name: "INHALER",
                defaultUnit: "2",
                id: 16,
            },
        ],
    },
    5: {
        index: "5",
        name: "INJECTION",
        items: [
            {
                name: "I/D INTRDERMAL",
                defaultUnit: "2",
                id: 17,
            },
            {
                name: "S/C SUBCUTANEOUS",
                defaultUnit: "2",
                id: 18,
            },
            {
                name: "I/M INTRAMUSCULAR",
                defaultUnit: "2",
                id: 19,
            },
            {
                name: "I/V INTRAVENOUS",
                defaultUnit: "2",
                id: 20,
            },
        ],
    },
    6: {
        index: "6",
        name: "OTHER",
        items: [
            {
                name: "OTHER",
                defaultUnit: null,
                id: 21,
            },
        ],
    },
};

class AddMedicineForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("In Add New Medicine componentDidMount", this.props.form);
        this.scrollToTop();
    }

    scrollToTop = () => {
        let antForm = document.getElementsByClassName("Form")[0];

        // Added this check to prevent error
        if (antForm && antForm.parentNode) {
            console.log("Form scrollTop antForm.parentNode ---> ", antForm.parentNode);
            antForm.parentNode.scrollTop = 0;
        }

        console.log("Confirm form scrollTop antForm.parentNode ---> ", antForm.parentNode);

        let antDrawerBody = antForm.parentNode;
        let antDrawerWrapperBody = antDrawerBody.parentNode;
        antDrawerBody.scrollIntoView(true);
        antDrawerWrapperBody.scrollTop -= 200;
    };

    getParentNode = (t) => t.parentNode;

    formatMessage = (data) => this.props.intl.formatMessage(data);

    getStringFormat = (str) => {
        return str
            ? `${str.charAt(0).toUpperCase()}${str.substring(1, str.length)}`
            : "";
    };

    getOptions = (items, category) => {
        const {getStringFormat} = this;

        return items.map((item) => {
            const {name, defaultUnit, id} = item || {};

            return (
                <Option
                    key={`${category}:${defaultUnit}:${name}`}
                    value={name}
                    title={name}
                >
                    {getStringFormat(name)}
                </Option>
            );
        });
    };

    getFormulationOptions = () => {
        // const { medication_details: { medicine_type = {} } = {} } = this.props;
        const {getOptions, getStringFormat} = this;

        return Object.keys(medicine_type).map((id) => {
            const {items, name} = medicine_type[id] || {};

            return (
                <OptGroup label={getStringFormat(name)}>
                    {getOptions(items, id)}
                </OptGroup>
            );
        });
    };

    handleSelect = (value) => {
        const {
            form: {setFieldsValue},
        } = this.props;
        setFieldsValue({[TYPE]: value});
    };

    render() {
        const {
            form: {getFieldDecorator, isFieldTouched, getFieldError, getFieldValue},
        } = this.props;
        // const disabledSubmit = (!name || !type);

        const {input = ""} = this.props;

        const {formatMessage} = this;

        let fieldsError = {};
        FIELDS.forEach((value) => {
            const error = isFieldTouched(value) && getFieldError(value);
            fieldsError = {...fieldsError, [value]: error};
        });

        return (
            <Form className="fw700 wp100 pb30 Form">
                <FormItem
                    className="full-width ant-date-custom"
                    label={formatMessage(messages.medicineName)}
                >
                    {getFieldDecorator(NAME, {
                        rules: [
                            {
                                required: true,
                                message: formatMessage(messages.fillFieldsError),
                            },
                        ],
                        initialValue: input ? input : "",
                    })(
                        <Input
                            autoFocus
                            className="mt4"
                            placeholder={formatMessage(messages.medicineName)}
                        />
                    )}
                </FormItem>

                <FormItem label={formatMessage(messages.formulation)}>
                    {getFieldDecorator(TYPE, {
                        rules: [
                            {
                                required: true,
                                message: formatMessage(messages.fillFieldsError),
                            },
                        ],
                    })(
                        <Select
                            className="full-width"
                            placeholder=""
                            showSearch
                            autoComplete="off"
                            optionFilterProp="children"
                            suffixIcon={null}
                            // filterOption={(input, option) =>
                            //     option.props.children
                            //         .toLowerCase()
                            //         .indexOf(input.toLowerCase()) >= 0
                            // }
                            getPopupContainer={this.getParentNode}
                            onSelect={this.handleSelect}
                        >
                            {this.getFormulationOptions()}
                        </Select>
                    )}
                </FormItem>

                <FormItem
                    className="full-width ant-date-custom"
                    label={formatMessage(messages.genericName)}
                >
                    {getFieldDecorator(GENERIC_NAME, {
                        rules: [
                            {
                                required: true,
                                message: formatMessage(messages.fillFieldsError),
                            },
                        ],
                        initialValue: input ? input : "",
                    })(
                        <Input
                            autoFocus
                            className="mt4"
                            placeholder={formatMessage(messages.genericName)}
                        />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default injectIntl(AddMedicineForm);

import React, {Component} from "react";
import {injectIntl} from "react-intl";
import Select from "antd/es/select";
import SecondaryDoctorForm from "./form";

// import Form from "antd/es/form";
import message from "antd/es/message";
import messages from "./messages";
import Spin from "antd/es/spin";
import {getName} from "../../../Helper/validation";

import debounce from "lodash-es/debounce";
import isEmpty from "../../../Helper/is-empty";

// code implementation after phase 1 for antd v4
import { Form, Mention } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";


const {Option} = Select;
const {Item: FormItem} = Form;

const DOCTOR_ROLE_ID = "doctor_role_id";

class AddSecondaryDoctor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchingName: false,
            rowData: [],
            dropDownVisible: false,
        };

        this.FormWrapper = Form.create({onFieldsChange: this.onFormFieldChanges})(
            SecondaryDoctorForm
        );

        this.searchName = debounce(this.searchName.bind(this), 500);
        // Initialize refs
        this.formRef = React.createRef();
        this.drawerBodyRef = React.createRef();
        this.drawerWrapperRef = React.createRef();
    }

    async componentDidMount() {}

    formatMessage = (data) => this.props.intl.formatMessage(data);

    searchName = async (name) => {
        // Only search if name is not empty
        if (!name || name.trim() === '') {
            this.setState({ rowData: [], searchingName: false });
            return;
        }

        console.log("searchName Add Secondary Doctor ---> ", name);

        try {
            const {searchDoctorName} = this.props;
            this.setState({searchingName: true});
            const response = await searchDoctorName(name);

            console.log("searchDoctorName response ---> ", response);

            const {
                status,
                statusCode,
                payload: {data = {}, message: res_message = ""} = {},
            } = response || {};
            if (!status && statusCode !== 422) {
                this.setState({rowData: []});
                message.error(res_message);
            }
            const {rowData = [], user_roles = {}} = data || {};
            this.setState({
                rowData,
                searchingName: false,
                user_roles: user_roles,
            });
        } catch (error) {
            this.setState({searchingName: false});
            console.log("searchName Add Secondary Doctor error ---> ", error);
        }
    };

    getNameOptions = () => {
        const {
            rowData = [],
            dropDownVisible = false,
            user_roles = {},
        } = this.state;
        const {
            doctors = {},
            providers = {},
            auth_role = null,
            userRoles = {},
        } = this.props;
        // console.log("467236472647264782",{rowData});
        console.log("doctors", doctors);
        console.log("providers", providers);
        console.log("userRoles", userRoles);
        return Object.keys(rowData).map((id) => {
            const rowDataObj = rowData[id] || {};
            const {doctor_id, provider_id, user_id, user_role_id} =
            rowDataObj || {};

            if (auth_role.toString() === user_role_id.toString()) {
                return null;
            }
            //PREV CODE
            // const {
            //   basic_info: { first_name = "", middle_name = "", last_name = "" } = {},
            // } = doctors[doctor_id] || {};

            // code implementation after phase 1 start

            let doctorData = doctors[doctor_id];
            let doctorBasicInfo = "";
            if (doctorData) {
                doctorBasicInfo = doctorData.basic_info;
            }

            // const {
            //   [doctor_id]: { basic_info = {} },
            // } = doctors || {};

            const {full_name = ""} = doctorBasicInfo || {};

            const {basic_info: {linked_id = null} = {}} =
            user_roles[user_role_id] || {};

            // code implementation after phase 1 end

            let provider_name = "";
            //PREV CODE START
            // if (provider_id && !isEmpty(providers)) {
            //   console.log(providers[provider_id]);
            //   const { basic_info: { name } = {} } = providers[provider_id];
            //   provider_name = name;
            // }
            //PREV CODE END
            // code implementation after phase 1 start
            if (linked_id) {
                const {basic_info: {name} = {}} = providers[linked_id] || {};

                provider_name = name;
            }
            // code implementation after phase 1 end

            console.log(provider_name);

            return (
                <Option key={user_role_id} value={user_role_id}>
                    <div className="flex direction-column">
                        <div className="fs16 flex ">
                            {`${getName(full_name)}`}
                            {dropDownVisible ? null : provider_name ? (
                                <div className="fs16 ml10">{`(${provider_name})`}</div>
                            ) : null}
                        </div>
                        {dropDownVisible ? (
                            <div className="fs14">{provider_name}</div>
                        ) : null}
                    </div>
                </Option>
            );
        });
    };

    setDoctor = (value) => {
        const {form: {setFieldsValue} = {}} = this.props;

        setFieldsValue({[DOCTOR_ROLE_ID]: value});
    };

    onDropdownVisibleChange = (visible) => {
        this.setState({dropDownVisible: visible});
    };

    render() {
        const {formatMessage} = this;
        const {
            form: {getFieldDecorator},
        } = this.props;

        const {searchingName = false} = this.state;
        return (
            <Form
                ref={this.formRef}
                className="event-form pb80 wp100 Form"
            >
                <FormItem
                    label={formatMessage(messages.doctor_name)}
                    className="flex-grow-1 mt-4"
                >
                    {getFieldDecorator(DOCTOR_ROLE_ID, {
                        rules: [
                            {
                                required: true,
                                message: formatMessage(messages.doctor_name_required_error),
                            },
                        ],
                    })(
                        <Select
                            className="form-inputs-ap drawer-select"
                            onSearch={this.searchName}
                            onSelect={this.setDoctor}
                            placeholder={this.formatMessage(messages.name)}
                            showSearch
                            notFoundContent={searchingName ? <Spin size="small"/> : null}
                            autoComplete="off"
                            optionFilterProp="children"
                            onDropdownVisibleChange={this.onDropdownVisibleChange}
                            filterOption={(input, option) =>
                                option.props.children
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(option.props.children.toString().toLowerCase()) > -1
                            }
                        >
                            {this.getNameOptions()}
                        </Select>
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default injectIntl(AddSecondaryDoctor);

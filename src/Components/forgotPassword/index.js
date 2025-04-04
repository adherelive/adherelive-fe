import React, { Component } from "react";
import { Button, Input, message } from "antd";
import CompanyIcon from "../../Assets/images/logo3x.png";
// code implementation after phase 1 for antd v4
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";

const {Item: FormItem} = Form;

const EMAIL = "email";

const FIELDS = [EMAIL];

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    handleForgotPassword = async (e) => {
        e.preventDefault();
        const {
            form: {validateFields},
            forgotPassword,
            // match: { path } = {},
            // history
        } = this.props;
        this.setState({loading: true});
        validateFields(async (err, {email}) => {
            if (!err) {
                try {
                    const response = await forgotPassword({email});
                    const {
                        status = false,
                        statusCode,
                        payload: {message: resMessage} = {},
                    } = response;
                    if (status) {
                        message.success(resMessage, 4);
                    } else {
                        if (statusCode === 422) {
                            message.error(resMessage, 4);
                        } else {
                            this.setState({loading: false});
                            message.error(resMessage, 4);
                        }
                    }
                } catch (err) {
                    console.log("Components ForgotPassword err ---> ", err);
                    this.setState({loading: false});
                    message.error("Something went wrong, Please try again", 4);
                }
            } else {
                // message.error("Something went wrong, Please try again", 4);
            }
        });
        // signIn();
    };

    render() {
        const {
            form: {getFieldDecorator, isFieldTouched, getFieldError},
        } = this.props;
        let fieldsError = {};
        FIELDS.forEach((value) => {
            const error = isFieldTouched(value) && getFieldError(value);
            fieldsError = {...fieldsError, [value]: error};
        });
        const {handleForgotPassword} = this;

        return (
            <div className="wp100 landing-background flex direction-column justify-center align-center">
                <div className="hp100 wp75">
                    <div className="mt40 wp100 mt24 flex justify-space-between align-center direction-row ">
                        <div className="flex direction-row align-center">
                            <img alt="" src={CompanyIcon} className="company-logo"/>
                            <div className="text-white fs28 medium italic">Adhere.Live</div>
                        </div>

                        <div className="flex direction-row align-center"></div>
                    </div>
                    <div className="center-container">
                        <div className="form-container-forgot">
                            <div className="mb8 fs24 fw600 pt20 flex direction-column tal">
                                Forgot Password
                            </div>

                            <Form onSubmit={handleForgotPassword} className="login-form">
                                <FormItem

                                    // validateStatus={fieldsError[EMAIL] ? "error" : ""}
                                    // help={fieldsError[EMAIL] || ""}
                                >
                                    <div className="fs16 medium tal mt8">Registered Email</div>
                                    {getFieldDecorator(EMAIL, {
                                        rules: [
                                            {
                                                required: true,
                                                message: "Please enter email",
                                            },
                                            {
                                                type: "email",
                                                message: "Please enter a valid email!",
                                            },
                                        ],
                                    })(<Input type="text" placeholder="Email" className="h40"/>)}
                                </FormItem>

                                {/* <div classname='fs12 medium dark-sky-blue mt4 tar'>Forgot Password?</div> */}
                                <FormItem>
                                    <Button
                                        type="primary"
                                        className="wp100 h40 mt28"
                                        htmlType="submit"
                                        size={"large"}
                                        // loading={loading}
                                    >
                                        Submit
                                    </Button>
                                    <div className="flex justify-space-between direction-column mt10 align-end"></div>
                                </FormItem>
                            </Form>

                            <div className="flex direction-column justify-space-between align-center"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(ForgotPassword);

import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Button, Input, message } from "antd";
import messages from "./message";
import { withRouter } from "react-router-dom";
import { PATH } from "../../constant";
import config from "../../config";
// code implementation after phase 1 for antd v4
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";

const {Item: FormItem} = Form;
const {Password} = Input;

const EMAIL = "email";
const PASSWORD = "password";

const FIELDS = [EMAIL, PASSWORD];

const TOS_PAGE_URL = `${config.WEB_URL}${PATH.TERMS_OF_SERVICE}`;
const PRIVACY_PAGE_URL = `${config.WEB_URL}${PATH.PRIVACY_POLICY}`;

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
        };
    }

    handleSignIn = async (e) => {
        e.preventDefault();
        const {
            form: {validateFields},
            signIn,
            getInitialData,
            getUserRoles,
            history,
        } = this.props;

        this.setState({loading: true});
        validateFields(async (err, {email, password}) => {
            if (!err) {
                try {
                    const response = await signIn({email, password});
                    const {
                        status = false,
                        statusCode,
                        payload: {data = {}, message: resp_msg} = {},
                    } = response;
                    const {users = {}, auth_user = "", hasConsent} = data || {};

                    if (status) {
                        message.success(this.formatMessage(messages.loginSuccessfull), 4);
                        if (hasConsent) {
                            getInitialData();
                            getUserRoles();
                        } else {
                            history.push(PATH.CONSENT);
                        }
                    } else {
                        if (statusCode === 422) {
                            message.error(this.formatMessage(messages.emailDoesNotExist), 4);
                        } else {
                            this.setState({loading: false});
                            message.error(this.formatMessage(messages.invalidCredentials), 4);
                        }
                    }
                } catch (err) {
                    console.log("Component Signin handleSingIn err ---> ", err);
                    this.setState({loading: false});
                    message.error(this.formatMessage(messages.somethingWentWrong), 4);
                }
            } else {
                this.setState({loading: false});
                message.error(this.formatMessage(messages.pleaseFillDetails), 4);
            }
        });
    };

    formatMessage = (data) => this.props.intl.formatMessage(data);

    tosComponent = () => {
        return (
            <div className="flex mb20">
                <div className="slate-grey mt-10 fs12 p10 medium">
                    <span>{this.formatMessage(messages.agreeSigninPPText)}</span>{" "}
                    <a href={PRIVACY_PAGE_URL} target={"_blank"}>
                        {this.formatMessage(messages.privacyPolicy)}
                    </a>
                </div>
            </div>
        );
    };

    render() {
        const {
            form: {getFieldDecorator, isFieldTouched, getFieldError},
            redirectToForgotPassword,
        } = this.props;
        let fieldsError = {};
        FIELDS.forEach((value) => {
            const error = isFieldTouched(value) && getFieldError(value);
            fieldsError = {...fieldsError, [value]: error};
        });
        const {handleSignIn, tosComponent} = this;
        return (
            <Form onSubmit={handleSignIn} className="login-form">
                <FormItem
                    validateStatus={fieldsError[EMAIL] ? "error" : ""}
                    help={fieldsError[EMAIL] || ""}
                >
                    <div className="fs16 medium tal mt8">
                        {this.formatMessage(messages.email)}
                    </div>
                    {getFieldDecorator(EMAIL, {
                        rules: [
                            {
                                required: true,
                                message: this.formatMessage(messages.enterEmail),
                            },
                            {
                                type: "email",
                                message: this.formatMessage(messages.enterValidEmail),
                            },
                        ],
                    })(<Input type="text" placeholder="Email" className="h40"/>)}
                </FormItem>

                <FormItem
                    validateStatus={fieldsError[PASSWORD] ? "error" : ""}
                    help={fieldsError[PASSWORD] || ""}
                >
                    <div className="fs16 medium tal">
                        {this.formatMessage(messages.password)}
                    </div>
                    {getFieldDecorator(PASSWORD, {
                        rules: [
                            {
                                required: true,
                                message: this.formatMessage(messages.enterPassword),
                            },
                        ],
                    })(<Password placeholder="Password" className="h40"/>)}
                </FormItem>
                {tosComponent()}
                <div className="flex wp100 justify-end mt-20 mb16">
                    <div
                        className="Forgot-Password medium pointer "
                        onClick={redirectToForgotPassword}
                    >
                        Forgot Password?
                    </div>
                </div>

                <FormItem className="mb53">
                    <Button
                        type="primary"
                        className="wp100 h40"
                        htmlType="submit"
                        size={"large"}
                        // loading={loading}
                    >
                        {this.formatMessage(messages.login)}
                    </Button>
                    <div className="flex justify-space-between direction-column align-end">
                        {/* <span className="login-form-forgot inline-flex">
                <Link to="/forgot-password">Forgot password?</Link>
                </span> */}
                        {/*              <p>*/}
                        {/*                  Or{" "}*/}
                        {/*                  <span>*/}
                        {/*  <Link to="/register">Sign Up</Link>*/}
                        {/*</span>*/}
                        {/*              </p>*/}
                    </div>
                </FormItem>
            </Form>
        );
    }
}

// TODO: antd v4x has deprecated Form.create. Need to change to not use the Form.create
//const NormalLoginForm = ({ name: "signin_form" })(injectIntl(SignIn));

export default withRouter(
    Form.create({name: "signin_form"})(injectIntl(SignIn))
);
//export default withRouter(mapStateToProps, mapDispatchToProps)(NormalLoginForm);

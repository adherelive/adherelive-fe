import React, {Component} from "react";
import {injectIntl} from "react-intl";
import message from "antd/es/message";
import ReactMarkdown from "react-markdown";
import CompanyIcon from "../../../Assets/images/logo3x.png";
import messages from "./messages";

const TERMS_OF_PAYMENT_NEW = "terms_of_payment";

class TermsOfPaymentNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }

    formatMessage = (message) => this.props.intl.formatMessage(message);

    async componentDidMount() {
        const {getTermsAndPolicy} = this.props;
        try {
            const response = await getTermsAndPolicy(TERMS_OF_PAYMENT_NEW);
            const {status, payload: {data} = {}} = response;
            if (status === true) {
                const {[TERMS_OF_PAYMENT_NEW]: {content} = {}} = data || {};
                this.setState({value: content});
            }
        } catch (error) {
            message.warn("Something went wrong");
        }
    }

    render() {
        const {value} = this.state;
        return (
            <div className="wp100 p10 fs18">
                <div className="wp100 flex align-center mt10 mb36">
                    <img
                        alt="adherelive-logo"
                        src={CompanyIcon}
                        className="company-logo"
                    />
                    <div className="pl10 fs28 fw700 italic">
                        {this.formatMessage(messages.appName)}
                    </div>
                </div>
                <ReactMarkdown>{value}</ReactMarkdown>
            </div>
        );
    }
}

export default injectIntl(TermsOfPaymentNew);

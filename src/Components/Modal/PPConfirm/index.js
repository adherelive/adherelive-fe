import React, { Component } from "react";
import { injectIntl } from "react-intl";
import Modal from "antd/es/modal";
import messages from "./messages";
import { Checkbox } from "antd";
import message from "antd/es/message";
import ReactMarkdown from "react-markdown";

const PRIVACY_POLICY = "privacy_policy";

class PPConfirm extends Component {
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
            const response = await getTermsAndPolicy(PRIVACY_POLICY);
            const {status, payload: {data} = {}} = response;
            if (status === true) {
                const {[PRIVACY_POLICY]: {content} = {}} = data || {};
                this.setState({value: content});
            }
        } catch (error) {
            message.warn("Something went wrong");
        }
    }

    render() {
        const {visible, onAccept, onCancel, checked} = this.props;
        const {value} = this.state;
        const {formatMessage} = this;

        return (
            <Modal
                className={"upload-appointment-docs-modal"}
                visible={visible}
                title={formatMessage(messages.privacy_policy_text)}
                closable
                mask
                onCancel={onCancel}
                maskClosable
                okButtonProps={{disabled: false}}
                wrapClassName={"chat-media-modal-dialog"}
                width={`50%`}
                footer={null}
            >
                <div className="p10 h400 mb20" style={{overflowY: "scroll"}}>
                    <ReactMarkdown>{value}</ReactMarkdown>
                </div>
                <div className="flex justify-space-between mb20">
                    {/* <div classname='fs12 medium dark-sky-blue mt4 tar'>Forgot Password?</div> */}
                    <Checkbox checked={checked} onChange={onAccept} className="mt20">
            <span className="fs18 fw700">
              {formatMessage(messages.accept_privacy_policy)}
            </span>
                    </Checkbox>
                </div>
            </Modal>
        );
    }
}

export default injectIntl(PPConfirm);

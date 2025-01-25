import React, {Component, Fragment} from "react";
import {injectIntl} from "react-intl";
import ReactMde from "react-mde";
// import * as Showdown from "showdown";
import { marked } from "marked"; // Use marked instead of Showdown
import { markedTasklists } from "markdown-it-task-lists"; // For task lists support
import "react-mde/lib/styles/css/react-mde-all.css";
import Button from "antd/es/button";
import Radio from "antd/es/radio";
import message from "antd/es/message";

import messages from "./messages";
import {ArrowLeftOutlined} from "@ant-design/icons";

/**
 * Replaced Showdown with marked
const converter = new Showdown.Converter({
    tables: true, // Enables GitHub Flavored Markdown (GFM) tables.
    simplifiedAutoLink: true, // Automatically converts URLs and email addresses into links.
    strikethrough: true, // Enables strikethrough syntax (~~text~~).
    tasklists: true, // Enables GitHub-style task lists (- [x] Task).
});
*/

// Set options for marked
marked.setOptions({
    gfm: true, // GitHub Flavored Markdown, which includes tables, strikethrough, and task lists
    linkify: true, // Auto-converts URL-like text to links
    tables: true,
    sanitize: false,
    breaks: false, // Disable converting single newlines to <br>
    pedantic: false, // Don't strictly adhere to Markdown.pl
    smartLists: true, // Use smarter list behavior
    smartypants: false, // Disable automatic typographic replacements
});
// Enable task lists support
marked.use(markedTasklists());

const {Group: RadioGroup, Button: RadioButton} = Radio;

const TERMS_OF_SERVICE = "terms_of_service";
const PRIVACY_POLICY = "privacy_policy";

class TosPPEditorPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            selectedTab: "write",
            feature_type: TERMS_OF_SERVICE,
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState) {
        const {feature_type} = this.state;
        const {feature_type: prev_feature_type} = prevState;
        if (feature_type !== prev_feature_type) {
            this.getData();
        }
    }

    formatMessage = (message) => this.props.intl.formatMessage(message);

    getData = async () => {
        const {getTermsAndPolicy} = this.props;
        const {feature_type} = this.state;
        try {
            const response = await getTermsAndPolicy(feature_type);
            const {status, payload: {data} = {}} = response || {};

            let value = "";

            if (Object.keys(data).includes(TERMS_OF_SERVICE)) {
                const {terms_of_service: {content} = {}} = data || {};
                value = content;
            } else {
                const {privacy_policy: {content} = {}} = data || {};
                value = content;
            }
            this.setState({value});
        } catch (error) {
            console.log("error getData --> ", error);
        }
    };

    setValue = (value) => {
        this.setState({value});
    };

    setSelectedTab = (selectedTab) => {
        this.setState({selectedTab});
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const {updateTermsAndPolicy} = this.props;
        const {value, feature_type} = this.state;
        try {
            const response = await updateTermsAndPolicy({
                type: feature_type,
                content: value,
            });
            const {status, payload: {message: respMessage = ""} = {}} =
            response || {};

            if (status === true) {
                message.success(respMessage);
            } else {
                message.warn(respMessage);
            }
        } catch (error) {
            console.log("handleSubmit error -->", error);
        }
    };

    handleOptionChange = (e) => {
        e.preventDefault();
        this.setState({feature_type: e.target.value});
    };

    handleBack = (e) => {
        e.preventDefault();
        const {history} = this.props;
        history.goBack();
    };

    getHeader = () => {
        const {handleSubmit, formatMessage, handleOptionChange, handleBack} =
            this;
        return (
            <Fragment>
                <div className="wp100 mb20 fs28 fw700 flex align-start justify-space-between">
                    <div className="flex flex-start align-center mb20">
                        <ArrowLeftOutlined onClick={handleBack} className="mr10"/>
                        <div className="fs30 fw700">
                            {formatMessage(messages.details_page_header)}
                        </div>
                    </div>
                    <Button type="primary" onClick={handleSubmit}>
                        {formatMessage(messages.save_text)}
                    </Button>
                </div>

                <RadioGroup
                    onChange={handleOptionChange}
                    defaultValue={TERMS_OF_SERVICE}
                    buttonStyle={"solid"}
                    className="mb20"
                >
                    <RadioButton value={TERMS_OF_SERVICE}>
                        {formatMessage(messages.terms_of_service_text)}
                    </RadioButton>
                    <RadioButton value={PRIVACY_POLICY}>
                        {formatMessage(messages.privacy_policy_text)}
                    </RadioButton>
                </RadioGroup>
            </Fragment>
        );
    };

    render() {
        const {value, selectedTab} = this.state;
        const {setValue, setSelectedTab, getHeader} = this;
        // Convert Markdown to HTML
        // const html = marked(markdown);

        console.log("tosPPEditorPage value ---> ", value);

        return (
            <div className="wp100 tos-pp-markdown-editor p20">
                {getHeader()}
                <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(html) =>
                        // Promise.resolve(converter.makeHtml(markdown)),
                        Promise.resolve(marked(html))  // Use marked instead of converter
                    }
                />
            </div>
        );
    }
}

export default injectIntl(TosPPEditorPage);

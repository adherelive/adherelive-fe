import React, { Component } from "react";
import { injectIntl } from "react-intl";

import Form from "antd/es/form";
import Select from "antd/es/select";
import Input from "antd/es/input";
import TextArea from "antd/es/input/TextArea";
// import messages from "./messages";

const {Item: FormItem} = Form;
const {Option, OptGroup} = Select;

const NAME = "name";
const DESCRIPTION = "description";

const FIELDS = [NAME, DESCRIPTION];

class AddSubscriptionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // Initialize refs, create refs for the elements we need to scroll
        this.formRef = React.createRef();
        this.drawerBodyRef = React.createRef();
        this.drawerWrapperRef = React.createRef();
    }

    componentDidMount() {
        this.scrollToTop();
    }

    scrollToTop = () => {
        // Check if the element "Form" exists?
        console.log("All Form elements:", document.getElementsByClassName("Form"));

        try {
            // First try to get the form element using ref
            const formElement = this.formRef.current;

            if (!formElement) {
                console.log("addSubscription Form element not found via ref");
                return;
            }

            // Find the drawer body and wrapper (ant-drawer-body and ant-drawer-wrapper-body)
            let drawerBody = formElement.closest('.ant-drawer-body');
            let drawerWrapper = formElement.closest('.ant-drawer-wrapper-body');

            if (!drawerBody || !drawerWrapper) {
                console.log("addSubscription Drawer elements not found");
                return;
            }

            // Log for debugging
            console.log("Form element addSubscription: ", formElement);
            console.log("Drawer body addSubscription: ", drawerBody);
            console.log("Drawer wrapper addSubscription: ", drawerWrapper);

            // Scroll the drawer body into view
            drawerBody.scrollIntoView(true);

            // Adjust final scroll position
            drawerWrapper.scrollTop -= 200;

        } catch (error) {
            console.error("Error in scrollToTop addSubscription: ", error);
        }
    };

    formatMessage = (data) => this.props.intl.formatMessage(data);

    render() {
        const {
            form: {getFieldDecorator, isFieldTouched, getFieldError, getFieldValue},
        } = this.props;
        const {input = ""} = this.props;
        return (
            <Form
                ref={this.formRef}
                className="event-form pb80 wp100 Form"
            >
                <FormItem
                    className="full-width ant-date-custom"
                    //   label={formatMessage(messages.genericName)}
                    label={"Name of subsacription plan"}
                >
                    {getFieldDecorator(NAME, {
                        rules: [
                            {
                                required: true,
                                // message: formatMessage(messages.fillFieldsError),
                                message: "Subscription name is required",
                            },
                        ],
                        initialValue: input ? input : "",
                    })(
                        <Input
                            autoFocus
                            className="mt4"
                            //   placeholder={formatMessage(messages.genericName)}
                            placeholder={"Health lite"}
                        />
                    )}
                </FormItem>

                <FormItem
                    // label={formatMessage(messages.description_text)}
                    className="full-width ant-date-custom"
                    label={"Plan description"}
                >
                    {getFieldDecorator(DESCRIPTION)(
                        <TextArea
                            autoFocus
                            className="mt4"
                            maxLength={1000}
                            //   placeholder={formatMessage(messages.description_text_placeholder)}
                            placeholder={
                                "This is recommended for patients with severe chronic illness"
                            }
                            rows={4}
                        />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default injectIntl(AddSubscriptionForm);

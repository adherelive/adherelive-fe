import React, { Component } from "react";
import { Form } from "antd";
import { injectIntl } from "react-intl";
import TextArea from "antd/es/input/TextArea";
import messages from "../message";

const FIELD_NAME = "special_instruction";

const { Item: FormItem } = Form;

class Formulation extends Component {
  componentDidMount() {
    const {
      form: { validateFields },
    } = this.props;
    validateFields();
  }

  componentWillUnmount() {
    const {
      form: { validateFields },
    } = this.props;
    validateFields();
  }

  getParentNode = (t) => t.parentNode;

  formatMessage = (data) => this.props.intl.formatMessage(data);

  // translateHandler = async () => {
  //   const {
  //     form: { setFieldsValue, getFieldValue },
  //   } = this.props;
  //   const currentValue = getFieldValue(FIELD_NAME);
  //   const { googleTranslate } = this.props;
  //   let textToTranslate = currentValue;

  //   const response = await googleTranslate(textToTranslate);
  //   const { data = {} } = response || {};
  //   if (data) {
  //     setFieldsValue({ [FIELD_NAME]: data.translations[0].translatedText });
  //   } else {
  //     alert("Something went wrong");
  //   }
  //   // console.log("response", data.translations[0].translatedText);
  // };

  render() {
    const {
      form,
      vitals = {},
      payload: { id: vital_id, canViewDetails = false } = {},
    } = this.props;
    const { getFieldDecorator, getFieldError, isFieldTouched } = form;
    const error = isFieldTouched(FIELD_NAME) && getFieldError(FIELD_NAME);

    let { description = null } = vitals[vital_id] || {};
    const { vitalData = {} } = this.props;
    const { description: existing_description = "" } = vitalData || {};

    return (
      <div className="mb20 select-days-form-content">
        <span className="flex form-label  justify-space-between">
          {this.formatMessage(messages.specialInstruction)}
          {/* <p
            onClick={() => this.translateHandler()}
            className="translate-text pointer mr10"
          >
            Translate in Hindi
          </p> */}
        </span>

        <FormItem validateStatus={error ? "error" : ""} help={error || ""}>
          {getFieldDecorator(FIELD_NAME, {
            initialValue: existing_description
              ? existing_description
              : description,
          })(
            <TextArea
              autoFocus
              className="mt10"
              maxLength={1000}
              placeholder={this.formatMessage(messages.enterInstruction)}
              rows={4}
              disabled={canViewDetails}
            />
          )}
        </FormItem>
      </div>
    );
  }
}

const Field = injectIntl(Formulation);

export default {
  field_name: FIELD_NAME,
  render: (props) => <Field {...props} />,
};

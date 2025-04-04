import React, { Component } from "react";
import { injectIntl } from "react-intl";

// import Form from "antd/es/form";
import Select from "antd/es/select";
import Input from "antd/es/input";
import messages from "./messages";
import message from "antd/es/message";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import debounce from "lodash-es/debounce";
import { VIDEO_TYPES } from "../../../constant";
import CameraOutlined from "@ant-design/icons/CameraOutlined";
import Upload from "antd/es/upload";
// code implementation after phase 1 for antd v4
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";

const {Item: FormItem} = Form;
const {Option} = Select;

const NAME = "name"; // -----> storing exercise id
const SETS = "sets";
const REPETITION_VALUE = "repetition_value";
const REPETITION_ID = "repetition_id";
const CALORIFIC_VALUE = "calorific_value";
const VIDEO_CONTENT = "video_content";
const NOTES = "notes";

const FIELDS = [
    NAME,
    SETS,
    REPETITION_VALUE,
    REPETITION_ID,
    CALORIFIC_VALUE,
    VIDEO_CONTENT,
    NOTES,
];

class AddExerciseGroupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise_id: null,
            searcingExercise: "",
            doctor_id: null,
        };

        this.handleExerciseSearch = debounce(
            this.handleExerciseSearch.bind(this),
            200
        );
        // Initialize refs
        this.formRef = React.createRef();
        this.drawerBodyRef = React.createRef();
        this.drawerWrapperRef = React.createRef();
    }

    componentDidMount() {
        const {doctors = {}, authenticated_user} = this.props;
        this.handleExerciseSearch("");

        for (let each in doctors) {
            const {basic_info: {user_id = null} = {}} = doctors[each];
            if (user_id.toString() === authenticated_user.toString()) {
                this.setState({doctor_id: each});
                break;
            }
        }
    }

    async componentDidUpdate(prevProps) {
        const {
            form: {getFieldValue, setFieldsValue} = {},
            exercise_detail_id = null,
            clearLatestCreatedExercise,
            visibleAddExerciseDrawer,
            searched_exercise_details = {},
            searched_exercises = {},
            setExerciseName,
        } = this.props;

        const {visibleAddExerciseDrawer: prev_visibleAddExerciseDrawer = false} =
            prevProps;

        const {basic_info: {exercise_id: previous_exercise_id = null} = {}} =
        searched_exercise_details[exercise_detail_id] || {};
        const {basic_info: {name = ""} = {}} =
        searched_exercises[previous_exercise_id] || {};

        const {latest_created_exercise: {created = false} = {}} = this.props;

        if (
            !visibleAddExerciseDrawer &&
            prev_visibleAddExerciseDrawer !== visibleAddExerciseDrawer
        ) {
            if (created) {
                // fill new created exercise's details
                await this.fillAllNewCreatedExerciseDetails();
                await clearLatestCreatedExercise();
            } else {
                setFieldsValue({[NAME]: previous_exercise_id}); // opening new exe drawer removes name field's val and exe name
                setExerciseName(name);
            }
        }
    }

    fillAllNewCreatedExerciseDetails = () => {
        const {
            latest_created_exercise: {
                exercises = {},
                exercise_details = {},
                exercise_contents = {},
            } = {},
        } = this.props;
        const {setExerciseName, setEditable, setExerciseDetailId} = this.props;
        let exercise_id = null,
            detail_id = null;

        const {
            form: {setFieldsValue} = {},
            setUploadedVideoUrl,
            setVideoContentType,
        } = this.props;

        if (Object.keys(exercises).length) {
            exercise_id = Object.keys(exercises)[0];
        }

        if (Object.keys(exercise_details).length) {
            detail_id = Object.keys(exercise_details)[0];
        }
        setExerciseDetailId(detail_id);

        const {
            basic_info: {repetition_id, repetition_value} = {},
            calorific_value = 0,
        } = exercise_details[detail_id] || {};

        const {basic_info: {name = ""} = {}} = exercises[exercise_id] || {};

        setExerciseName(name);
        const intExerciseId = parseInt(exercise_id);
        this.setState({exercise_id: intExerciseId});
        const canEdit = true;
        setEditable(canEdit);

        setFieldsValue({[NAME]: intExerciseId});
        setFieldsValue({[REPETITION_ID]: repetition_id});
        setFieldsValue({[CALORIFIC_VALUE]: calorific_value});
        setFieldsValue({[REPETITION_VALUE]: repetition_value});

        if (Object.keys(exercise_contents).length) {
            const key = Object.keys(exercise_contents)[0] || null;
            const {video: {content_type = null, content = ""} = {}} =
            exercise_contents[key] || {};

            setFieldsValue({[VIDEO_CONTENT]: content});
            setUploadedVideoUrl(content);
            setVideoContentType(content_type);
        }
    };

    getRepeatTypeOptions = () => {
        const {exercise_id: state_exercise_id = null, doctor_id = null} =
            this.state;
        const {
            searched_exercise_details,
            repetitions = {},
            authenticated_category,
            searched_exercises,
        } = this.props;
        let options = [],
            repetition_ids = [],
            canEdit = true;

        const {exercise_detail_ids = []} =
        searched_exercises[state_exercise_id] || {};

        for (let each of exercise_detail_ids) {
            const detail = searched_exercise_details[each] || {};
            const {
                basic_info: {id: detail_id, exercise_id, repetition_id} = {},
                creator_id = null,
                creator_type = null,
            } = detail;

            if (
                creator_type === authenticated_category &&
                creator_id &&
                doctor_id &&
                creator_id.toString() === doctor_id.toString()
            ) {
                canEdit = true;
            } else {
                canEdit = false;
            }

            repetition_ids.push(repetition_id);
            const {type = ""} = repetitions[repetition_id] || {};
            options.push(
                <Option
                    key={`${each}-${type}`}
                    value={repetition_id}
                    // code implementation after phase 1 FOR V4
                    detail_id={detail_id}
                    canEdit={canEdit}
                    // PREVIOUS CODE
                    // onClick={this.handleExistingPortionSelect({
                    //   detail_id,
                    //   editable: canEdit,
                    // })}
                >
                    {type}
                </Option>
            );
        }

        for (let each in repetitions) {
            const {id = null, type = ""} = repetitions[each] || {};

            if (!repetition_ids.includes(id)) {
                canEdit = true;

                options.push(
                    <Option
                        key={`${each}-${type}`}
                        value={id}
                        // code implementation after phase 1 FOR V4
                        canEdit={canEdit}
                        // PREVIOUS CODE
                        // onClick={this.handleDifferentPortionSelect({ editable: canEdit })}
                    >
                        {type}
                    </Option>
                );
            }
        }

        return options;
    };

    handleChangeRepeat = (key, value) => {
        const {
            form: {setFieldsValue} = {},
            searched_exercise_details,
            setExerciseDetailId,
            setEditable,
        } = this.props;
        if (value.detail_id) {
            const {
                basic_info: {id: detail_id, repetition_id, repetition_value} = {},
                calorific_value = 0,
            } = searched_exercise_details[value.detail_id] || {};

            setFieldsValue({[REPETITION_ID]: repetition_id});
            setFieldsValue({[CALORIFIC_VALUE]: calorific_value});
            setFieldsValue({[REPETITION_VALUE]: repetition_value});
            setExerciseDetailId(detail_id);
            setEditable(value.canEdit);
        } else {
            setFieldsValue({[REPETITION_ID]: null});
            setFieldsValue({[CALORIFIC_VALUE]: null});
            setFieldsValue({[REPETITION_VALUE]: 1});

            setExerciseDetailId(null);
            setEditable(value.canEdit);
        }
    };

    // handleExistingPortionSelect =
    //   ({ detail_id: value, editable }) =>
    //   () => {
    //     const {
    //       form: { setFieldsValue } = {},
    //       searched_exercise_details,
    //       setExerciseDetailId,
    //       setEditable,
    //     } = this.props;

    //     const {
    //       basic_info: { id: detail_id, repetition_id, repetition_value } = {},
    //       calorific_value = 0,
    //     } = searched_exercise_details[value] || {};

    //     setFieldsValue({ [REPETITION_ID]: repetition_id });
    //     setFieldsValue({ [CALORIFIC_VALUE]: calorific_value });
    //     setFieldsValue({ [REPETITION_VALUE]: repetition_value });
    //     setExerciseDetailId(detail_id);
    //     setEditable(editable);
    //   };

    // handleDifferentPortionSelect =
    //   ({ editable }) =>
    //   () => {
    //     // non existing details for exercise

    //     const {
    //       form: { setFieldsValue } = {},
    //       setExerciseDetailId,
    //       setEditable,
    //     } = this.props;

    //     setFieldsValue({ [REPETITION_ID]: null });
    //     setFieldsValue({ [CALORIFIC_VALUE]: null });
    //     setFieldsValue({ [REPETITION_VALUE]: 1 });

    //     setExerciseDetailId(null);
    //     setEditable(editable);
    //   };

    formatMessage = (data) => this.props.intl.formatMessage(data);

    handleOpenAddDrawer = async (e) => {
        const {openAddExerciseDrawer} = this.props;
        const {form: {setFieldsValue} = {}} = this.props;
        e.preventDefault();
        e.stopPropagation();
        setFieldsValue({[NAME]: ""});
        this.setState({searchingExercise: ""});
        openAddExerciseDrawer();
    };

    getExerciseOptions = () => {
        let options = [];
        const {searched_exercises = {}} = this.props;
        const {searchingExercise = ""} = this.state;

        for (let each in searched_exercises) {
            const exercise = searched_exercises[each] || {};
            const {basic_info: {name: exercise_name, id: exercise_id} = {}} =
            exercise || {};

            options.push(
                <Option key={`${each}-${exercise_name}`} value={exercise_id}>
                    {exercise_name}
                </Option>
            );
        }

        {
            searchingExercise.length &&
            options.length === 0 &&
            options.push(
                <div
                    key={"new-food-div"}
                    className="flex align-center justify-center"
                    className="add-new-medicine-button-div"
                >
                    <Button
                        type={"ghost"}
                        size="small"
                        key={"no-match-food"}
                        className="add-new-medicine-button"
                        onClick={this.handleOpenAddDrawer}
                    >
                        {"Add New Exercise"}
                        <span className="fw800 ml10">{`"${searchingExercise}"`}</span>
                    </Button>
                </div>
            );
        }

        return options;
    };

    handleExerciseSearch = async (value) => {
        try {
            console.log("86763286876832687", {value, props: this.props});
            const {searchExercise, setExerciseName} = this.props;
            const response = await searchExercise(value);
            const {status, payload: {message: resp_msg = ""} = {}} =
            response || {};

            if (!status) {
                message.error(resp_msg);
            }

            if (value.length) {
                setExerciseName(value); // being used for exercise add prefill and name for display exercise grp
            }

            this.setState({searchingExercise: value});
        } catch (error) {
            console.log("error ==>", {error});
        }
    };

    setExerciseId = (value) => {
        const {
            searched_exercises = {},
            setExerciseName,
            searched_exercise_details = {},
            setExerciseDetailId,
            setEditable,
            form: {setFieldsValue} = {},
            authenticated_category,
            exercise_contents = {},
            setUploadedVideoUrl,
            setVideoContentType,
        } = this.props;

        const {doctor_id = null, exercise_id: prev_exercise_id = null} =
            this.state;

        const {basic_info: {name = ""} = {}, exercise_detail_ids = []} =
        searched_exercises[value] || {};
        const first = exercise_detail_ids.length ? exercise_detail_ids[0] : null;

        setExerciseName(name);
        this.setState({exercise_id: value});

        // --- select first rep id for the exercise selected and if is editable
        if (prev_exercise_id !== value) {
            let editable = false;

            const {
                basic_info: {exercise_id} = {},
                creator_id = null,
                creator_type = null,
            } = searched_exercise_details[first] || {};
            if (value && exercise_id && value.toString() === exercise_id.toString()) {
                if (
                    creator_type === authenticated_category &&
                    creator_id &&
                    doctor_id &&
                    creator_id.toString() === doctor_id.toString()
                ) {
                    editable = true;
                }
            }

            const {
                basic_info: {id: detail_id, repetition_id, repetition_value = 1} = {},
                calorific_value = 0,
            } = searched_exercise_details[first] || {};

            let flag = false;

            for (let each in exercise_contents) {
                const {
                    basic_info: {exercise_id = null} = {},
                    video: {content_type = null, content = ""} = {},
                } = exercise_contents[each] || {};
                if (value.toString() === exercise_id.toString()) {
                    setFieldsValue({[VIDEO_CONTENT]: content});
                    setUploadedVideoUrl(content);
                    setVideoContentType(content_type);
                    flag = true;
                    break;
                }
            }

            if (flag === false) {
                setFieldsValue({[VIDEO_CONTENT]: ""});
                setUploadedVideoUrl("");
                setVideoContentType("none");
            }

            setFieldsValue({[REPETITION_ID]: repetition_id});
            setFieldsValue({[REPETITION_VALUE]: repetition_value});
            setFieldsValue({[CALORIFIC_VALUE]: calorific_value});

            setExerciseDetailId(detail_id);
            setEditable(editable);
        }
    };

    onBlur = (props) => {
        const value = parseInt(props);
        const isNotANumber = isNaN(value);

        const {form: {setFieldsValue, getFieldValue} = {}} = this.props;
        if (isNotANumber) {
            setFieldsValue({[NAME]: null});
        }
    };

    handleUpload = async ({file}) => {
        const {
            uploadExerciseContent,
            form: {setFieldsValue} = {},
            setUploadedVideoUrl,
            setVideoContentType,
        } = this.props;
        const data = new FormData();
        data.set("files", file);
        try {
            this.setState({loading: true});
            const response = await uploadExerciseContent(data);
            const {status, payload: {data: {documents = []} = {}} = {}} =
            response || {};

            if (status === true) {
                if (documents.length) {
                    const {name = "", file: resp_file = ""} = documents[0] || {};

                    setFieldsValue({[VIDEO_CONTENT]: name});
                    setUploadedVideoUrl(resp_file);
                    setVideoContentType(VIDEO_TYPES.UPLOAD);
                }
                this.setState({loading: false});
            } else {
                this.setState({loading: false});
            }
        } catch (error) {
            this.setState({loading: false});
        }
    };

    onChange = (e) => {
        const {
            form: {setFieldsValue} = {},
            setUploadedVideoUrl,
            setVideoContentType,
        } = this.props;
        setVideoContentType(VIDEO_TYPES.URL);
        setUploadedVideoUrl("");
    };

    translateHandler = async () => {
        const {
            form: {setFieldsValue, getFieldValue},
        } = this.props;
        const currentValue = getFieldValue(NOTES);
        const {googleTranslate} = this.props;
        let textToTranslate = currentValue;

        const response = await googleTranslate(textToTranslate);
        const {data = {}} = response || {};
        if (data) {
            setFieldsValue({[NOTES]: data.translations[0].translatedText});
        } else {
            alert("Something went wrong");
        }
        // console.log("response", data.translations[0].translatedText);
    };

    render() {
        const {
            form: {getFieldDecorator, isFieldTouched, getFieldError},
            editable = false,
        } = this.props;
        const {
            formatMessage,
            setExerciseId,
            handleExerciseSearch,
            getExerciseOptions,
            onBlur,
            handleUpload,
            onChange,
        } = this;

        const {exercise_id = null} = this.state;

        let fieldsError = {};
        FIELDS.forEach((value) => {
            const error = isFieldTouched(value) && getFieldError(value);
            fieldsError = {...fieldsError, [value]: error};
        });

        return (
                <Form 
                    ref={this.formRef}
                    className="event-form pb80 wp100 Form"
                >
                {/* exercise */}
                <FormItem
                    label={formatMessage(messages.exercise)}
                    className="flex-grow-1 mt-4"
                >
                    {getFieldDecorator(NAME, {
                        rules: [
                            {
                                required: true,
                                message: formatMessage(messages.exercise_required_error),
                            },
                        ],
                    })(
                        <Select
                            placeholder={this.formatMessage(messages.search_exercise)}
                            onSearch={handleExerciseSearch}
                            showSearch
                            // onBlur={onBlur}
                            notFoundContent={null}
                            onSelect={setExerciseId}
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                                const children = option.props.children;

                                if (typeof children === "string") {
                                    return (
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    );
                                } else {
                                    return option;
                                }
                            }}
                        >
                            {getExerciseOptions()}
                        </Select>
                    )}
                </FormItem>

                <div className="flex align-center justify-space-between wp100">
                    <div className="flex wp20">
                        {/* sets */}

                        <FormItem
                            label={formatMessage(messages.sets)}
                            className="flex-grow-1 mt-4 multiply"
                        >
                            {getFieldDecorator(SETS, {
                                initialValue: 1,
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage(messages.sets_required_error),
                                    },
                                ],
                            })(<Input type="number" min="1"/>)}
                        </FormItem>
                    </div>

                    <div className="flex wp60 align-center justify-space-between">
                        <div className="wp50 flex direction-column align-center justify-center">
                            {/* reps */}

                            <FormItem
                                label={formatMessage(messages.repetition_value)}
                                className="flex-grow-1 mt-4 wp90"
                            >
                                {getFieldDecorator(REPETITION_VALUE, {
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(
                                                messages.repetition_value_required_error
                                            ),
                                        },
                                    ],
                                })(<Input type="number" min="1" disabled={!editable}/>)}
                            </FormItem>
                        </div>

                        <div className="wp50 flex direction-column align-center justify-center">
                            {/* rep type */}

                            <FormItem
                                label={formatMessage(messages.repetition_type)}
                                className="flex-grow-1 mt-4 wp90"
                            >
                                {getFieldDecorator(REPETITION_ID, {
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage(
                                                messages.repetition_id_required_error
                                            ),
                                        },
                                    ],
                                })(
                                    <Select
                                        onChange={this.handleChangeRepeat}
                                        className="drawer-select"
                                        disabled={!exercise_id}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.getRepeatTypeOptions()}
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                    </div>
                </div>

                <FormItem
                    label={formatMessage(messages.calories)}
                    className="flex-grow-1 mt-4 "
                >
                    {getFieldDecorator(
                        CALORIFIC_VALUE,
                        {}
                    )(<Input type="number" className="mb20" disabled={!editable}/>)}
                </FormItem>

                {/* video content */}
                <FormItem
                    label={formatMessage(messages.videoUrl)}
                    className="flex-grow-1 mt-4 "
                >
                    {getFieldDecorator(
                        VIDEO_CONTENT,
                        {}
                    )(
                        <Input
                            type="string"
                            className="mb20 "
                            onChange={onChange}
                            // disabled={!editable}
                            suffix={
                                <div className="form-button tab-color pointer">
                                    <Upload
                                        showUploadList={false}
                                        multiple={false}
                                        accept=".mp4"
                                        className="flex align-center chat-upload-component"
                                        customRequest={handleUpload}
                                    >
                                        <div className="chat-upload-btn">
                                            <CameraOutlined/>
                                        </div>
                                    </Upload>
                                </div>
                            }
                        />
                    )}
                </FormItem>

                {/* note */}

                <span className="flex form-label  justify-space-between">
          {this.formatMessage(messages.note)}
                    <p
                        onClick={() => this.translateHandler()}
                        className="translate-text pointer mr10"
                    >
            Translate in Hindi
          </p>
        </span>

                <FormItem
                    // label={formatMessage(messages.note)}
                    className="flex-grow-1 mt-4 "
                >
                    {getFieldDecorator(NOTES, {})(<TextArea className="mb20"/>)}
                </FormItem>
            </Form>
        );
    }
}

export default injectIntl(AddExerciseGroupForm);

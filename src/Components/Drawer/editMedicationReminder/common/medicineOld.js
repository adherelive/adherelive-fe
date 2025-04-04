import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import Form from "antd/es/form";
import Select from "antd/es/select";
import Spin from "antd/es/spin";
import Tooltip from "antd/es/tooltip";

import messages from "../message";
import algoliasearch from "algoliasearch/lite";
import config from "../../../../config";
import { InstantSearch, } from "react-instantsearch-dom";
import Button from "antd/es/button";
import message from "antd/es/message";
import { StarFilled, StarOutlined, } from "@ant-design/icons";

const {Item: FormItem} = Form;
const {Option} = Select;
const FIELD_NAME = "medicine_id";

class Medicine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchingMedicines: false,
            value: "",
            hits: {},
            searching_medicine: false,
            medicine_name: "",
            default_added: false,
        };

        const algoliaClient = this.algoliaClient();
        this.index = algoliaClient.initIndex(config.algolia.medicine_index);
    }

    async componentDidMount() {
        const {addMedication, medicationData, editMedication} = this.props;

        await this.handleGetFavouritesMeds();
        if (addMedication && !medicationData) {
            const {favourites_data = {}, favourite_medicine_ids = []} = this.props;

            if (favourite_medicine_ids.length === 0) {
                this.handleMedicineSearch(" ");
            }
        } else {
            this.getDefaultMedicine();
        }
    }

    handleGetFavouritesMeds = async () => {
        try {
            const {getFavourites} = this.props;
            const response = await getFavourites({type: "medicine"});
            const {
                status,
                statusCode,
                payload: {data: resp_data = {}, message: resp_msg = ""} = {},
            } = response;
            if (!status) {
                message.error(resp_msg);
            }
        } catch (error) {
            console.log("38926745237469732084 error =========>", {error});
        }
    };

    componentDidUpdate(prevProps, prevState) {
        const {newMedicineId: prev_newMedicineId = null} = prevProps;
        const {newMedicineId} = this.props;
        const {favourite_medicine_ids: prev_favourite_medicine_ids = []} =
            prevProps;
        const {favourite_medicine_ids = []} = this.props;
        if (
            favourite_medicine_ids.length === 0 &&
            prev_favourite_medicine_ids.length !== favourite_medicine_ids.length
        ) {
            this.handleMedicineSearch(" ");
        }

        const {
            form: {setFieldsValue, getFieldValue},
            enableSubmit,
        } = this.props;
        if (prev_newMedicineId !== newMedicineId) {
            const {medicines = {}} = this.props;
            const {basic_info: {name = "", id = null} = {}} =
            medicines[newMedicineId] || {};
            const medicineId = parseInt(id);
            setFieldsValue({[FIELD_NAME]: medicineId});
            this.setState({
                medicine_name: name,
                searching_medicine: false,
                medicineId,
            });
            this.getNewDefaultMedicine(medicineId, name);
            this.setState({medicine_id: medicineId, temp_medicine: medicineId});
            enableSubmit();
        }
    }

    setFavMedicineValue = (medicine_id, medicine_name) => () => {
        const medId = parseInt(medicine_id);
        const {
            form: {setFieldsValue, getFieldValue},
            setFormulation,
            enableSubmit,
        } = this.props;
        setFieldsValue({[FIELD_NAME]: medId});
        this.setState({
            medicine_name: medicine_name,
            searching_medicine: false,
        });
    };

    getFavOption = (medicine_id, medicine_name) => {
        const {setMedicineValue, favourite_medicine_ids = []} = this.props;
        const {searching_medicine = true} = this.state;
        return (
            <div
                key={medicine_id}
                className="pointer flex wp100  align-center justify-space-between"
            >
                <Tooltip title={"Name"}>
                    {" "}
                    {/* formatMessage here */}
                    <div className="fs18 fw800 black-85 medicine-selected pr10">
                        <span>{medicine_name}</span>
                    </div>
                </Tooltip>
                <Tooltip title="Unmark" placement="topLeft">
                    {searching_medicine &&
                    medicine_id &&
                    favourite_medicine_ids.includes(medicine_id.toString()) ? (
                        <StarFilled
                            style={{fontSize: "20px", color: "#f9c216"}}
                            onClick={this.handleremoveFavourites(medicine_id)}
                        />
                    ) : searching_medicine ? (
                        <StarOutlined
                            style={{fontSize: "20px", color: "#f9c216"}}
                            onClick={this.handleAddFavourites(medicine_id)}
                        />
                    ) : (
                        ""
                    )}
                </Tooltip>
            </div>
        );
    };

    handleAddFavourites = (id) => async (e) => {
        try {
            e.preventDefault();
            e.stopPropagation();
            const {markFavourite} = this.props;
            const data = {
                type: "medicine",
                id,
            };

            const response = await markFavourite(data);
            const {
                status,
                statusCode,
                payload: {data: resp_data = {}, message: resp_msg = ""} = {},
            } = response;
            if (status) {
                message.success(resp_msg);
            } else {
                message.error(resp_msg);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    handleremoveFavourites = (id) => async (e) => {
        try {
            e.preventDefault();
            e.stopPropagation();
            const {removeFavourite} = this.props;
            const data = {
                type: "medicine",
                typeId: id,
            };

            const response = await removeFavourite(data);
            const {
                status,
                statusCode,
                payload: {data: resp_data = {}, message: resp_msg = ""} = {},
            } = response;
            if (status) {
                message.success(resp_msg);
            } else {
                message.error(resp_msg);
            }
        } catch (error) {
            console.log("error", {error});
        }
    };

    getFavouriteOptions = () => {
        const {
            favourites_data,
            setFavMedicineValue,
            medications,
            payload: {id: medication_id} = {},
            medicines,
        } = this.props;
        const options = [];

        const {temp_medicine = null} = this.state;

        for (let each in favourites_data) {
            const {basic_info = {}, marked_favourites_data = {}} =
            favourites_data[each] || {};
            const {marked_favourite_type = ""} = basic_info;
            if (marked_favourite_type === "medicine") {
                const key = Object.keys(marked_favourites_data)[0] || null;

                const {
                    basic_info: {name: medicine_name = "", id: medicine_id = null} = {},
                } = marked_favourites_data[key];

                options.push(
                    <Option
                        key={`opt-${medicine_id}`}
                        value={medicine_id}
                        onMouseDown={this.handleOnMouseDownPreventDef}
                        onClick={this.setFavMedicineValue(medicine_id, medicine_name)}
                    >
                        {this.getFavOption(medicine_id, medicine_name)}
                    </Option>
                );
            }
        }

        const {default_added = false} = this.state;
        if (default_added === false) {
            const {
                basic_info: {details: {medicine_id: medId = null} = {}} = {},
            } = medications[medication_id] || {};
            const {basic_info: {name: def_name = "", id: def_id = null} = {}} =
            medicines[medId] || {};
            options.push(
                <Option
                    key={`opt-${def_id}`}
                    value={def_id}
                    onMouseDown={this.handleOnMouseDownPreventDef}
                    onClick={this.setFavMedicineValue(def_id, def_name)}
                >
                    {this.getFavOption(def_id, def_name)}
                </Option>
            );

            this.setState({default_added: true});
        }

        const {basic_info: {name: temp_name = "", id: temp_id = null} = {}} =
        medicines[temp_medicine] || {};

        if (temp_name !== "" && temp_id !== null) {
            options.push(
                <Option
                    key={`opt-${temp_id}`}
                    value={temp_id}
                    onMouseDown={this.handleOnMouseDownPreventDef}
                    onClick={this.setFavMedicineValue(temp_id, temp_name)}
                >
                    {this.getFavOption(temp_id, temp_name)}
                </Option>
            );
        }

        return options;
    };

    isSearchingMedicine = (e) => {
        e.preventDefault();
        this.setState({searching_medicine: true});
    };

    getNewDefaultMedicine = (medicine_id, medicineName) => {
        let defaultHit = [];
        this.handleMedicineSearch(medicineName);
        // new index
        // const client = this.algoliaClient();
        // const index = client.initIndex(config.algolia.medicine_index);

        this.index.search(medicineName).then(({hits}) => {
            defaultHit = hits.filter((hit) => {
                const X = hit.medicine_id;
                return hit.medicine_id === medicine_id;
            });
            this.setState({hits: defaultHit, temp_medicine: medicine_id});
        });
    };

    setInputText = (value) => {
        this.setState({inputText: value});
    };

    getDefaultMedicine = () => {
        const {
            medications = {},
            payload: {id: medication_id} = {},
            medicines = {},
        } = this.props;

        const {temp_medicine = null} = this.state;

        let defaultHit = [];

        const {
            medicationData,
            doctors = {},
            authenticated_user = null,
        } = this.props;
        const {templatePage = false} = medicationData || {};

        let medicine_id = null;
        let medicineName = "";

        let doctor_id = null;

        for (let each in doctors) {
            const {basic_info: {id: docId = null, user_id = null} = {}} =
            doctors[each] || {};

            if (user_id === authenticated_user) {
                doctor_id = docId;
            }
        }

        // for template edit medication from patient details page
        if (medicationData && !templatePage) {
            const {medicine_id: template_medicine_id, medicine: name} =
            medicationData || {};
            if (template_medicine_id) {
                medicine_id = template_medicine_id;
                medicineName = name;
            }
        } else if (medicationData && templatePage) {
            // for template from settings page
            const {medicine_id: template_medicine_id} = medicationData || {};
            const {basic_info: {name, id} = {}} =
            medicines[template_medicine_id] || {};

            if (template_medicine_id) {
                medicine_id = template_medicine_id;
                medicineName = name;
            }
        } else {
            // for default valMedicine of edit medication w/t template
            const {
                basic_info: {details: {medicine_id: med_id = null} = {}} = {},
            } = medications[medication_id] || {};
            medicine_id = med_id;
            const {basic_info: {name, id} = {}} = medicines[medicine_id] || {};
            medicineName = name;
        }

        this.index
            .search(medicineName, {
                filters: `creator_id:${doctor_id} OR public_medicine:true OR public_medicine:1`,
            })
            .then(({hits}) => {
                defaultHit = hits.filter((hit) => hit.medicine_id === medicine_id);
                this.setState({hits: defaultHit, temp_medicine: medicine_id});
            });
    };

    // getMedicineOptions = () => {
    //   const { hits = {}, value: state_value = "" } = this.state;
    //   const { temp_medicine = "" } = this.state;

    //   const { searchOptions } = this;

    //   let defaultOption = [];

    //   const {
    //     medications = {},
    //     payload: { id: medication_id } = {},
    //     medicines = {}
    //   } = this.props;

    //   const { basic_info: { details: { medicine_id = null } = {} } = {} } =
    //     medications[medication_id] || {};

    //   const { basic_info: { name: med_name = "" } = {} } = medicines[medicine_id] || {};

    //   return Object.values(hits).map(function(hit, index) {
    //     const {
    //       medicine_id = null,
    //       name = "",
    //       generic_name = "",
    //       objectID = null
    //     } = hit;
    //     let final_name = name;
    //     let final_generic_name = generic_name;

    //     if (name === generic_name) {
    //       final_generic_name = "";
    //     }

    //     return (
    //       <Option key={`opt-${medicine_id}`} value={medicine_id}>
    //         {searchOptions(hit, index)}
    //       </Option>
    //     );
    //   });
    // };

    getMedicineOptions = () => {
        const algoliaClient = this.algoliaClient();
        const index = algoliaClient.initIndex(config.algolia.medicine_index);
        const {hits = {}} = this.state;
        let list = [];
        const {searchOptions} = this;

        const options = [];

        for (let index in hits) {
            const {
                medicine_id = null,
                name = "",
                generic_name = "",
                objectID = null,
            } = hits[index];
            let final_name = name;
            let final_generic_name = generic_name;

            if (name === generic_name) {
                final_generic_name = "";
            }

            let hit = hits[index];
            options.push(
                <Option key={`opt-${medicine_id}`} value={medicine_id}>
                    {searchOptions(hit, index)}
                </Option>
            );
        }

        if (options.length === 0) {
            const {inputText = ""} = this.state;
            options.push(
                <div
                    key={"no-match-medicine-div"}
                    className="flex align-center justify-center"
                    onClickCapture={this.handleAddMedicineOpen}
                    className="add-new-medicine-button-div"
                >
                    <Button
                        type={"ghost"}
                        size="small"
                        key={"no-match-medicine"}
                        className="add-new-medicine-button"
                        onClick={this.handleAddMedicineOpen}
                    >
                        {`${this.formatMessage(messages.addMedicine)} `}
                        <span className="fw800">{` "${inputText}"`}</span>
                    </Button>
                </div>
            );
        }

        return options;
    };

    handleAddMedicineOpen = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const {openAddMedicineDrawer, setMedicineVal} = this.props;
        const {inputText = ""} = this.state;
        setMedicineVal(inputText);
        openAddMedicineDrawer();
        const {newMedicineId = null} = this.props;
    };

    searchOptions = (hit, index) => {
        const {
            medicine_id = null,
            name = "",
            generic_name = "",
            objectID = null,
        } = hit;
        const {value, searching_medicine, temp_medicine} = this.state;
        const {formatMessage} = this;

        let final_name = name;
        let final_generic_name = generic_name;

        if (name === generic_name) {
            final_generic_name = "";
        }

        const {favourite_medicine_ids = []} = this.props;

        if (!searching_medicine) {
            this.setMedicineValue(medicine_id, name);
            return (
                <div
                    key={medicine_id}
                    className="pointer flex wp100  align-center justify-space-between"
                    onClick={this.setMedicineValue(medicine_id, name)}
                >
                    <Tooltip title={this.formatMessage(messages.name)}>
                        {" "}
                        <div className="fs18 fw800 black-85 medicine-selected pr10">
              <span
                  dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.name.value,
                  }}
              ></span>
                        </div>
                    </Tooltip>
                </div>
            );
        }

        return (
            <div
                key={medicine_id}
                className="pointer flex wp100  align-center justify-space-between"
                onClick={this.setMedicineValue(medicine_id, name)}
            >
                <div className="flex direction-column align-start justify-center">
                    <Tooltip title={this.formatMessage(messages.name)}>
                        {" "}
                        <div className="fs18 fw800 black-85">
              <span
                  dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.name.value,
                  }}
              ></span>
                        </div>
                    </Tooltip>

                    <Tooltip title="Generic Name">
                        <div className="fs16">
              <span
                  dangerouslySetInnerHTML={{
                      __html: hit._highlightResult.generic_name.value,
                  }}
              ></span>
                        </div>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip
                        placement="topLeft"
                        title={
                            favourite_medicine_ids &&
                            favourite_medicine_ids.includes(medicine_id.toString())
                                ? formatMessage(messages.unMark)
                                : formatMessage(messages.mark)
                        }
                    >
                        {favourite_medicine_ids &&
                        favourite_medicine_ids.includes(medicine_id.toString()) ? (
                            <StarFilled
                                style={{fontSize: "20px", color: "#f9c216"}}
                                onClick={this.handleremoveFavourites(medicine_id)}
                            />
                        ) : (
                            <StarOutlined
                                style={{fontSize: "20px", color: "#f9c216"}}
                                onClick={this.handleAddFavourites(medicine_id)}
                            />
                        )}
                    </Tooltip>
                </div>
            </div>
        );
    };

    setMedicineValue = (medicine_id, medicine_name) => (e) => {
        e.preventDefault();
        const {
            form: {setFieldsValue, getFieldValue},
            // setFormulation,
            enableSubmit,
        } = this.props;
        setFieldsValue({[FIELD_NAME]: medicine_id});
        this.setState({
            medicine_name: medicine_name,
            searching_medicine: false,
        });
        enableSubmit();
    };

    algoliaClient = () => {
        return algoliasearch(config.algolia.app_id, config.algolia.app_key);
    };

    formatMessage = (message) => this.props.intl.formatMessage(message);

    handleMedicineSearch = (value) => {
        const algoliaClient = this.algoliaClient();
        this.setInputText(value);
        const index = algoliaClient.initIndex(config.algolia.medicine_index);
        const {value: state_value = "", defaultHit = []} = this.state;

        const {doctors = {}, authenticated_user = null} = this.props;

        let doctor_id = null;

        for (let each in doctors) {
            const {basic_info: {id: docId = null, user_id = null} = {}} =
            doctors[each] || {};

            if (user_id === authenticated_user) {
                doctor_id = docId;
            }
        }

        index
            .search(value, {
                filters: `creator_id:${doctor_id} OR public_medicine:true OR public_medicine:1`,
            })
            .then(({hits}) => {
                if (value !== state_value) {
                    this.setState({
                        hits,
                        value,
                        searching_medicine: true,
                    });
                }
            });
    };

    onOptionSelect = (value) => {
        const {enableSubmit} = this.props;
        this.setState({medicine_id: value, temp_medicine: value});
        enableSubmit();
    };

    dropdownVisible = (open) => {
        const {searching_medicine = false} = this.state;
        const {temp_medicine = ""} = this.state;
        this.setState({searching_medicine: open, temp_medicine: ""});
        if (open === false) {
            this.setState({inputText: ""});
        }
    };

    getParentNode = (t) => t.parentNode;

    handleOnBlur = () => {
        const {medicine_id = null} = this.state;
        const {
            medications = {},
            payload: {id: medication_id} = {},
            medicines = {},
        } = this.props;

        let {
            basic_info: {
                details: {medicine_id: default_medicine_id = null} = {},
            } = {},
        } = medications[medication_id] || {};

        const {medicationData} = this.props;

        if (medicationData) {
            const {medicine_id: template_medicine_id} = medicationData || {};
            if (template_medicine_id) {
                default_medicine_id = template_medicine_id;
            }
        }

        if (medicine_id) {
            this.setState({
                temp_medicine: medicine_id,
            });
        } else if (default_medicine_id) {
            this.setState({
                temp_medicine: default_medicine_id,
            });
        }
    };

    getLabel = () => {
        return (
            <Fragment>
        <span className="form-label">
          {this.formatMessage(messages.addMedicine)}
        </span>
                <span className="star-red">*</span>
            </Fragment>
        );
    };

    render() {
        const {
            fetchingMedicines,
            medicine_name: med_name = "",
            temp_medicine = "",
            inputText = "",
            searching_medicine = false,
        } = this.state;

        const {
            getMedicineOptions,
            handleMedicineSearch,
            getParentNode,
            getFavouriteOptions,
        } = this;

        const {
            form: {getFieldDecorator},
            medicines,
            favourite_medicine_ids = [],
        } = this.props;

        return (
            <FormItem label={this.getLabel()}>
                {getFieldDecorator(FIELD_NAME, {
                    initialValue: temp_medicine ? `${temp_medicine}` : "",
                })(
                    <InstantSearch
                        indexName={config.algolia.medicine_index}
                        searchClient={this.algoliaClient()}
                    >
                        <Select
                            onSearch={handleMedicineSearch}
                            notFoundContent={
                                fetchingMedicines ? <Spin size="small"/> : "No match found"
                            }
                            className="drawer-select medicine-search-select"
                            placeholder="Choose Medicine"
                            showSearch
                            onSelect={this.onOptionSelect}
                            defaultActiveFirstOption={true}
                            value={temp_medicine}
                            onDropdownVisibleChange={this.dropdownVisible}
                            autoComplete="off"
                            optionFilterProp="children"
                            filterOption={(input, option) => {
                                return option.props.children;
                            }}
                            getPopupContainer={getParentNode}
                            onBlur={this.handleOnBlur}
                        >
                            {inputText === "" && favourite_medicine_ids.length > 0
                                ? //   && temp_medicine == ''
                                getFavouriteOptions()
                                : getMedicineOptions()}
                        </Select>
                    </InstantSearch>
                )}
            </FormItem>
        );
    }
}

const Field = injectIntl(Medicine);

export default {
    field_name: FIELD_NAME,
    render: (props) => <Field {...props} />,
};

import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Table, Icon, Empty, Select } from "antd";
import generateRow from "./datarow";
// import { USER_PERMISSIONS } from '../../../constant'
import getColumn from "./header";
import messages from "./messages";
import message from "antd/es/message";
import EditRecommendSubscription from "../Drawer/RecommendSubscription/EditRecommendSubscription";
import MyTasks from "../Drawer/MyTasks/index";
import Button from "antd/es/button";
import Input from "antd/es/input";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import { TABLE_COLUMN } from "./helper";
import EditAppointmentDrawer from "./../../../Containers/Drawer/editAppointment";
import { LoadingOutlined } from "@ant-design/icons";
import isEmpty from "../../../Helper/is-empty";
import Reassignment from "../../Subscription/Drawer/Reassignment/Reassignment";

class ScheduledActivitiesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editServiceDrawer: false,
      myTasksDrawer: false,
      sortState: 0,
      searchPatient: "",
      patientOptions: [],
      searchPatientId: "",
      reassignmentDrawer: false,
      patientId: "",
      activityData: "",
    };
  }

  componentDidMount() {
    const { getAllActivities, getAppointmentsDetails } = this.props;
    getAllActivities("scheduled");
    getAppointmentsDetails();
  }

  componentDidUpdate(prevProps, prevState) {}

  getLoadingComponent = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return {
      indicator: antIcon,
    };
  };

  onCloseDrawer = () => {
    this.setState({ editServiceDrawer: false, myTasksDrawer: false });
  };

  onOpenEditServiceDrawer = () => {
    this.setState({ editServiceDrawer: true });
  };
  onOpenMyTasksDrawer = () => {
    this.setState({ myTasksDrawer: true });
  };

  handleEdit = async (activityData) => {
    const {
      openEditAppointmentDrawer,
      setScheduleAppontmentData,
      // getAppointments,
    } = this.props;

    if (activityData.activity_status === "completed") {
      message.warn("Appointment for the completed activity can't be edited");
    } else {
      let finalActivityData = activityData;
      finalActivityData.fromButton = "edit";
      setScheduleAppontmentData(finalActivityData);

      const patient_id = activityData.patient_id;
      const id = activityData.appointment_id;
      const canViewDetails = false;
      // const response = await getAppointments(patient_id);

      openEditAppointmentDrawer({ id, patient_id, canViewDetails });
    }
  };

  reassignmentHandler = (activityData) => {
    console.log("activityData", activityData);
    let patientId = activityData.patient_id;
    this.setState({
      reassignmentDrawer: true,
      patientId: patientId,
      activityData: activityData,
    });
  };

  onPatientNameClick = (activityData) => {
    const { openPatientDetailsDrawer } = this.props;
    openPatientDetailsDrawer({ patient_id: activityData.patient_id });
  };

  formatMessage = (data) => this.props.intl.formatMessage(data);

  getDataSource = () => {
    const {
      activities,
      // doctors = {},
      // doctorPaymentProducts={},
      // deleteDoctorPaymentProduct,
      // openConsultationFeeDrawer,
      // intl: { formatMessage } = {},
      // payment_products = {},
      history,
    } = this.props;

    let finalObject = {};
    let filteredArray = Object.keys(activities).forEach(function (key) {
      if (activities[key].status === "scheduled") {
        finalObject[key] = activities[key];
      }
    });

    let options = [];

    for (let each in finalObject) {
      options.push(
        generateRow({
          id: finalObject[each].id,
          activities: finalObject[each],
          history,
          handleEdit: this.handleEdit,
          onPatientNameClick: this.onPatientNameClick,
          reassignmentHandler: this.reassignmentHandler,
          // transaction_ids,
          // payment_products,
          // patients,
          // doctors,
          // users,
          // authenticated_category,
          // user_roles,
        })
      );
    }

    return options;
  };

  // SEARCH PATIENTS HANDLER

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    const { searchPatientId } = this.state;

    if (isEmpty(searchPatientId)) {
      alert("Please select patient");
    } else {
      alert(JSON.stringify(searchPatientId));
    }
    // console.log("searchPatient", this.state.searchPatient);
    // console.log("selectedKeys", selectedKeys);
    // console.log("dataIndex", dataIndex);
    // console.log("confirm", confirm);
    confirm();
    // this.setState({
    //   searchText: selectedKeys[0],
    //   searchedColumn: dataIndex,
    // });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    // this.setState({ searchText: "" });
  };

  handlePatientSelect = (value, data) => {
    this.setState({
      searchPatient: data.value,
      searchPatientId: data.id,
    });
  };
  handlePatientChange = async (value) => {
    const { searchTxActivites } = this.props;
    const response = await searchTxActivites(value);
    const {
      payload: {
        data: { patients = [] },
      },
    } = response;
    this.setState({ patientOptions: patients });
  };

  getPatientNameOptions = () => {
    const { patientOptions } = this.state;
    const { Option } = Select;

    const children = [];

    for (let each in patientOptions) {
      children.push(
        <Option
          key={patientOptions[each].full_name}
          id={patientOptions[each].id}
        >
          {patientOptions[each].full_name}
        </Option>
      );
    }

    return children;
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8, width: "300px" }}>
        {/* <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: "100%", marginBottom: 8, display: "block" }}
        /> */}

        <div className="mt10 mb10  cdss-select">
          <Select
            showSearch={true}
            // mode="tags"
            style={{ width: "100%" }}
            // tokenSeparators={[","]}
            placeholder="Search for patient"
            onSearch={this.handlePatientChange}
            onChange={this.handlePatientSelect}
            value={this.state.searchPatient}
            // onDeselect={hendleSymptomDeselect}
          >
            {/* {children} */}
            {this.getPatientNameOptions()}
          </Select>
        </div>

        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          {this.formatMessage(messages.searchText)}
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          {this.formatMessage(messages.resetText)}
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      if (dataIndex === TABLE_COLUMN.PATIENT.dataIndex) {
        // const { carePlanData = {} } = record[dataIndex] || {};
        // const { treatment = "" } = carePlanData;
        // return treatment
        //   ? treatment.toString().toLowerCase().includes(value.toLowerCase())
        //   : "";
      } else if (dataIndex === TABLE_COLUMN.PATIENT.dataIndex) {
        // const { patientData = {} } = record[dataIndex] || {};
        // const { carePlanData = {} } = patientData;
        // const { details: { diagnosis = {} } = {} } = carePlanData;
        // const { type = "1", description = "" } = diagnosis || {};
        // const diagnosisType = DIAGNOSIS_TYPE[type];
        // const diagnosisTypeValue = diagnosisType["value"] || "";
        // const recordText = `${diagnosisTypeValue} ${description}`;
        // return recordText
        //   ? recordText.toString().toLowerCase().includes(value.toLowerCase())
        //   : "";
      }
    },
    // onFilterDropdownVisibleChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => this.searchInput.select(), 100);
    //   }
    // },
  });

  onChange = (pagination, filters, sorter, extra) => {
    const { getAllActivities } = this.props;
    const { columnKey, order } = sorter;
    console.log("columnKey", columnKey);

    console.log("order", order);
    if (order === "descend") {
      getAllActivities("scheduled", "ASC");
      this.setState({
        sortState: 1,
      });
    } else {
      getAllActivities("scheduled", "DESC");
      this.setState({
        sortState: 0,
      });
    }

    // const {
    //   currentTab = CURRENT_TAB.ALL_PATIENTS,
    //   tabState = {},
    //   sortByName,
    //   sortByCreatedAt,
    //   changeTabState,
    // } = this.props;

    // const { searchTreatmentText = "", searchDiagnosisText = "" } = this.state;

    // if (
    //   (columnKey !== TABLE_COLUMN.CREATED_AT.key &&
    //     columnKey !== TABLE_COLUMN.PID.key) ||
    //   searchTreatmentText.length > 0 ||
    //   searchDiagnosisText.length > 0
    // ) {
    //   return;
    // }

    // if (columnKey === TABLE_COLUMN.CREATED_AT.key) {
    //   if (!order) {
    //     // sort by createdAt  asc
    //     sortByCreatedAt({ currentTab });
    //     changeTabState({ currentTab, type: SORT_CREATEDAT, value: 1 });
    //   } else {
    //     // sort by created at asc or desc

    //     sortByCreatedAt({ currentTab });

    //     if (order === ASCEND) {
    //       changeTabState({ currentTab, type: SORT_CREATEDAT, value: 1 });
    //     } else if (order === DESCEND) {
    //       changeTabState({ currentTab, type: SORT_CREATEDAT, value: 0 });
    //     }
    //   }
    // } else if (columnKey === TABLE_COLUMN.PID.key) {
    //   if (!order) {
    //     // sort by name ascending

    //     sortByName({ currentTab });
    //     changeTabState({ currentTab, type: SORT_NAME, value: 0 });
    //   } else {
    //     // sort ascending or descending
    //     sortByName({ currentTab });

    //     if (order === ASCEND) {
    //       changeTabState({ currentTab, type: SORT_NAME, value: 0 });
    //     } else if (order === DESCEND) {
    //       changeTabState({ currentTab, type: SORT_NAME, value: 1 });
    //     }
    //   }
    // }

    // this.handleGetPatients();
  };

  render() {
    const { editServiceDrawer, myTasksDrawer, reassignmentDrawer } = this.state;
    const {
      // onRow,
      onSelectChange,
      // getLoadingComponent,
      getDataSource,
    } = this;

    const rowSelection = {
      onChange: onSelectChange,
    };

    const {
      loading,
      pagination_bottom,
      authPermissions = [],
      intl: { formatMessage } = {},
    } = this.props;

    const locale = {
      //   emptyText: this.formatMessage(messages.emptyConsultationTable),
      emptyText: "No consultation fee to display yet",
    };

    return (
      <>
        <Table
          // onRow={authPermissions.includes(USER_PERMISSIONS.PATIENTS.VIEW) ? onRow : null}
          rowClassName={() => "pointer"}
          // loading={loading === true ? getLoadingComponent() : false}
          columns={getColumn({
            //   formatMessage,
            sortState: this.state.sortState,
            className: "pointer",
            getColumnSearchProps: this.getColumnSearchProps,
          })}
          dataSource={getDataSource()}
          scroll={{ x: "100%" }}
          pagination={{
            position: "bottom",
            pageSize: 10,
          }}
          locale={locale}
          onChange={this.onChange}
        />
        {editServiceDrawer === true && (
          <EditRecommendSubscription
            visible={editServiceDrawer}
            onCloseDrawer={this.onCloseDrawer}
          />
        )}
        {reassignmentDrawer === true && (
          <Reassignment
            visible={reassignmentDrawer}
            onCloseDrawer={this.onCloseDrawer}
            activityData={this.state.activityData}
            status={"scheduled"}
          />
        )}
        {myTasksDrawer === true && (
          <MyTasks visible={myTasksDrawer} onCloseDrawer={this.onCloseDrawer} />
        )}
        <EditAppointmentDrawer carePlan={{}} carePlanId={"1"} />
      </>
    );
  }
}

export default injectIntl(ScheduledActivitiesTable);

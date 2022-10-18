import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Table, Icon, Empty } from "antd";
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

class ScheduledActivitiesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editServiceDrawer: false,
      myTasksDrawer: false,
    };
  }

  componentDidMount() {
    const { getAllActivities, getAppointmentsDetails } = this.props;
    getAllActivities();
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

  handleEdit = (activityData) => {
    const { openEditAppointmentDrawer, setScheduleAppontmentData } = this.props;

    let finalActivityData = activityData;
    finalActivityData.fromButton = "edit";
    setScheduleAppontmentData(finalActivityData);

    const patient_id = 1;
    const id = activityData.appointment_id;
    const canViewDetails = false;

    openEditAppointmentDrawer({ id, patient_id, canViewDetails });
  };

  onPatientNameClick = () => {
    const { openPatientDetailsDrawer } = this.props;
    openPatientDetailsDrawer({ patient_id: 1 });
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

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
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
        />

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
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
  });

  render() {
    const { editServiceDrawer, myTasksDrawer } = this.state;
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
            className: "pointer",
            getColumnSearchProps: this.getColumnSearchProps,
          })}
          dataSource={getDataSource()}
          scroll={{ x: "100%" }}
          pagination={{
            position: "bottom",
            pageSize: 3,
          }}
          locale={locale}
        />
        {editServiceDrawer === true && (
          <EditRecommendSubscription
            visible={editServiceDrawer}
            onCloseDrawer={this.onCloseDrawer}
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

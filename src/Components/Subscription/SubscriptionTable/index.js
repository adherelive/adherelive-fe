import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Table, Icon, Empty } from "antd";
import generateRow from "./datarow";
// import { USER_PERMISSIONS } from '../../../constant'
import getColumn from "./header";
import messages from "./messages";
import message from "antd/es/message";
import EditRecommendSubscription from "../Drawer/RecommendSubscription/EditRecommendSubscription";
import EditRecommendService from "../Drawer/RecommendService/EditRecommendService";
import MyTasks from "../Drawer/MyTasks/index";
import { LoadingOutlined } from "@ant-design/icons";

class SubscriptionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editSubscriptionDrawer: false,
      editServiceDrawer: false,
      myTasksDrawer: false,
      editData: {},
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  getLoadingComponent = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return {
      indicator: antIcon,
    };
  };

  onCloseDrawer = () => {
    this.setState({
      editServiceDrawer: false,
      myTasksDrawer: false,
      editSubscriptionDrawer: false,
    });
  };

  onOpenEditServiceDrawer = (data) => {
    if (data.type === "service") {
      this.setState({ editServiceDrawer: true, editData: data });
    } else {
      this.setState({ editSubscriptionDrawer: true, editData: data });
    }
  };
  onOpenMyTasksDrawer = () => {
    this.setState({ myTasksDrawer: true });
  };

  formatMessage = (data) => this.props.intl.formatMessage(data);

  getDataSource = () => {
    const {
      doctors = {},
      // doctorPaymentProducts={},
      deleteDoctorPaymentProduct,
      openConsultationFeeDrawer,
      intl: { formatMessage } = {},
      payment_products = {},
      recommendServices,
    } = this.props;

    // const {onRowClick} = this;
    let options = [];

    for (let each in recommendServices) {
      // const { creator_role_id = null, for_user_role_id = null } =
      // recommendServices[each] || {};
      // if (creator_role_id !== null) {
      options.push(
        generateRow({
          ...recommendServices[each],
          // deleteDoctorProduct: deleteDoctorPaymentProduct,
          // openConsultationFeeDrawer,
          onOpenEditServiceDrawer: this.onOpenEditServiceDrawer,
          onOpenMyTasksDrawer: this.onOpenMyTasksDrawer,
          formatMessage,
          // doctors,
          // editable: creator_role_id === for_user_role_id ? true : false,
        })
      );
      // }
    }

    console.log(options);

    return options;
  };

  render() {
    const {
      editServiceDrawer,
      myTasksDrawer,
      editSubscriptionDrawer,
      editData,
    } = this.state;
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
          <EditRecommendService
            visible={editServiceDrawer}
            onCloseDrawer={this.onCloseDrawer}
            editData={editData}
          />
        )}
        {editSubscriptionDrawer === true && (
          <EditRecommendSubscription
            visible={editSubscriptionDrawer}
            onCloseDrawer={this.onCloseDrawer}
            editData={editData}
          />
        )}
        {myTasksDrawer === true && (
          <MyTasks visible={myTasksDrawer} onCloseDrawer={this.onCloseDrawer} />
        )}
      </>
    );
  }
}

export default injectIntl(SubscriptionTable);

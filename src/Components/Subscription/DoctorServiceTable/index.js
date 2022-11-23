import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Table, Empty } from "antd";
import generateRow from "./datarow";
// import { USER_PERMISSIONS } from '../../../constant'
import getColumn from "./header";
import messages from "./messages";
import message from "antd/es/message";
import EditService from "../Drawer/AddService/EditService";
import { LoadingOutlined } from "@ant-design/icons";

class DoctorServiceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editServiceDrawer: false,
      editServiceData: {},
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
    this.setState({ editServiceDrawer: false });
  };

  onOpenEditServiceDrawer = (data) => {
    this.setState({ editServiceDrawer: true, editServiceData: data });
  };

  //   formatMessage = (data) => this.props.intl.formatMessage(data);

  getDataSource = () => {
    const {
      doctors = {},
      // doctorPaymentProducts={},
      deleteDoctorPaymentProduct,
      openConsultationFeeDrawer,
      intl: { formatMessage } = {},
      payment_products = {},
      services,
    } = this.props;

    // const {onRowClick} = this;
    let options = [];

    for (let each in services) {
      // const { creator_role_id = null, for_user_role_id = null } =
      //   dummyProducts[each] || {};
      // if (creator_role_id !== null) {
      options.push(
        generateRow({
          id: services[each].id,
          services: services[each],
          deleteDoctorProduct: deleteDoctorPaymentProduct,
          // openConsultationFeeDrawer,
          onOpenEditServiceDrawer: this.onOpenEditServiceDrawer,
          formatMessage,
          // doctors,
          // editable: creator_role_id === for_user_role_id ? true : false,
        })
      );
      // }
    }

    // console.log(options);

    return options;
  };

  render() {
    const { editServiceDrawer, editServiceData } = this.state;
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
            position: "top",
            pageSize: 3,
          }}
          locale={locale}
        />
        {editServiceDrawer === true && (
          <EditService
            visible={editServiceDrawer}
            onCloseDrawer={this.onCloseDrawer}
            editServiceData={editServiceData}
          />
        )}
      </>
    );
  }
}

export default injectIntl(DoctorServiceTable);

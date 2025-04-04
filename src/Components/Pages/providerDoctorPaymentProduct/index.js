import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import message from "antd/es/message";
import Button from "antd/es/button";
import { Dropdown } from "antd";
import Menu from "antd/es/menu";

import AddConsultationFeeDrawer from "../../../Containers/Drawer/addConsultationFee";

// import DoctorConsultationFeeTable from "../../../Containers/DoctorConsultationFee";
import messages from "./messages";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import Loading from "../../Common/Loading";

// code implementation after phase 1 for Subscription
import AddService from "../../../Components/Subscription/Drawer/AddService";
import AddSubscription from "../../../Components/Subscription/Drawer/AddSubscription";
import DoctorServiceTable from "../../../Components/Subscription/DoctorServiceTable";
import MySubscriptionList from "../../../Components/Subscription/MySubscriptionList";

class ProviderDoctorPaymentProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchingDoctorPayments: false,
            defaultPaymentsProducts: {},
            doctorPaymentProducts: {},
            noDoctorPaymentProducts: true,
            isUpdated: false,
            loading: false,
            // code implementation after phase 1 for Subscription
            addServiceDrawer: false,
            addSubscriptionDrawer: false,
        };
    }

    componentDidMount() {
        const {match: {params: {id = null} = {}} = {}} = this.props;
        this.handleGetDoctorPaymentProduct(id);
        this.handleGetAdminPaymentProduct();
        // code implementation after phase 1 for Subscription
        // this.props.getServices();
        // this.props.getSubscriptions();
        this.props.getProviderServices(id);
        this.props.getProviderSubscriptions(id);
    }

    async handleGetDoctorPaymentProduct(id) {
        try {
            this.setState({fetchingDoctorPayments: true, loading: true});
            const {getDoctorPaymentProduct} = this.props;
            const response = await getDoctorPaymentProduct({doctor_id: id});
            const {
                status,
                payload: {data: {payment_products = {}} = {}} = {},
                statusCode,
            } = response || {};
            if (status && statusCode === 200) {
                this.setState({
                    fetchingDoctorPayments: false,
                    doctorPaymentProducts: payment_products,
                    noDoctorPaymentProducts: false,
                    loading: false,
                });
            } else if (!status && statusCode === 201) {
                this.setState({
                    fetchingDoctorPayments: false,
                    doctorPaymentProducts: {},
                    noDoctorPaymentProducts: true,
                    loading: false,
                });
            } else {
                this.setState({fetchingDoctorPayments: false});
            }
        } catch (err) {
            console.log("err ", err);
            message.warn(this.formatMessage(messages.somethingWentWrong));
            this.setState({fetchingDoctorPayments: false});
        }
    }

    async handleGetAdminPaymentProduct() {
        try {
            this.setState({fetchingAdminPayments: true});
            const {getAdminPaymentProduct} = this.props;
            const response = await getAdminPaymentProduct();
            const {status, payload: {data: {payment_products = {}} = {}} = {}} =
            response || {};
            if (status) {
                this.setState({
                    fetchingAdminPayments: false,
                    defaultPaymentsProducts: payment_products,
                });
            } else {
                this.setState({fetchingAdminPayments: false});
            }
        } catch (err) {
            console.log("err ", err);
            message.warn(this.formatMessage(messages.somethingWentWrong));
            this.setState({fetchingAdminPayments: false});
        }
    }

    // code implementation after phase 1 for Subscription

    handleServiceDrawer = () => {
        this.setState({
            addServiceDrawer: true,
        });
    };
    handleSubscriptionDrawer = () => {
        this.setState({
            addSubscriptionDrawer: true,
        });
    };

    onCloseDrawer = () => {
        this.setState({
            addServiceDrawer: false,
            addSubscriptionDrawer: false,
        });
    };

    formatMessage = (data) => this.props.intl.formatMessage(data);

    setIsUpdated = () => {
        this.setState({isUpdated: true});
        const {match: {params: {id = null} = {}} = {}} = this.props;
        this.handleGetDoctorPaymentProduct(id);
    };

    noConsultationFeeDisplay = () => {
        return (
            <div className="wp100 mb20 flex direction-column align-center justify-center">
                <div className="br-lightgrey h200 w200 br4"></div>
                <div className="mt20 fs25 fw700 black-85">
                    {this.formatMessage(messages.noConsultationFeeAdded)}
                </div>
                <div className="mt20 fs18 fw600 ">
                    {this.formatMessage(messages.notAddedFeesYet)}
                </div>

                <div className="mt20">
                    {/* <Button type="primary" onClick={this.displayAddDoctorPaymentProduct}>
            <span className="w200 fs20">
              {this.formatMessage(messages.addFee)}
            </span>
          </Button> */}
                    {/* code implementation after phase 1 for Subscriptions */}
                    <Button type="primary" onClick={this.handleServiceDrawer}>
            <span className="w200 fs20">
              {/* {this.formatMessage(messages.addFee)} */}
                Add Service
            </span>
                    </Button>
                </div>
            </div>
        );
    };

    consultationFeeDisplay = () => {
        const {
            noDoctorPaymentProducts,
            doctorPaymentProducts,
            loading = false,
        } = this.state;
        const {match: {params: {id: doctor_id = null} = {}} = {}} =
            this.props;
        const {services} = this.props;

        if (loading) {
            return <Loading/>;
        }

        return (
            <div className="wp100 flex p10 direction-column justify-space-between">
                <div className="wp100">
                    {Object.keys(services).length === 0 ? (
                        <div className="wp100 justify-center align-center">
                            {this.noConsultationFeeDisplay()}
                        </div>
                    ) : (
                        <div className="wp100 flex direction-column align-center justify-center">
                            {/* <ConsultationFeeTable
                doctorPaymentProducts={doctorPaymentProducts}
                deleteDoctorProduct={this.deleteDoctorProduct}
                editDoctorProduct={this.displayEditDoctorPaymentProduct}
              /> */}

                            {/* <DoctorConsultationFeeTable
                doctor_id={doctor_id}
              /> */}
                            {/* code implementation after phase 1 for Subscriptions */}
                            <DoctorServiceTable services={services}/>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    displayAddDoctorPaymentProduct = () => {
        const {openConsultationFeeDrawer} = this.props;
        openConsultationFeeDrawer();
    };

    displayEditDoctorPaymentProduct = (id) => () => {
        const {openConsultationFeeDrawer} = this.props;
        const {doctorPaymentProducts} = this.state;
        const {[id]: paymentData} = doctorPaymentProducts;
        openConsultationFeeDrawer(paymentData);
    };

    deleteDoctorProduct = (id, name, type, amount) => () => {
        this.handleDeleteDoctorPaymentProduct(id, name, type, amount);
    };

    async handleDeleteDoctorPaymentProduct(id, name, type, amount) {
        try {
            const {deleteDoctorPaymentProduct} = this.props;
            const payload = {id, name, type, amount};
            const response = await deleteDoctorPaymentProduct(payload);
            const {
                status,
                payload: {data: {payment_products = {}} = {}} = {},
                statusCode,
            } = response || {};

            if (status) {
                this.setIsUpdated();
                message.success(
                    this.formatMessage(messages.deleteDoctorProductSuccess)
                );
            }
        } catch (err) {
            console.log("err ", err);
            message.warn(this.formatMessage(messages.somethingWentWrong));
        }
    }

    getMenu = () => {
        return (
            <Menu>
                <Menu.Item onClick={this.handleServiceDrawer}>
                    <div>{this.formatMessage(messages.menuTitleService)}</div>
                </Menu.Item>

                <Menu.Item onClick={this.handleSubscriptionDrawer}>
                    <div>{this.formatMessage(messages.menuTitleSubscription)}</div>
                </Menu.Item>
            </Menu>
        );
    };

    renderHeader = () => {
        const {noDoctorPaymentProducts} = this.state;
        const {services} = this.props;
        return (
            <div className="wp100 pt20  mb20 fs28 fw700 flex justify-space-between align-center">
                <div className="ml20 flex flex-start align-center">
                    <ArrowLeftOutlined onClick={this.handleBack} className="mr10"/>
                    {this.formatMessage(messages.consultation_fee_header_text)}
                </div>

                {Object.keys(services).length !== 0 && (
                    <div className="flex flex-end align-center">
                        {/* <Button
              type="primary"
              className="ml10 mr20 add-button "
              icon={"plus"}
              onClick={this.displayAddDoctorPaymentProduct}
            >
              <span className="fs16">
                {this.formatMessage(messages.addMore)}
              </span>
            </Button> */}
                        {/* code implementation after phase 1 for Subscriptions */}
                        <Dropdown
                            overlay={this.getMenu()}
                            trigger={["click"]}
                            placement="bottomRight"
                        >
                            <Button
                                type="primary"
                                className="ml10 mr20 add-button "
                                icon={<PlusOutlined/>}
                            >
                                <span className="fs16">Add More</span>
                            </Button>
                        </Dropdown>
                    </div>
                )}
            </div>
        );
    };

    handleBack = (e) => {
        e.preventDefault();
        const {history} = this.props;
        history.goBack();
    };

    render() {
        const {match: {params: {id = null} = {}} = {}} = this.props;

        return (
            <Fragment>
                {this.renderHeader()}
                {this.consultationFeeDisplay()}
                <div className="wp100 ml20 mt20">
                    <MySubscriptionList/>
                </div>
                <AddConsultationFeeDrawer
                    defaultPaymentsProducts={this.state.defaultPaymentsProducts}
                    setIsUpdated={this.setIsUpdated}
                    doctor_id={id}
                />
                {/* code implementation after phase 1 for Subscriptions */}
                <AddService
                    visible={this.state.addServiceDrawer}
                    onCloseDrawer={this.onCloseDrawer}
                    doctor_id={id}
                />
                <AddSubscription
                    visible={this.state.addSubscriptionDrawer}
                    onCloseDrawer={this.onCloseDrawer}
                    doctor_id={id}
                />
            </Fragment>
        );
    }
}

export default injectIntl(ProviderDoctorPaymentProduct);

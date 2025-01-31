import {connect} from "react-redux";
import ProviderDoctorPaymentProduct from "../../../Components/Pages/providerDoctorPaymentProduct";
import {withRouter} from "react-router-dom";
import {
    addDoctorPaymentProduct,
    deleteDoctorPaymentProduct,
    getAdminPaymentProduct,
    getDoctorPaymentProduct,
} from "../../../modules/doctors";
import {open} from "../../../modules/drawer";
import {DRAWER} from "../../../constant";

// code implementation after phase 1 for Subscription
import {getProviderServices} from "../../../modules/subscription/services";
import {getProviderSubscriptions} from "../../../modules/subscription/subscriptions";

const mapStateToProps = (state) => {
    const {
        users = {}, // code implementation after phase 1 for Subscription
        subscription: {services = {}},
    } = state;

    return {
        users,
        services,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAdminPaymentProduct: () => dispatch(getAdminPaymentProduct()),
        getDoctorPaymentProduct: (data) => dispatch(getDoctorPaymentProduct(data)),
        addDoctorPaymentProduct: (data) => dispatch(addDoctorPaymentProduct(data)),
        openConsultationFeeDrawer: (payload) =>
            dispatch(open({type: DRAWER.ADD_CONSULTATION_FEE, payload})),
        deleteDoctorPaymentProduct: (data) =>
            dispatch(deleteDoctorPaymentProduct(data)),
        // code implementation after phase 1 for Subscription
        getProviderServices: (doctorId) => dispatch(getProviderServices(doctorId)),
        getProviderSubscriptions: (doctorId) =>
            dispatch(getProviderSubscriptions(doctorId)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ProviderDoctorPaymentProduct)
);

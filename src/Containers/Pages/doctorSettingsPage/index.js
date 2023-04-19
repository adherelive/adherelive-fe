import { connect } from "react-redux";
import DoctorSettingsPage from "../../../Components/Pages/doctorSettingsPage";
import { withRouter } from "react-router-dom";
import {
  getDoctorProfileDetails,
  getAdminPaymentProduct,
  getDoctorPaymentProduct,
  addDoctorPaymentProduct,
  deleteDoctorPaymentProduct,
} from "../../../modules/doctors";
import {
  addAccountDetails,
  getAccountDetails,
  deleteAccountDetails,
  updateAccountDetails,
} from "../../../modules/accountDetails";
import { open } from "../../../modules/drawer";
import { DRAWER } from "../../../constant";

// AKSHAY NEW CODE FOR SUBSCRIPTIONS

import { getServices } from "../../../modules/subscription/services";
import {
  getSubscriptions,
  setSubscriptionDrawer,
} from "../../../modules/subscription/subscriptions";

const mapStateToProps = (state) => {
  const {
    auth,
    user_roles = {},
    users = {},
    doctors = {},
    auth: {
      authPermissions = [],
      authenticated_user = 1,
      authenticated_category,
    } = {},
    account_details = {},
    // AKSHAY NEW CODE FOR SUBSCRIPTION
    subscription: { services = {}, addSubscriptionDrawer = false },
    providers,
  } = state;

  return {
    auth,
    users,
    doctors,
    authPermissions,
    authenticated_user,
    authenticated_category,
    account_details,
    user_roles,
    services,
    providers,
    addSubscriptionDrawer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDoctorDetails: (id) => () => dispatch(getDoctorProfileDetails()),
    getAdminPaymentProduct: () => dispatch(getAdminPaymentProduct()),
    getDoctorPaymentProduct: () => dispatch(getDoctorPaymentProduct()),
    addDoctorPaymentProduct: (data) => dispatch(addDoctorPaymentProduct(data)),
    openConsultationFeeDrawer: (payload) =>
      dispatch(open({ type: DRAWER.ADD_CONSULTATION_FEE, payload })),
    deleteDoctorPaymentProduct: (data) =>
      dispatch(deleteDoctorPaymentProduct(data)),
    openRazorpayAccountDetailsDrawer: (payload) =>
      dispatch(open({ type: DRAWER.ADD_RAZORPAY_ACCOUNT_DETAILS })),
    openEditRazorpayAccountDetailsDrawer: (payload) =>
      dispatch(open({ type: DRAWER.EDIT_RAZORPAY_ACCOUNT_DETAILS })),
    addAccountDetails: (payload) => dispatch(addAccountDetails(payload)),
    getAccountDetails: (provider_id = null) =>
      dispatch(getAccountDetails(provider_id)),
    deleteAccountDetails: (id) => dispatch(deleteAccountDetails(id)),
    updateAccountDetails: (id, payload) =>
      dispatch(updateAccountDetails(id, payload)),
    // AKSHAY NEW CODE FOR SUBSCRIPTION
    getServices: () => dispatch(getServices()),
    getSubscriptions: () => dispatch(getSubscriptions()),
    setSubscriptionDrawer: (value) => dispatch(setSubscriptionDrawer(value)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorSettingsPage)
);

import {connect} from "react-redux";
import DoctorTransactionPage from "../../../Components/Pages/doctorTransactionPage";
import {withRouter} from "react-router-dom";
// AKSHAY NEW CODE FOR SUBSCRIPTION
import {getAllTransactions} from "../../../modules/subscription/transactions/index";

const mapStateToProps = (state) => {
    const {
        // AKSHAY NEW CODE FOR SUBSCRIPTION
        subscription: {transactions = {}},
    } = state;
    return {
        transactions: transactions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTransactions: () => dispatch(getAllTransactions()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DoctorTransactionPage)
);

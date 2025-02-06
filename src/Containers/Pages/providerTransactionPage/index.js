import { connect } from "react-redux";
import ProviderTransactionPage from "../../../Components/Pages/providerTransactionPage";
import { withRouter } from "react-router-dom";
// code implementation after phase 1 for Subscription
import { getAllTransactions } from "../../../modules/subscription/transactions/index";

const mapStateToProps = (state) => {
    const {
        // code implementation after phase 1 for Subscription
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
    connect(mapStateToProps, mapDispatchToProps)(ProviderTransactionPage)
);

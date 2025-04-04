import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MedicineTable from "../../Components/Medicines/table";
import {
    deleteMedicine,
    getPrivateMedicines,
    getPublicMedicines,
    makeMedicinePublic,
    mapMedicineToPublic,
    resetSearchPrivate,
    resetSearchPublic,
} from "../../modules/medicines";

const mapStateToProps = (state) => {
    const {
        medicines = {},
        pages: {admin_medicines = {}, admin_search_medicines = {}} = {},
        doctors = {},
    } = state;

    return {
        medicines,
        admin_medicines,
        admin_search_medicines,
        doctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPublicMedicines: ({value, offset}) =>
            dispatch(getPublicMedicines({value, offset})),
        getPrivateMedicines: ({value, offset}) =>
            dispatch(getPrivateMedicines({value, offset})),
        makeMedicinePublic: ({medicine_id, offset}) =>
            dispatch(makeMedicinePublic({medicine_id, offset})),
        resetSearchPrivate: () => dispatch(resetSearchPrivate()),
        resetSearchPublic: () => dispatch(resetSearchPublic()),
        mapMedicineToPublic: (medicine) => dispatch(mapMedicineToPublic(medicine)),
        deleteMedicine: ({medicine_id, offset}) =>
            dispatch(deleteMedicine({medicine_id, offset})),
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
        // mergeProps
    )(MedicineTable)
);

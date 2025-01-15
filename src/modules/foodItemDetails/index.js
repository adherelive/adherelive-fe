import {ADD_FOOD_ITEM_COMPLETED, EDIT_FOOD_ITEM_COMPLETED, STORE_FOOD_ITEM_AND_DETAILS,} from "../foodItems";
import {GET_SINGLE_DIET_DETAILS_COMPLETED} from "../../modules/diets";

function foodItemDetailsReducer(state, data) {
    const {food_items, food_item_details} = data || {};
    if (food_items && food_item_details) {
        return {
            ...state,
            ...food_item_details,
        };
    } else {
        return state;
    }
}

export default (state = {}, action) => {
    const {type, data} = action || {};
    switch (type) {
        case ADD_FOOD_ITEM_COMPLETED:
            return foodItemDetailsReducer(state, data);
        case EDIT_FOOD_ITEM_COMPLETED:
            return foodItemDetailsReducer(state, data);
        case STORE_FOOD_ITEM_AND_DETAILS:
            return foodItemDetailsReducer(state, data);
        case GET_SINGLE_DIET_DETAILS_COMPLETED:
            return foodItemDetailsReducer(state, data);
        default:
            return foodItemDetailsReducer(state, data);
    }
};

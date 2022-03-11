import { typographyClasses } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";

const initialState = {
    loading: false,
    currentUser: null,
    error:null,

};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.REGISTER_START:
            return {
                ...state,
                loading: true
            }
        case type.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            };
        case type.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
            };
    default:
            return state;
    }
}

export default userReducer;
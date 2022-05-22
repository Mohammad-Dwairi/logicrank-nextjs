import {LOGOUT, SET_USER_INFO} from "../ACTIONS_TYPES";

const initialState = {
    userInfo: null
};

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_INFO:
            return {userInfo: action.payload}
        case LOGOUT:
            return initialState;
        default:
            return state;
    }

};

export default UserReducer;
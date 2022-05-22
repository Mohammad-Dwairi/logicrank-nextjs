import {fbQueryDocByUID, fbUpdateDocByUID} from "../../firebase/functions/firestore-docs-functions";
import {USERS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {SET_USER_INFO} from "../ACTIONS_TYPES";


export const loadUserInfo = (userUID) => {
    return async dispatch => {
        const userInfo = await fbQueryDocByUID(USERS_COLLECTION, userUID);
        dispatch({type: SET_USER_INFO, payload: userInfo});
    };
};

export const updateUserInfo = (userUID, updatedInfoObj) => {
    return async dispatch => {
        await fbUpdateDocByUID(USERS_COLLECTION, userUID, updatedInfoObj);
        dispatch(loadUserInfo(userUID));
    };
}
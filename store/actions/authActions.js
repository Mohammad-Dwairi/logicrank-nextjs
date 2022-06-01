import {LOGOUT} from "../ACTIONS_TYPES";
import {fbLogout} from "../../firebase/functions/auth-functions";


export const logoutAction = (uid) => {
    return async dispatch => {
        await fbLogout(uid);
        dispatch({type: LOGOUT});
    };
};
import {LOGOUT} from "../ACTIONS_TYPES";
import {fbLogout} from "../../firebase/functions/auth-functions";


export const logoutAction = () => {
    return async dispatch => {
        await fbLogout();
        dispatch({type: LOGOUT});
    };
};
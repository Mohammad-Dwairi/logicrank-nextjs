import {CACHE_DATA} from "../ACTIONS_TYPES";


export const addToCache = (collection, key, dataArr) => {
    return async dispatch => {
        dispatch({type: CACHE_DATA, payload: {collection, key, data: dataArr}})
    };
};
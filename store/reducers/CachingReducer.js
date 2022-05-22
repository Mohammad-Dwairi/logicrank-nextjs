import {CACHE_DATA, INVALIDATE_CACHE} from "../ACTIONS_TYPES";

const initialState = {};

const CachingReducer = (state = initialState, action) => {

    switch (action.type) {
        case CACHE_DATA:
            return {cachedRoomFiles: [...state, ...action.payload]}
        case INVALIDATE_CACHE:
            return {...state, cachedRoomFiles: null}
        default:
            return state;
    }

};

export default CachingReducer;
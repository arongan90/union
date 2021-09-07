import axios from "axios";

const SET_CORP = "corp/SET_CORP";

export const setCorp = corpInfo => async dispatch => {
    dispatch({ type: SET_CORP, payload: corpInfo });
}

const initialState = {};

export default function corpInfo(state = initialState, action) {
    switch (action.type) {
        case SET_CORP:
            return {
                ...action.payload,
            }
        default:
            return state;
    }
}
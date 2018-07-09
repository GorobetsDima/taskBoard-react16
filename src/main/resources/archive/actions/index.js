import {ADD_TITLE} from "../constants/action-types";

export function addTitle(title) {
    return {type: ADD_TITLE, payload: title};
}

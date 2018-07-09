import {ADD_TITLE} from '../constants/action-types'


const initialState = {
    titles: [{id:1, name:"fuck"},{id:2, name:"shit"}]
};
export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TITLE:
            return {...state, titles: [...state.titles, action.payload]};
        default:
            return state;
    }
};


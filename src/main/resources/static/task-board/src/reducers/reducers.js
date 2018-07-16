import {laneActions, cardActions, tosterActions} from "../actions/actions";
import {deleteLaneCards, moveLaneCards, filterLaneCards, getCardToUpdate, addOrUpdateLaneCard} from "../utils/utils";
import {handleActions, combineActions} from "redux-actions";


const initialBorderState = {
    lanes: [],
    updatedCard: {},
    filteredLanes: []
};


export const boardReducer = handleActions({
        [laneActions.lane.fetchsuccess] (state, {payload:{data}}) {
            return {
                ...state,
                // lanes: [...data.lanes] //for mongo with proxy node server
                lanes: [...data] //for mongo without proxy node server
            };
        },
        [cardActions.card.deletesuccess] (state, {payload:{laneId, cardId}}){
            return {
                lanes: state.lanes.map(lane => deleteLaneCards(laneId, cardId, lane))
            }
        },
        [cardActions.card.addorupdate] (state, {payload:{laneId, cardId, card}}){
            return {
                lanes: state.lanes.map(lane => addOrUpdateLaneCard(laneId, cardId, card, lane))
            }
        }
        ,
        [cardActions.card.getupdated] (state, {payload:{laneId, cardId}}){
            return {
                ...state,
                updatedCard: getCardToUpdate(laneId, cardId, state.lanes)
            }
        },
        [cardActions.card.move] (state, {payload:{source, destination}}){
            return {
                lanes: state.lanes.map(lane => moveLaneCards(source, lane)).map(lane => moveLaneCards(destination, lane))
            }
        },
        [cardActions.card.reorder] (state, {payload:{lane}}){
            return {
                lanes: state.lanes.map(oldLane => moveLaneCards(lane, oldLane))
            }
        }
        ,
        [cardActions.card.filter] (state, {payload:{filter}}){
            const cloned = JSON.parse(JSON.stringify(state.lanes));
            return {
                lanes: state.lanes,
                filteredLanes: cloned.map(lane => filterLaneCards(filter, lane))
            }
        }
        ,
        [cardActions.card.resetfilter] (state, action){
            return {
                lanes: state.lanes,
                filteredLanes: []
            }
        }


    },
    initialBorderState
);


const initialLoadingState = {
    isLoading: false,
    message: '',
};


export const loadingReducer = handleActions({
        [combineActions(laneActions.lane.fetch, cardActions.card.delete)] (state, {payload:{isLoading}}) {
            return {
                ...state, isLoading: isLoading
            };
        },
        [combineActions(laneActions.lane.fetchfailure, cardActions.card.deletefailure)] (state, {payload:{message}}) {
            return {
                ...state, message: message
            };
        },
    },
    initialLoadingState
);


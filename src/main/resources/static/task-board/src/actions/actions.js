import {createActions} from "redux-actions";
import {toastr} from "react-redux-toastr";
import axios from "axios";


export const laneActions = createActions({
    LANE: {
        FETCH: () => ({isLoading: true}),
        FETCHSUCCESS: data => ({data}),
        FETCHFAILURE: error => ({message: error}),
        EXPRESS: data => ({info: data})
    }
});

export const cardActions = createActions({
    CARD: {
        ADDORUPDATE: (laneId, cardId, data) => ({laneId: laneId, cardId: cardId, card: data}),
        DELETE: () => () => ({isLoading: true}),
        DELETESUCCESS: (laneId, cardId) => ({laneId: laneId, cardId: cardId}),
        DELETEFAILURE: error => ({message: error}),
        GETUPDATED: (laneId, cardId) => ({laneId: laneId, cardId: cardId}),
        MOVE: (sourceLane, destinationLane) => ({source: sourceLane, destination: destinationLane}),
        REORDER: (lane) => ({lane: lane}),
        FILTER: (filter) => ({filter: filter}),
        RESETFILTER: () => ({}),
    }

});

export const fetchTasks = (data) => {

    return (dispatch) => {

        dispatch(laneActions.lane.fetch());

        return pending(data).then(
            () => {
                toastr.success('Loading lanes', 'success');
                dispatch(laneActions.lane.fetchsuccess(data));
            },
            error => {
                toastr.error(error);
                dispatch(laneActions.lane.fetchfailure(error));
            }
        );
    }
        ;
};


export const deleteCard = (laneId, cardId) => {

    return (dispatch) => {

        dispatch(cardActions.card.delete());

        return pending(laneId).then(
            () => {
                toastr.success('Delete card', 'success');
                dispatch(cardActions.card.deletesuccess(laneId, cardId));
            },
            error => {
                toastr.error(error);
                dispatch(cardActions.card.deletefailure(error));
            }
        );
    }
        ;
};

const pending = (data) => {

    return new Promise((resolve, reject) => {
        if (data) {
            setTimeout(resolve, 100)
        } else {
            setTimeout(reject("Error"), 100)
        }

    })
};

export const expressFetch = () => {
    return (dispatch) => {
        const response = axios.get('/express_backend');

        return response.then(
            resp => {
                dispatch(laneActions.lane.express(resp.data.express))
            }, error => {
                console.log(error);
            }
        )
    }
};
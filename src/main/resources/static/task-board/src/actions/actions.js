import {createActions} from "redux-actions";
import {takeEvery,takeLatest, put, call, all} from "redux-saga/effects";
import {toastr} from "react-redux-toastr";
import axios from "axios";


export const laneActions = createActions({
    LANE: {
        FETCH: () => ({isLoading: true}),
        FETCHSAGA: () => ({}),
        FETCHSUCCESS: data => ({data}),
        FETCHFAILURE: error => ({message: error}),
        EXPRESS: data => ({lanes: data})
    }
});

export const cardActions = createActions({
    CARD: {
        ADDORUPDATE: (laneId, cardId, data) => ({laneId: laneId, cardId: cardId, card: data}),
        ADDORUPDATESAGA: (laneId, cardId, data) => ({laneId: laneId, cardId: cardId, card: data}),
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


//import data from json file with thunk
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


export const saveOrUpdateCard = (laneId, cardId, card) => {

    return (dispatch) => {

        // dispatch(cardActions.card.delete());

        const response = axios.post('/saveCard', {
            'card': card,
            'laneId': laneId
        });

        return response.then(
            () => {
                toastr.success('Save card', 'success');
                // dispatch(cardActions.card.deletesuccess(laneId, cardId));
            },
            error => {
                toastr.error(error);
                // dispatch(cardActions.card.deletefailure(error));
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

function* watchFetchTasks() {
    yield takeEvery('LANE/FETCHSAGA', fetchTasksSagaAsync);
}

function* watchAddCards() {
    yield takeLatest('CARD/ADDORUPDATESAGA', saveOrUpdateCardSaga);
}


//import data from java server(mongo db) via express server with thunk
export const expressFetch = () => {

    return (dispatch) => {

        dispatch(laneActions.lane.fetch());

        const response = axios.get('/api/lanes');

        return response.then(
            resp => {
                toastr.success('Loading lanes from server', 'success');
                dispatch(laneActions.lane.fetchsuccess(resp.data.lanes));
                // dispatch(laneActions.lane.express(resp.data.express))
            }, error => {
                toastr.error(error);
                dispatch(laneActions.lane.fetchfailure(error));
                // console.log(error);
            }
        )
    }
};

//import data from java server(mongo db) with thunk
export const fetchTasksFromMongo = () => {

    return (dispatch) => {

        dispatch(laneActions.lane.fetch());

        const response = axios.get('/lanes');

        return response.then(
            resp => {
                toastr.success('Loading lanes from server', 'success');
                dispatch(laneActions.lane.fetchsuccess(resp.data));
                // dispatch(laneActions.lane.express(resp.data.express))
            }, error => {
                toastr.error(error);
                dispatch(laneActions.lane.fetchfailure(error));
                // console.log(error);
            }
        )
    }
};

//import data from java server(mongo db) with saga
function*  fetchTasksSagaAsync() {

    try {
        yield put(laneActions.lane.fetch());

        const responseData = yield call(() => {
            return axios.get('/lanes').then(resp => resp.data);
        });

        toastr.success('Loading lanes from server', 'success');

        yield put(laneActions.lane.fetchsuccess(responseData));
    } catch (error) {
        toastr.error(error);
        yield put(laneActions.lane.fetchfailure(error));
    }

}

//save card to java server(mongo db) with saga
function* saveOrUpdateCardSaga({payload:{card, laneId}}) {

    try {
        // yield put(laneActions.lane.fetch());

        const responseData = yield call(() => {
            return axios.post('/saveCard', {
                'card': card,
                'laneId': laneId
            }).then(resp => resp.data);
        });

        toastr.success('Save card', 'success');

        // yield put(laneActions.lane.fetchsuccess(responseData));
    } catch (error) {
        toastr.error(error);
        // yield put(laneActions.lane.fetchfailure(error));
    }

}

export default function* rootSaga() {
    yield all([
        watchFetchTasks(),
        watchAddCards()
    ])
}
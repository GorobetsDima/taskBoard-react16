import React, {Component} from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import "./Board.css";
import Lane from "../../components/lane/Lane";
import NavBar from "../../components/navbar/NavBar";
import {cardActions, laneActions, deleteCard, fetchTasksFromMongo} from "../../actions/actions";
import {Row} from "reactstrap";


@connect(
    state => ({
        lanes: state.boardReducer.lanes,
        filteredLanes: state.boardReducer.filteredLanes,
        // express: state.boardReducer.express

    }), {
        fetchSaga: laneActions.lane.fetchsaga,
        getUpdatedCard: cardActions.card.getupdated,
        moveCard: cardActions.card.move,
        reorderCards: cardActions.card.reorder,
        filterCards: cardActions.card.filter,
        resetFilter: cardActions.card.resetfilter,
        // fetchTasks,
        deleteCard,
        // expressFetch,
        fetchTasksFromMongo
    }
)

export default class Board extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        lanes: PropTypes.array,
        filteredLanes: PropTypes.array,
        expressFetch: PropTypes.func,
        deleteCard: PropTypes.func,
        getUpdatedCard: PropTypes.func,
        moveCard: PropTypes.func,
        reorderCards: PropTypes.func,
        filterCards: PropTypes.func,
        resetFilter: PropTypes.func
    };

    componentDidMount() {
        // const {fetchTasks}= this.props;
        // fetchTasks(data.lanes);

        const {expressFetch, fetchTasksFromMongo, fetchSaga} = this.props;
        // fetchTasksFromMongo();
        // expressFetch();
        fetchSaga();
    }

    getList = id => {
        const lane = this.props.lanes.find(lane => lane.id === id);
        if (lane) return lane.cards;
        return [];
    };

    moveCard = (source, destination, droppableSource, droppableDestination) => {

        const {moveCard} = this.props;
        const [removed] = source.splice(droppableSource.index, 1);

        destination.splice(droppableDestination.index, 0, removed);


        const sourceLane = {
            laneId: droppableSource.droppableId,
            cards: source
        };

        const destinationLane = {
            laneId: droppableDestination.droppableId,
            cards: destination
        };

        moveCard(sourceLane, destinationLane);

    };

    reorderCard = (droppableId, list, startIndex, endIndex) => {
        const {reorderCards} = this.props;


        const result = Array.from(list);

        const destinationCard = list[endIndex];
        const [removed] = list.splice(startIndex, 1);

        removed.priority = destinationCard.priority;

        list.splice(endIndex, 0, removed);

        const reorderLane = {
            laneId: droppableId,
            cards: list
        };
        reorderCards(reorderLane);
    };


    onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            this.reorderCard(source.droppableId,
                this.getList(source.droppableId),
                source.index,
                destination.index);
        } else {
            this.moveCard(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination);
        }
    };


    render() {

        const {lanes, filteredLanes, deleteCard, getUpdatedCard, addCard, editCard, resetFilter, filterCards} = this.props;
        let i = 0;

        const displayLanes = filteredLanes && filteredLanes.length ? filteredLanes : lanes;
        return (


            <DragDropContext onDragEnd={this.onDragEnd}>
                <NavBar
                    navBarName="Task Board"
                    isSearchable="true"
                    resetFilter={resetFilter}
                    filterCards={filterCards}/>
                <div className="App">
                    <Row>
                        {displayLanes.map(lane =>
                            <Droppable droppableId={lane.id} key={i++}>
                                {(provided, snapshot) => (
                                    <Lane
                                        provided={provided}
                                        snapshot={snapshot}
                                        deleteCard={deleteCard}
                                        getUpdatedCard={getUpdatedCard}
                                        addCard={addCard}
                                        editCard={editCard}
                                        lane={lane}/>
                                )}
                            </Droppable>
                        )}
                    </Row>
                </div>
            </DragDropContext>
        );
    }
}


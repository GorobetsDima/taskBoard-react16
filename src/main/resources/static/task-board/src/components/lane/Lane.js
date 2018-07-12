import React, {Component} from "react";
import BoardCard from "../card/Card";
import {Button} from "reactstrap";
import {Glyphicon} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {Draggable} from "react-beautiful-dnd";
import "./Lane.css";


class Lane extends Component {

    constructor(props) {
        super(props);
        this.getPriorityColor = this.getPriorityColor.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    getPriorityColor(priority) {
        const priorities = {
            1: '#fc9ba0',
            2: 'yellow',
            3: 'white',
            4: 'transparent',
            5: 'grey'
        };
        return priorities[priority];
    }

    addCard() {
        this.props.history.push(`/cardForm/${this.props.lane._id}`);
    }

    render() {
        const {lane, deleteCard, getUpdatedCard, provided, snapshot} = this.props;
        let i = 0;
        return (
            <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className="Lane col-sm-2">

                <div className="LaneHeader">
                    <p className="LaneName">{lane.id}</p>
                    <div className="buttonGroup">
                        <Button className="addButton"
                                onClick={this.addCard}
                                outline color="secondary"><Glyphicon
                            glyph="plus"/></Button>

                        <Button className="counter" color="info">{lane.cards.length ? lane.cards.length : 0}</Button>
                    </div>
                    <div className="LaneInfo">
                        <div className="LaneTitle">{lane.title}</div>
                        <div className="LaneLabel">{lane.label}</div>
                    </div>

                </div>


                {lane.cards
                    .sort((card1, card2) => (card1.priority - card2.priority))
                    .map((card, index) =>
                        <Draggable
                            key={i++}
                            draggableId={card.id}
                            index={index}>
                            {(provided, snapshot) => (
                                <BoardCard
                                    provided={provided}
                                    snapshot={snapshot}
                                    laneId={lane.id}
                                    laneIdd={lane._id}
                                    deleteCard={deleteCard}
                                    getUpdatedCard={getUpdatedCard}
                                    card={card}
                                    priorityColor={this.getPriorityColor(card.priority)}/>
                            )}
                        </Draggable>
                    )}
                {provided.placeholder}
            </div>
        )
    }

}

export default withRouter(Lane);

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    paddingBottom: 16
    // ,
    // height: 'fit-content'
});



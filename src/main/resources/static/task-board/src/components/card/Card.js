import React, {Component} from "react";
import {CardText, CardBody, CardTitle, Button} from "reactstrap";
import "./Card.css";
import {Glyphicon} from "react-bootstrap";
import {withRouter} from "react-router-dom";


class BoardCard extends Component {
    constructor(props) {
        super(props);
        this.deleteCard = this.deleteCard.bind(this);
        this.editCard = this.editCard.bind(this);
    }

    deleteCard() {
        const {deleteCard, laneId, card}=this.props;
        deleteCard(laneId, card.id);
    }

    editCard() {
        const {laneId, card, getUpdatedCard, history, laneIdd}=this.props;
        getUpdatedCard(laneId, card.id);
        history.push(`/cardForm/${laneIdd}/${card.id}`);
    }

    render() {

        const {priorityColor, card, provided, snapshot} = this.props;
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style,
                    priorityColor
                )}
                className="BoardCard">

                <CardBody>
                    <CardTitle className="CardTitle">{card.title}</CardTitle>
                    <CardText className="CardText">{card.description}</CardText>
                    <div className="buttonGroup">
                        <Button onClick={this.editCard} className="CardEdit"> <Glyphicon glyph="edit"/></Button>
                        <Button onClick={this.deleteCard} className="CardDelete"> <Glyphicon glyph="trash"/></Button>
                    </div>
                </CardBody>
            </div>
        );
    }


}
export default withRouter(BoardCard);

const getItemStyle = (isDragging, draggableStyle, priorityColor) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : priorityColor,
    // styles we need to apply on draggables
    ...draggableStyle
});



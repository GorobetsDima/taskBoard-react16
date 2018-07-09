import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import CardForm from "../../components/cardform/CardForm";
import NavBar from "../../components/navbar/NavBar";
import {cardActions} from "../../actions/actions";
import {withRouter} from "react-router-dom";

@connect(
    state => ({
        lanes: state.boardReducer.lanes,
        updatedCard: state.boardReducer.updatedCard

    }),
    {
        createOrUpdateCard: cardActions.card.addorupdate,
    })

class Form extends Component {

    constructor(props) {
        super(props);
    }


    static contextTypes = {
        store: PropTypes.object
    };

    static propTypes = {
        createOrUpdateCard: PropTypes.func,
    };


    componentWillReceiveProps(nextProps) {
        // if (nextProps) {
        // browserHistory.push('/');
        this.props.history.push('/');
        // }
    }


    render() {
        const {match:{params:{laneId, cardId}}, updatedCard, createOrUpdateCard, history} = this.props;
        return (

            <div className="container">
                <NavBar navBarName="Create or update a task"/>
                <CardForm
                    cardId={cardId}
                    laneId={laneId}
                    createOrUpdateCard={createOrUpdateCard}
                    updatedCard={updatedCard}
                    history={history}
                />
            </div>

        );
    }
}
export default withRouter(Form);


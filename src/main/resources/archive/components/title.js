import React, {Component, PureComponent} from "react";
import PropTypes from "prop-types";


export default class Title extends PureComponent {

    constructor(props) {
        super(props);
        this.addTitleClick = this.addTitleClick.bind(this);
    }

    static propTypes = {
        addTitle: PropTypes.func
    };

    addTitleClick() {
        const {title, id, addTitle}= this.props;
        addTitle({id: id, name: title});
    }

    render() {
        const {title, id}= this.props;
        return (
            <li>
                {title}
                = {id}

                <button onClick={this.addTitleClick}>plus</button>
            </li>
        )

    }

}

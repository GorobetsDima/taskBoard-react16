import React, {Component, PureComponent} from "react";
import PropTypes from 'prop-types';

import {connect} from 'react-redux'
import {addTitle} from "../actions/index";
import Title from "../components/title";


@connect(
    state => ({
        titles: state.rootReducer.titles,

    }), {addTitles: addTitle}
    )


export default class ReactApp extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        titles: PropTypes.array
        ,
        addTitles: PropTypes.func
    };


    render() {
        const {titles, addTitles}= this.props;
        let i = 0;
        return (<div>
                <h1>MERHABA , NASİLSİN ?:)!!!!!!!!!!!</h1>

                <ul>
                    {titles.map(title=>
                        <Title addTitle={addTitles} id = {title.id} title = {title.name} key = {i++}/>

                    )
                    }

                </ul>
            </div>
        )
    }

}
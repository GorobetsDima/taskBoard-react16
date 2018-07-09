import {Navbar} from "react-bootstrap";
import SearchForm from "../search/SearchForm";
import React, {Component} from "react";
import PropTypes from "prop-types";
import "./NavBar.css";


export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.getSearchable = this.getSearchable.bind(this);
    }

    static propTypes = {
        navBarName: PropTypes.string.isRequired
    };

    getSearchable(isSearchable) {
        if (isSearchable) {
            return <SearchForm/>;
        }
    }

    render() {
        const {navBarName, isSearchable, } = this.props;
        return (
            <Navbar className="NavBar" inverse>
                <Navbar.Header>
                    <Navbar.Text >
                        { navBarName }
                    </Navbar.Text>
                </Navbar.Header>
                {this.getSearchable(isSearchable)}
            </Navbar>
        );
    }
}



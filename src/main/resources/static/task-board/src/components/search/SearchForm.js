import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Button} from "reactstrap";
import {Glyphicon} from "react-bootstrap";
import {connect} from "react-redux";
import {cardActions} from "../../actions/actions";
import "./SearchForm.css";


@connect(state => ({
    initialValues: {filter: ''}
}), {
    filterCards: cardActions.card.filter,
    resetFilter: cardActions.card.resetfilter
})
@reduxForm({
    form: 'searchForm',
    enableReinitialize: true
})


class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.renderInput = this.renderInput.bind(this);
        this.filterCards = this.filterCards.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }


    renderInput({input, placeholder, type, meta: {touched, error}}) {
        return (
            <div>
                <input {...input} type={type} className="form-control"
                       placeholder={placeholder}/>
                {touched && error && <span>{error}</span>}
            </div>
        );
    }


    filterCards(values) {
        const {filterCards, reset} = this.props;
        filterCards(values.filter);
        // this.refs.filter.value='';
        // this.refs.form.reset();

        reset('searchForm');
        //     {
        //         type: '@@redux-form/RESET',
        //         meta: {form: 'searchForm'}
        //     }
    }

    resetFilter() {
        const {resetFilter, reset} = this.props;
        resetFilter();
        reset('searchForm');
        // this.refs.filter.value='';
    }

    render() {
        const {handleSubmit, submitting, pristine} = this.props;

        return (
            <form className="searchFilterForm" onSubmit={handleSubmit(this.filterCards)}>
                {/*<div className="row">*/}
                <div className="resetBtn">
                    <Button type="reset" className="secondary" onClick={this.resetFilter}>
                        <span><Glyphicon glyph="refresh"/></span></Button>
                </div>
                <div className="col-sm-10">
                    <Field
                        name="filter"
                        component={this.renderInput}
                        type="text"
                        placeholder="Filter"
                        ref="filter"
                    />
                </div>
                <div className="submitBtn">
                    <Button type="submit" className="secondary" disabled={submitting}>
                        <span><Glyphicon glyph="filter"/></span>
                    </Button>
                    {/*</div>*/}
                </div>
            </form>
        )

    }

}

export default SearchForm;

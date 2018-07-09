import React, {Component} from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {Button} from "reactstrap";
import {Glyphicon} from "react-bootstrap";
// import {withRouter} from "react-router-dom";
// import {Link} from "react-router-dom";
// import {browserHistory} from "react-router";
import {validate} from "../../utils/utils";
import "./CardForm.css";


@connect(state => ({
    initialValues: state.boardReducer.updatedCard
}))
@reduxForm({
    form: 'cardForm',
    enableReinitialize: true,
    validate
})


class CardForm extends Component {

    constructor(props) {
        super(props);
        this.renderInput = this.renderInput.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.clickBackButton = this.clickBackButton.bind(this);
        this.createOrUpdateCard = this.createOrUpdateCard.bind(this);
    }


    renderInput({input, placeholder, type, meta: {touched, error}}) {
        return (
            <div className="form-group">
                <input {...input} type={type} className="form-control"
                       placeholder={placeholder}/>
                {touched && error && <span className="error">{error}</span>}
            </div>
        );
    }

    renderSelect({input, values, meta: {touched, error}}) {
        return (
            <div className="form-group">

                <Field name="priority"
                       component="select" className="form-control">
                    <option></option>
                    <option value="1">High</option>
                    <option value="2">Personal</option>
                    <option value="3">Normal</option>
                    <option value="4">Low</option>
                    <option value="5">Completed</option>
                </Field>
                {touched && error && <span className="error">{error}</span>}
            </div>
        );
    }

    clickBackButton() {
        this.props.history.push("/");
    }

    createOrUpdateCard(values) {
        const {laneId, createOrUpdateCard, cardId} = this.props;
        createOrUpdateCard(laneId, cardId, values);
    }

    render() {
        const {handleSubmit, submitting, pristine} = this.props;

        return (
            <form className="form" onSubmit={handleSubmit(this.createOrUpdateCard)}>
                <div className="center-block">
                    <div>
                        <label>Task id</label>
                        <div>
                            <Field
                                name="id"
                                component={this.renderInput}
                                type="text"
                                placeholder="Id"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Task title</label>
                        <div>
                            <Field
                                name="title"
                                component={this.renderInput}
                                type="text"
                                placeholder="Title"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Task label</label>
                        <div>
                            <Field
                                name="label"
                                component={this.renderInput}
                                type="text"
                                placeholder="Label"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Task description</label>
                        <div>
                            <Field
                                name="description"
                                component={this.renderInput}
                                type="textarea"
                                placeholder="Description"
                            />
                        </div>
                    </div>
                    <div>
                        <label>Task priority</label>
                        <div className="form-group">
                            {/*<Field name="priority"*/}
                            {/*type="text"*/}
                            {/*component={this.renderInput}*/}
                            {/*placeholder="Task priority"/>*/}
                            <Field name="priority"
                                   component={this.renderSelect}>
                                {/*<option></option>*/}
                                {/*<option value="1">High</option>*/}
                                {/*<option value="2">Personal</option>*/}
                                {/*<option value="3">Normal</option>*/}
                                {/*<option value="4">Low</option>*/}
                                {/*<option value="5">Completed</option>*/}
                            </Field>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className=" col-sm-8">
                            <Button type="submit" className="primary" disabled={submitting}>
                                <span><Glyphicon glyph="plus"/></span>Create or update
                            </Button>
                        </div>
                    </div>
                    <div className="center">
                        <Button onClick={this.clickBackButton} className="info">
                            <span><Glyphicon glyph="chevron-left"/></span>Back
                        </Button>
                    </div>
                </div>
            </form>
        )

    }

}

export default CardForm;

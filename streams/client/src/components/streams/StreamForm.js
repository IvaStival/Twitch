import React from "react";
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component{
    
    renderError = (meta) => {
        if(meta.touched && meta.error){
            return (
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            )
        }
    }
    // We need to use a arrow function because we lost the class references when we call it
    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? "error" : ""}`
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} />
                {this.renderError(formProps.meta)}
            </div>
            )
        // return <input onChange={formProps.input.onChange} value={formProps.input.value} />
    }

    onSubmit = (formValues) => { // We change the paramenter passed name to formValues
        // event.preventDefault() This line isn't necessary because the Redux Form carry about prevent defaults

        // console.log(formValues)
        this.props.onSubmit(formValues);
    }

    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                {/* Name is like the name of the property that this field is going to manage. This Field will be responsable for rendering
                    the input the user to indicate the title of the stream */}
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {}
    if(!formValues.title){
        errors.title = 'You must enter a title';
    }

    if(!formValues.description){
        errors.description = 'You must enter a title';
    }

    return errors;
}

export default reduxForm({
                    form: 'streamForm',
                    validate: validate
                })(StreamForm);
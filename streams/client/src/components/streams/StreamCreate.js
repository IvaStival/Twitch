import React from "react";
import {connect} from 'react-redux';
import {createStream} from '../../actions';

import StreamForm from "./StreamForm";

class StreamCreate extends React.Component{
    
    onSubmit = (formValues) => { // We change the paramenter passed name to formValues
        // event.preventDefault() This line isn't necessary because the Redux Form carry about prevent defaults

        // console.log(formValues)
        this.props.createStream(formValues);
    }

    render(){
        return (
            <div>
                <h3>Create Stream</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default connect(null, { createStream })(StreamCreate);
import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchStream, editStream} from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if(!this.props.stream){
            return <div>Loading ...</div>
        }

        return <div>
                <h3>Edit Stream</h3>
                {/* WE CAN PASS THE ALL THE FORM TO THE STREAMFORM, BUT THIS ISN'T A GOOD THING BECAUSE THERA MORE ITENS INSTEAD title AND description.
                WE NEED TO PASS ONLY WHAT WILL BE EDITED. */}
                {/* <StreamForm initialValues={this.props.stream} onSubmit={this.onSubmit} /> */}
                 {/* WE CAN THEN PASS EACH ITEM MANUALLY, BUT THERE A WAY MORE OPTIMZED */}
                {/* <StreamForm initialValues={{title: this.props.stream.title, description: this.props.stream.description}} onSubmit={this.onSubmit} /> */}
                {/* USING lodash _.pick() WILL RETURN ONLY THE ITENS WICH WE WANT */}
                <StreamForm initialValues={_.pick(this.props.stream, 'title', 'description')} onSubmit={this.onSubmit} />
                </div>
    }
}
const mapStateToProps = (state, ownProps) => {
    
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
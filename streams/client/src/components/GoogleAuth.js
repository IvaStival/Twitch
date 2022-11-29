import React from "react";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions"

class GoogleAuth extends React.Component {

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '288010682923-ra5pou5t0cg6ikpc3d2glgc9mhoki83u.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: "streamy"
            }).then(() => {
                // get the auth instance 
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }

    // Because this is a callback function we use arrow function. So that its context is bound to my component  
    // Everty time that we change the state we will call this function, and we will do it when we login ou logout
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSingInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }
    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null
        } else if(this.props.isSignedIn){
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sing Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSingInClick} className="ui red google button">
                    <i className="google icon" />
                    Sing In with Google
                </button>
            )
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}

const matStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(matStateToProps, {signIn, signOut})(GoogleAuth);
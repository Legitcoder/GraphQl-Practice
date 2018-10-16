import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import AuthForm from './Authform';
import query from '../queries/currentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
    constructor(props){
        super(props);

        this.state = {errors: []};
    }

    componentWillUpdate(nextProps) {
        if (nextProps.data.user && !this.props.data.user) {
            hashHistory.push('/dashboard');
        }
    }


    onSubmit({ email, password }) {
        this.props.mutate({
            refetchQueries: [{query}],
            variables: { email, password }
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
    }

    // onSubmit() {

    // }


    render() {
        return(
            <div>
                <h3>Signup</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}



export default graphql(query)(
    graphql(mutation)(SignupForm)
);
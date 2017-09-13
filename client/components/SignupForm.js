import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { graphql } from 'react-apollo'
import AuthForm from './AuthForm'
import CURRENT_USER_QUERY from '../queries/CurrentUser'
import SIGNUP_MUTATION from '../mutations/Signup'

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = { errors: [] }
    }

    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) hashHistory.push('/dashboard')
    }

    onSubmit({ email, password }) {
        this.props.mutate({
                variables: {
                    email,
                    password
                },
                refetchQueries: [{ query: CURRENT_USER_QUERY }]
            })
            .catch((error) => {
                const errors = error.graphQLErrors.map((e) => e.message)
                this.setState({ errors })
            })
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <AuthForm 
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        )
    }
}

export default graphql(CURRENT_USER_QUERY)(
    graphql(SIGNUP_MUTATION)(SignupForm)
)
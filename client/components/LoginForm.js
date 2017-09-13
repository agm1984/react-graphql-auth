import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { graphql } from 'react-apollo'
import AuthForm from './AuthForm'
import CURRENT_USER_QUERY from '../queries/CurrentUser'
import LOGIN_MUTATION from '../mutations/Login'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = { errors: [] }
    }

    // This fires when the component re-renders for any reason
    componentWillUpdate(nextProps) {
        // When the component re-renders:
        // this.props // The old props
        // nextProps // The next props that will be in place
        console.log(this.props, nextProps)
        if (!this.props.data.user && nextProps.data.user) {
            // Redirect to Dashboard! (detect delta between the two)
            hashHistory.push('/dashboard')
        }
    }

    onSubmit({ email, password}) {
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
                <h3>Login</h3>
                <AuthForm 
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        )
    }
}

// This is needed to login properly, to ensure view loads correct
export default graphql(CURRENT_USER_QUERY)(
    graphql(LOGIN_MUTATION)(LoginForm)
)
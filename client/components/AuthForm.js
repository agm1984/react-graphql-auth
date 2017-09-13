import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import LOGIN_MUTATION from '../mutations/Login'

class AuthForm extends Component {
    constructor(props) {
        super(props)

        this.state = { email: '', password: '' }
    }

    onSubmit(event) {
        event.preventDefault()

        const { email, password } = this.state
        this.props.onSubmit({ email, password })
    }
    render() {
        return (
            <div className="row">
                <form className="col s4" onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input
                            placeholder="Email"
                            type="email"
                            value={this.state.email}
                            onChange={(event) => this.setState({ email: event.target.value })}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={(event) => this.setState({ password: event.target.value })}
                        />
                    </div>
                    <div className="errors">
                        {this.props.errors.map((error) => <div key={error}>{error}</div>)}
                    </div>

                    <button className="btn">Submit</button>
                </form>
            </div>
        )
    }
}

export default AuthForm
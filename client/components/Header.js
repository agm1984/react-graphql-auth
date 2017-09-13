import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import CURRENT_USER_QUERY from '../queries/CurrentUser'
import LOGOUT_MUTATION from '../mutations/Logout'

class Header extends Component {
    onLogoutClick() {
        // Log user out and then refetch user which
        // changes the UI to 'logged out' state
        this.props.mutate({
            refetchQueries: [{ query: CURRENT_USER_QUERY }]
        })
    }

    renderButtons() {
        const { loading, user } = this.props.data
        if (loading) return <div />
        if (user) {
            return (
                <li>
                    <a onClick={this.onLogoutClick.bind(this)}>Log Out</a>
                </li>
            )
        }

        return (
            <div>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </div>
        )
    }

    render() {
        // if (this.props.data.loading) return <div>Loading</div>
        // console.log(this.props.data)
        // console.log(this.props.data.user)
        return (
            <nav>
                <div className="nav-wrapper">
                <Link to="/" className="brand-logo left">Home</Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default graphql(LOGOUT_MUTATION)(
    graphql(CURRENT_USER_QUERY)(Header)
)
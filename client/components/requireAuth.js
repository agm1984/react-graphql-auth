import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { graphql } from 'react-apollo'
import CURRENT_USER_QUERY from '../queries/CurrentUser'

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        componentWillUpdate(nextProps) {
            console.log(nextProps.data.loading, nextProps.data.user)
            if (!nextProps.data.loading && !nextProps.data.user) hashHistory.push('/login')
        }

        render() {
            return <WrappedComponent { ...this.props} />
        }
    }

    return graphql(CURRENT_USER_QUERY)(RequireAuth)
}


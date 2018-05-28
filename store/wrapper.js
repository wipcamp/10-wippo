import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withRedux from 'next-redux-wrapper'
import createStore from './createStore'

export default (ComposedComponent) => {
  class withData extends Component {
    static propTypes = {
      headers: PropTypes.object.isRequired
    }
    static async getInitialProps (ctx) {
      const headers = ctx.req ? ctx.req.headers : {}
      const props = {
        url: { query: ctx.query, pathname: ctx.pathname },
        ...(await (typeof ComposedComponent.getInitialProps === 'function'
          ? ComposedComponent.getInitialProps(ctx)
          : {}))
      }

      return {
        headers,
        ...props
      }
    }

    render () {
      return (
        <ComposedComponent
          {...this.props}
        />
      )
    }
  }

  return withRedux(createStore, null, null)(withData)
}

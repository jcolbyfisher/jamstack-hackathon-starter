import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

import { initAuth } from '../app/services/auth'
initAuth()

class IndexPage extends React.Component {
  state = { loading: false, msg: null, todos: [] }

  componentDidMount() {
    fetch('/.netlify/functions/todos-read-all')
      .then(response => {
        return response.json()
      })
      .then(data => {
        debugger
        this.setState({
          todos: data,
        })
      })
  }

  handleClick = e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state
    return (
      <Layout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p>
              Welcome to your new Gatsby + Netlify Functions + Netlify Identity
              site
            </p>
            <ul>
              <li>
                This site has statically generated marketing pages like this one
                and <Link to="/page-2/">page 2.</Link>{' '}
              </li>
              <li>
                It also has a dynamically generated clientside app guarded by
                authentication:{' '}
                <Link to="/app/">Go to App (with Netlify Identity)</Link>{' '}
              </li>
              <li>
                You can{' '}
                <a href="https://github.com/sw-yx/jamstack-hackathon-starter">
                  view source here
                </a>
              </li>
              <li>
                or see{' '}
                <a href="https://youtu.be/bueXJInQt2c">
                  the Youtube walkthrough
                </a>
              </li>
              <li>
                or
                <a href="https://app.netlify.com/start/deploy?repository=https://github.com/sw-yx/jamstack-hackathon-starter&stack=cms">
                  <img
                    src="https://www.netlify.com/img/deploy/button.svg"
                    alt="Deploy to Netlify"
                  />
                </a>
              </li>
            </ul>
            <hr />
            <p>
              You can still access Netlify functions even on static "marketing
              pages":{' '}
            </p>
            <button onClick={this.handleClick}>
              {loading ? 'Loading...' : 'Call Lambda Function'}
            </button>
            <br />
            <span>
              {msg
                ? 'Here is the response: ' + msg
                : 'click the button and watch this!'}
            </span>
          </div>
          <div
            style={{
              borderLeft: 'brown',
              borderLeftStyle: 'dashed',
              paddingLeft: '3rem',
            }}
          >
            <p>Now go build something great.</p>
            <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
              <Image />
            </div>

            <div>
              {this.state.todos.map(todoObj => {
                return <p key={todoObj.ts}>{todoObj.data.title}</p>
              })}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

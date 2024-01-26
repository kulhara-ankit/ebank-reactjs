import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    showError: false,
    errorMsg: '',
  }

  onClickUserId = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  onClickPin = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  successToken = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  failedToken = errorMsg => {
    this.setState({
      showError: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successToken(data.jwt_token)
    } else {
      this.failedToken(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="app-container">
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="img"
            />
          </div>
          <form className="form" onSubmit={this.onSubmitForm}>
            <h1 className="header"> Welcome Back! </h1>
            <div className="input-container">
              <label htmlFor="user" className="label">
                User ID
              </label>
              <input
                id="user"
                placeholder="Enter User ID"
                className="input-field"
                type="text"
                value={userId}
                onChange={this.onClickUserId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                placeholder="Enter Pin"
                id="pin"
                className="input-field"
                type="password"
                value={pin}
                onChange={this.onClickPin}
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
            <div className="error-container">
              {showError === true && <p className="error-para"> {errorMsg} </p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

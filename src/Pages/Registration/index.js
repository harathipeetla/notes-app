import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

class RegistrationPage extends Component {
  constructor({history}) {
    super()
    this.state = {
      username: '',
      password: '',
      registrationError: '',
    }
    this.history = history
  }

  componentDidMount() {
    const isLoggedIn = Cookies.get('isLoggedIn')
    if (isLoggedIn) {
      this.history.replace('/home')
    }
  }

  handleRegistration = () => {
    const {username, password} = this.state

    // Check if username is already registered
    const existingUsername = Cookies.get('username')
    if (existingUsername === username) {
      this.setState({registrationError: 'This username is already registered'})
    } else if (username === '' || password === '') {
      this.setState({registrationError: 'User details should not be empty'})
    } else {
      // Store user details in cookies
      Cookies.set('username', username, {expires: 36})
      Cookies.set('password', password, {expires: 36})

      // Redirect to login page upon successful registration
      this.history.replace('/login')
    }
  }

  render() {
    const {username, password, registrationError} = this.state

    return (
      <div className="registration-page-container">
        <h1>Dont have an account? Register Please</h1>
        <div className="register-details">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => this.setState({username: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => this.setState({password: e.target.value})}
            />
          </div>
        </div>
        <button onClick={this.handleRegistration} type="button">
          Register
        </button>
        <p>{registrationError}</p>
        <p>
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    )
  }
}

export default RegistrationPage

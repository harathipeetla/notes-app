import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loginError: '',
    }
  }

  componentDidMount() {
    const {history} = this.props // Destructuring props here
    const isLoggedIn = Cookies.get('isLoggedIn')
    if (isLoggedIn) {
      history.replace('/home')
    }
  }

  handleLogin = () => {
    const {username, password} = this.state
    const storedUsername = Cookies.get('username')
    const storedPassword = Cookies.get('password')
    const {history} = this.props // Destructuring props here
    if (username === storedUsername && password === storedPassword) {
      history.push('/home')
    } else {
      this.setState({loginError: 'Invalid email or password'})
    }
  }

  render() {
    const {username, password, loginError} = this.state

    return (
      <div className="sign-container-page">
        <div className="sign-in-page-text">
          <h1>Board.</h1>
        </div>
        <div className="sign-in-page-login">
          <h1 className="sign-heading">Sign In</h1>
          <p className="sign-para">Sign in to your account</p>
          <div className="login-details">
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
          <button onClick={this.handleLogin} type="button">
            Login
          </button>
          <p>{loginError}</p>
          <p>
            Dont have an account? <Link to="/register">Register Here</Link>
          </p>
        </div>
      </div>
    )
  }
}

export default LoginPage

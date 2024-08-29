import React, {Component} from 'react'
import './index.css' // Import your CSS file for styling

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwords: [],
    showPasswords: false,
    search: '',
    isSmallScreen: window.innerWidth < 768,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.setState({isSmallScreen: window.innerWidth < 768})
  }

  handleWebsiteChange = event => {
    this.setState({website: event.target.value})
  }

  handleUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  handlePasswordChange = event => {
    this.setState({password: event.target.value})
  }

  handleSearchChange = event => {
    this.setState({search: event.target.value})
  }

  handleShowPasswordsChange = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  handleAddPassword = event => {
    event.preventDefault()
    const {website, username, password, passwords} = this.state
    if (website && username && password) {
      this.setState({
        passwords: [...passwords, {website, username, password}],
        website: '',
        username: '',
        password: '',
      })
    }
  }

  handleDeletePassword = index => {
    this.setState(prevState => ({
      passwords: prevState.passwords.filter((_, i) => i !== index),
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      passwords,
      showPasswords,
      search,
      isSmallScreen,
    } = this.state

    const filteredPasswords = passwords.filter(item =>
      item.website.toLowerCase().includes(search.toLowerCase()),
    )

    return (
      <div className="password-manager">
        <header>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="password manager"
          />

          <h1>Add New Password</h1>
        </header>
        <form onSubmit={this.handleAddPassword}>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
            />
            <input
              type="text"
              placeholder="Enter Website"
              value={website}
              onChange={this.handleWebsiteChange}
            />
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
            />
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button type="submit">Add</button>
        </form>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            alt="search"
          />
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={this.handleSearchChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            id="showPasswords"
            checked={showPasswords}
            onChange={this.handleShowPasswordsChange}
          />
          <label htmlFor="showPasswords">Show passwords</label>
        </div>
        <h1>Your Passwords</h1>
        <p>{filteredPasswords.length}</p>
        {filteredPasswords.length === 0 ? (
          <div className="no-passwords">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
            <p>No Passwords</p>
          </div>
        ) : (
          <ul>
            {filteredPasswords.map((item, index) => (
              <li key={index}>
                <div>
                  <p>{item.website}</p>
                  <p>{item.username}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                    alt="stars"
                  />
                  {showPasswords && <p>{item.password}</p>}
                </div>
                <button
                  data-testid="delete"
                  onClick={() => this.handleDeletePassword(index)}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    alt="delete"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default PasswordManager

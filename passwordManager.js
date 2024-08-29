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


//index.css//

.password-manager {
  font-family: Roboto, sans-serif;
  background-color: #f8fafc;
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

/* Header styling */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header img {
  width: 50px;
}

h1 {
  color: #5763a5;
}

/* Form styling */
form div {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

form input {
  margin-left: 10px;
  padding: 5px;
}

button {
  background-color: #0b69ff;
  color: #ffffff;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button img {
  width: 20px;
}

/* Password list styling */
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

li p {
  margin: 0;
}

li img {
  width: 20px;
}

/* No Passwords View */
.no-passwords {
  text-align: center;
}

.no-passwords img {
  width: 100px;
}

/* Media queries */

/* Extra Small (Size < 576px) */
@media (max-width: 575.98px) {
  /* No Passwords View */
  .no-passwords {
    font-size: 14px; /* Adjust font size for small screens */
  }

  .no-passwords img {
    width: 80px; /* Adjust image size for small screens */
  }

  /* Masked Passwords View */
  .password-manager ul li p {
    font-size: 12px; /* Adjust font size for small screens */
  }
}

/* Small (Size >= 576px) */
@media (min-width: 576px) {
  /* No Passwords View */
  .no-passwords {
    font-size: 16px; /* Adjust font size for larger screens */
  }

  .no-passwords img {
    width: 100px; /* Adjust image size for larger screens */
  }

  /* Masked Passwords View */
  .password-manager ul li p {
    font-size: 14px; /* Adjust font size for larger screens */
  }
}

/* Medium (Size >= 768px) */
@media (min-width: 768px) {
  /* No Passwords View */
  .no-passwords {
    font-size: 18px; /* Adjust font size for medium screens */
  }

  .no-passwords img {
    width: 120px; /* Adjust image size for medium screens */
  }

  /* Masked Passwords View */
  .password-manager ul li p {
    font-size: 16px; /* Adjust font size for medium screens */
  }
}

/* Large (Size >= 992px) */
@media (min-width: 992px) {
  /* No Passwords View */
  .no-passwords {
    font-size: 20px; /* Adjust font size for large screens */
  }

  .no-passwords img {
    width: 140px; /* Adjust image size for large screens */
  }

  /* Masked Passwords View */
  .password-manager ul li p {
    font-size: 18px; /* Adjust font size for large screens */
  }
}

/* Extra Large (Size >= 1200px) */
@media (min-width: 1200px) {
  /* No Passwords View */
  .no-passwords {
    font-size: 22px; /* Adjust font size for extra-large screens */
  }

  .no-passwords img {
    width: 160px; /* Adjust image size for extra-large screens */
  }

  /* Masked Passwords View */
  .password-manager ul li p {
    font-size: 20px; /* Adjust font size for extra-large screens */
  }
}


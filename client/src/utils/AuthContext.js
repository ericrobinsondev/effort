import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    loginError: null
  };

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(values) {
    const { email, password } = values;
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response =>
        response.json().then(data => ({
          status: response.status,
          token: data.token,
          message: data.message
        }))
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            token: response.token,
            isAuth: true,
            loginError: null
          });
          localStorage.setItem('token', response.token);
        } else {
          this.setState({ loginError: response.message });
        }
      })
      .catch(error => {
        this.setState({ loginError: error.message });
      });
  }
  logout() {
    this.setState({ isAuth: false });
    localStorage.removeItem('token');
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          loginError: this.state.loginError
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };

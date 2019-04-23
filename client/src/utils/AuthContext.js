import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = { isAuth: false };

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(values) {
    // setting timeout to mimic an async login
    // TODO: Update with the token
    localStorage.setItem('token', 'logged in');
    setTimeout(() => this.setState({ isAuth: true }), 1000);
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
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };

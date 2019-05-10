import React from 'react';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    loginError: null
  };

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isCoach = this.isCoach.bind(this);
  }

  isCoach() {
    return this.state.user.coachOfGroups.length > 0;
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
          user: data.user,
          message: data.message
        }))
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            token: response.token,
            user: response.user,
            isAuth: true,
            loginError: null
          });
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        } else {
          this.setState({ loginError: response.message });
        }
      })
      .catch(error => {
        this.setState({ loginError: error.message });
      });
  }
  logout() {
    this.setState({ isAuth: false, user: null, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          loginError: this.state.loginError,
          user: this.state.user,
          isCoach: this.isCoach
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };

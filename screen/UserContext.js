import React, {createContext} from 'react';

const UserContext = createContext({
  userInfo: {},
  ctxLogIn: () => {},
  ctxLogOut: () => {},
  ctxGetUser: () => {},
});

export class UserProvider extends React.Component {
  ctxLogIn1 = (data) => {
    console.log('로그인정보를 context에 넣습니다.');
    this.setState({
      ...this.state,
      userInfo: {
        email: data.email,
        isLogin: true,
      },
    });
  };

  ctxLogOut = () => {
    console.log('로그인정보를 제거합니다.');
    this.setState({
      ...this.state,
      userInfo: {id: '', email: '', isLogin: false},
    });
  };
  ctxGetUser = (data) => {
    this.setState({
      ...this.state,
      userInfo: {
        id: data.id,
      },
    });
  };
  state = {
    userInfo: {email: '', isLogin: false},
    ctxLogIn: this.ctxLogIn1,
    ctxLogOut: this.ctxLogOut,
    ctxGetUser: this.ctxGetUser,
  };
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export const UserConsumer = UserContext.Consumer;

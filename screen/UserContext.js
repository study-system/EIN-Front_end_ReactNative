import React, {createContext} from 'react';

const UserContext = createContext({
  userInfo: {},
  ctxLogIn: () => {},
  ctxLogOut: () => {},
});

export class UserProvider extends React.Component {
  ctxLogIn1 = (data) => {
    console.log('로그인정보를 context에 넣습니다.');
    this.setState({
      ...this.state,
      userInfo: {
        email: data.email,
        isLogin: true, //생각해보니 필요는 없어 보임 추후 제거하자
      },
    });
  };

  ctxLogOut = () => {
    console.log('로그인정보를 제거합니다.');
    this.setState({...this.state, userInfo: {email: '', isLogin: false}});
  };
  state = {
    userInfo: {email: '', isLogin: false},
    ctxLogIn: this.ctxLogIn1,
    ctxLogOut: this.ctxLogOut,
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

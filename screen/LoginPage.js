import React, {useState, Component, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
const axios = require('axios');
const styles = require('../css/Styles');
import config from '../config';
import {UserConsumer} from './UserContext';

// 마이페이지 스크린
export default class LoginPage extends Component {
  state = {
    email: '',
    password: '',
    isLogIn: false,
    userInfo: {
      email: '',
      name: '',
      nickname: '',
      address: '',
      detail_address: '',
      phone: '',
    },
  };
  constructor(props) {
    super(props);
  }
  onChange = (e) => {
    this.setState({
      ...this.state, // 기존의 객체를 복사한 뒤
      [e._dispatchInstances.memoizedProps.name]: e.nativeEvent.text, // name 키를 가진 값을 value 로 설정
    });
  };
  handleEmail = (text) => {
    this.setState({email: text});
  };
  handlePassword = (text) => {
    this.setState({password: text});
  };

  login = (email, password, func) => {
    //http://myks790.iptime.org:8082/login
    //post
    //myks790@gmail.com
    //비밀번호
    const jsonForLogin = {
      email: email,
      password: password,
    };
    this.postReq(config.server + '/login', jsonForLogin, func);
  };
  postReq(url, json, func) {
    axios
      .post(url, json, {withCredentials: true})
      .then((response) => {
        console.log('요청성공', response);
        this.props.navigation.navigate('인증게시판');
        // this.props.navigation.navigate('로그인', {isLogIn: true});
        // this.setState({isLogIn: true});
        this.setState({isLogIn: true});

        func({email: this.state.email, isLogin: true});
      })
      .catch((error) => {
        console.log('요청실패', error);
        alert('실패');
      });
  }

  // updateLogin() {
  //   this.props.route.params.onSubmit({isLogIn: true});
  // }
  //   onSubmit = (cookie) => {
  //     this.props.route.params.onSubmit('쿠키');
  //   };
  //   getLogin = (cookie) => {
  //     this.props.getLoginToken('쿠키');
  //   };

  //마이페이지용
  ShowUserInfo = (props) => {
    console.log('유저인포', props);
    if (!this.state.isLoad) {
      var url = config.server + '/user/' + props.email;

      axios
        .get(url)
        .then((response) => {
          console.log(
            '마이페이지!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
            response,
            {
              withCredentials: true,
            },
          );
          this.setState({
            ...this.state,
            userInfo: response.data,
            isLoad: true,
          });
          props.func(response.data);
          console.log('스테이트', this.state);
        })
        .catch((error) => {
          console.log('유저인포겟요청', error);
        });
    }
    // var a = this.state.userInfo.email;
    // var a = this.state.userInfo.email;
    console.log('쇼부근', this.state);
    return (
      <View>
        <Text>Email: {this.state.userInfo.email}</Text>
        <Text>이름: {this.state.userInfo.name}</Text>
        <Text>닉네임: {this.state.userInfo.nickname}</Text>
        <Text>거주지: {this.state.userInfo.address}</Text>
        <Text> {this.state.userInfo.detail_address}</Text>
        <Text>전화번호: {this.state.userInfo.phone}</Text>
        <Text>{this.state.userInfo.push_agree}</Text>
      </View>
    );
  };

  logOut = (func) => {
    console.log('로그아웃');
    axios
      .get(config.server + '/logout', {
        withCredentials: true,
      })
      .then((response) => {
        console.log('요청성공', response);
        this.setState({
          email: '',
          password: '',
          isLogIn: false,
          userInfo: {
            email: '',
            name: '',
            nickname: '',
            address: '',
            detail_address: '',
            phone: '',
          },
          isLoad: false,
        });
        console.log('로그아웃후 정보 ', this.state.userInfo);
        func();
      })
      .catch(function (error) {
        console.log('요청실패', error);
        alert('실패');
      });
  };
  updateProfile = () => {
    console.log('정보수정');
    this.props.navigation.navigate('정보수정', {userInfo: this.state.userInfo});
  };
  render() {
    console.log(this.props.route.params);
    return (
      <UserConsumer>
        {({userInfo, ctxLogIn, ctxLogOut, ctxGetUser}) => (
          <View style={styles.containerLogin}>
            {this.state.isLogIn ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>마이페이지</Text>
                <this.ShowUserInfo email={userInfo.email} func={ctxGetUser} />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => this.updateProfile()}>
                  <Text style={styles.submitButtonText}> 정보수정 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => this.logOut(ctxLogOut)}>
                  <Text style={styles.submitButtonText}> 로그아웃 </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TextInput
                  name={'email'}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Email"
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  onChange={this.onChange}
                />
                <TextInput
                  name={'password'}
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor="black"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChange={this.onChange}
                />
                {/* <UserConsumer>
                {({ctxLogIn, ctxLogOut, userInfo}) => ( */}
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    this.login(this.state.email, this.state.password, ctxLogIn);
                    // ctxLogIn({email: this.state.email, isLogin: true});
                    console.log(
                      '유저정보컨텍스트!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
                      userInfo,
                    );
                  }}>
                  <Text style={styles.submitButtonText}> 로그인 </Text>
                </TouchableOpacity>
                {/* )}
              </UserConsumer> */}

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={styles.submitButtonText}> 회원가입 </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </UserConsumer>
    );
  }
}
// https://www.instamobile.io/react-native-tutorials/asyncstorage-example-react-native/

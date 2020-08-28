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
    refresh: false,
  };
  constructor(props) {
    super(props);
  }
  onSubmitCallback = (data) => {
    this.setState({
      ...this.state,
      userInfo: {
        email: data.email,
        name: data.name,
        nickname: data.nickname,
        address: data.address,
        detail_address: data.detail_address,
        phone: data.phone,
      },
    });
  };

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
        console.log('요청성공');
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
    if (!this.state.isLoad) {
      var url = config.server + '/user/' + props.email;

      axios
        .get(url, {withCredentials: true})
        .then((response) => {
          this.setState({
            ...this.state,
            userInfo: response.data,
            isLoad: true,
          });
          props.func(response.data);
        })
        .catch((error) => {
          console.log('유저정보', error);
        });
    }

    return (
      <View style={styles.containerLogin}>
        <View>
          <Text style={styles.inputNameTag}>이메일</Text>
          <Text style={styles.informationText}>
            {this.state.userInfo.email}
          </Text>
        </View>

        <View>
          <Text style={styles.inputNameTag}>이름</Text>
          <Text style={styles.informationText}>{this.state.userInfo.name}</Text>
        </View>
        <View>
          <Text style={styles.inputNameTag}>닉네임</Text>
          <Text style={styles.informationText}>
            {this.state.userInfo.nickname}
          </Text>
        </View>
        <View>
          <Text style={styles.inputNameTag}>전화번호</Text>
          <Text style={styles.informationText}>
            {this.state.userInfo.phone}
          </Text>
        </View>
        <View>
          <Text style={styles.inputNameTag}>거주지</Text>
          <Text style={styles.informationText}>
            {this.state.userInfo.address}
          </Text>
          <Text style={styles.informationText}>
            {this.state.userInfo.detail_address}
          </Text>
        </View>
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

        func();
      })
      .catch(function (error) {
        console.log('요청실패', error);
        alert('실패');
      });
  };
  updateProfile = () => {
    this.props.navigation.navigate('정보수정', {
      onSubmitCallback: this.onSubmitCallback,
      userInfo: this.state.userInfo,
    });
  };
  render() {
    return (
      <UserConsumer>
        {({userInfo, ctxLogIn, ctxLogOut, ctxGetUser}) => (
          <View style={styles.containerLogin}>
            {this.state.isLogIn ? (
              <View style={styles.containerLogin}>
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

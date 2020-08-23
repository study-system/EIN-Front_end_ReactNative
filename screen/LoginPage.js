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
    cookie: '',
    email: '',
    password: '',
    isLogIn: false,
  };
  constructor(props) {
    super(props);
  }
  onChange = (e) => {
    //input의 name
    console.log(e._dispatchInstances.memoizedProps.name);
    //input의 값
    console.log(e.nativeEvent.text);
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

  login = (email, password) => {
    //http://myks790.iptime.org:8082/login
    //post
    //myks790@gmail.com
    //비밀번호
    const jsonForLogin = {
      email: email,
      password: password,
    };
    this.postReq(config.server + '/login', jsonForLogin);
  };
  postReq(url, json) {
    axios
      .post(url, json, {withCredentials: true})
      .then((response) => {
        console.log('요청성공', response);
        alert('성공');

        // this.props.navigation.navigate('로그인', {isLogIn: true});
        // this.setState({isLogIn: true});
        this.setState({isLogIn: true});
        // this.updateLogin();
        // this.onSubmit('쿠키');
        // this.getLogin('쿠키');
      })
      .catch(function (error) {
        console.log('요청실패', error);
        alert('실패');
      });
  }

  updateLogin() {
    this.props.route.params.onSubmit({isLogIn: true});
  }
  //   onSubmit = (cookie) => {
  //     this.props.route.params.onSubmit('쿠키');
  //   };
  //   getLogin = (cookie) => {
  //     this.props.getLoginToken('쿠키');
  //   };
  render() {
    console.log(this.props.route.params);
    this.props.route.params.onSubmit({isLogIn: true});
    return (
      <View style={styles.containerLogin}>
        {this.state.isLogIn ? (
          <View>
            <Text>로그인완료</Text>
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
            <UserConsumer>
              {({ctxLogIn, ctxLogOut, userInfo}) => (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    console.log(userInfo, ctxLogIn);
                    this.login(this.state.email, this.state.password);
                    ctxLogIn({email: this.state.email, isLogIn: true});
                    console.log('컨텍스트', userInfo);
                    // ctxLogIn({email: this.state.email, isLogin: true});
                  }}>
                  <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
              )}
            </UserConsumer>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={styles.submitButtonText}> 회원가입 </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
// https://www.instamobile.io/react-native-tutorials/asyncstorage-example-react-native/

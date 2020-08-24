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

export default class Login extends Component {
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
  render() {
    return (
      <UserConsumer>
        {({userInfo, ctxLogIn, ctxLogOut}) => (
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
              <Text style={styles.submitButtonText}> Submit </Text>
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
      </UserConsumer>
    );
  }
}

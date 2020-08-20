import React, {useState, Component} from 'react';
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

import {createStackNavigator} from '@react-navigation/stack';

import Mypage from './Mypage';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import AuthUserSignUp from './AuthUserSignUp ';
import UserSignUp from './UserSignUp';
import Adress from './Adress';

const onSubmit = (cookie) => {
  console.log('쿠키', console);
};
const getLoginToken = (cookie) => {
  console.log('쿠키', console);
};
const MypageStack = createStackNavigator();
export default function MypageStackScreen2() {
  return (
    <MypageStack.Navigator>
      <MypageStack.Screen
        name="로그인"
        component={LoginPage}
        initialParams={{onSubmit: onSubmit}}
        getLoginToken={getLoginToken}
      />
      <MypageStack.Screen name="마이페이지" component={Mypage} />
      <MypageStack.Screen name="SignUp" component={SignUp} />
      <MypageStack.Screen name="UserSignUp" component={UserSignUp} />
      <MypageStack.Screen name="AuthUserSignUp" component={AuthUserSignUp} />
      <MypageStack.Screen name="Adress" component={Adress} />
    </MypageStack.Navigator>
  );
}

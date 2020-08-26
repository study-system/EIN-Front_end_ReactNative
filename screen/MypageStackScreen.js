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

import UserUpdate from './userUpdate';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import AuthUserSignUp from './AuthUserSignUp ';
import UserSignUp from './UserSignUp';
import Adress from './Adress';
import AgreePage from './AgreePage';

const onSubmit = (cookie) => {
  console.log('쿠키', console);
};
const getLoginToken = (cookie) => {
  console.log('쿠키', console);
};
const MypageStack = createStackNavigator();
export default function MypageStackScreen2({route, navigation}) {
  console.log(route.params.isLogin);
  return (
    <MypageStack.Navigator>
      <MypageStack.Screen
        name="로그인"
        component={LoginPage}
        options={{
          title: '로그인',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#eee',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        initialParams={route.params}
        getLoginToken={getLoginToken}
      />
      <MypageStack.Screen name="정보수정" component={UserUpdate} />
      <MypageStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '회원가입',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#eee',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MypageStack.Screen
        name="UserSignUp"
        component={UserSignUp}
        options={{
          title: '일반회원가입',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#eee',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MypageStack.Screen
        name="AuthUserSignUp"
        component={AuthUserSignUp}
        options={{
          title: '인증회원가입',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#eee',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <MypageStack.Screen name="Adress" component={Adress} />
      <MypageStack.Screen
        name="AgreePage"
        component={AgreePage}
        options={{
          title: '동의',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#eee',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </MypageStack.Navigator>
  );
}

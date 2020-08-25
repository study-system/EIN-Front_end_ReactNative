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
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import {Picker} from '@react-native-community/picker';
// import {TapGestureHandler} from 'react-native-gesture-handler';

const styles = require('../css/Styles');
const axios = require('axios');
const moment = require('moment');
//기능 import
const MkPicker = require('../function/Mkpicker');
const GetDetail = require('../function/GetDetail');

//스크린 import
import DetailsScreen from '../screen/DetailsScreen';
import AuthBoardScreen from '../screen/AuthBoardScreen';
import UpdateScreen from '../screen/UpdateScreen';

const AuthBoardStack = createStackNavigator();
export default function AuthBoardStackScreen({route, navigation}) {
  console.log('인보스택', route.params.isLogin);
  return (
    <AuthBoardStack.Navigator>
      <AuthBoardStack.Screen
        name="인증게시판"
        component={AuthBoardScreen}
        initialParams={{
          auth: 'yes',
          isLogin: route.params.isLogin,
          boardName: '인증게시판',
        }}
        options={{headerShown: false}}
      />
      <AuthBoardStack.Screen
        name="인증게시판Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
      <AuthBoardStack.Screen
        name="인증게시판Update"
        component={UpdateScreen}
        options={{headerShown: false}}
      />
    </AuthBoardStack.Navigator>
  );
}

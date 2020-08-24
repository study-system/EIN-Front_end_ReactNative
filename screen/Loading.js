import React from 'react';
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

export default function Loading({route, navigation}) {
  var playAlert = setInterval(function () {
    navigation.navigate(route.params.nextPage);
  }, 1000);
}

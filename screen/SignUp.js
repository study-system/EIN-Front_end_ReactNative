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

const styles = require('../css/Styles');
// 마이페이지 스크린
export default class SignUp extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>회원가입</Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate('UserSignUp')}>
          <Text style={styles.submitButtonText}> 일반회원가입 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate('AuthUserSignUp')}>
          <Text style={styles.submitButtonText}> 인증회원가입 </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

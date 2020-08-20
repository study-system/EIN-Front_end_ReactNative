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
export default class UserSignUp extends Component {
  state = {
    cookie: '',
    email: '',
    password: '',
    name: '',
    phone: '',
    addr: '',
    roadAddr: '',
    siNm: '',
  };
  constructor(props) {
    super(props);
  }
  handleEmail = (text) => {
    this.setState({email: text});
  };
  handlePassword = (text) => {
    this.setState({password: text});
  };
  handleName = (text) => {
    this.setState({name: text});
  };
  handleNickName = (text) => {
    this.setState({NickName: text});
  };
  handlePhone = (text) => {
    this.setState({Phone: text});
  };
  handleAddr = (text) => {
    this.setState({addr: text});
  };
  handleRoadAddr = (text) => {
    this.setState({addr: text});
  };
  handleSiNm = (text) => {
    this.setState({addr: text});
  };

  render() {
    let json = {
      email: 'myks790@gmail.com',
      password: 1234,
      name: '강상훈',
      nickname: '닉네임',
      phone: '01012345678',
      address: '제주도 특별자치도 제주시 진남로 99길 10',
      detail_address: '101호',
      location_id: 17,
      push_agree: 'yes',
    };
    const onSubmit = (tmp) => {
      console.log('넘어온 주소 값', tmp);
      this.state.addr = tmp.roadAddr;
      this.state.sido = tmp.siNm;
    };
    return (
      <View style={styles.containerLogin}>
        <Text>유저회원가입</Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="black"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="이름"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleName}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="닉네임"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleNickName}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="전화번호"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handlePhone}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="주소"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleAddr}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() =>
            this.props.navigation.navigate('Adress', {
              addrName: this.state.addr,
              onSubmit: onSubmit,
            })
          }>
          <Text style={styles.submitButtonText}> 주소찾기 </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="주소"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleRoadAddr}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="주소"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleSiNm}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate('로그인')}>
          <Text style={styles.submitButtonText}> 회원가입 </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

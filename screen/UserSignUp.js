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
const axios = require('axios');
const styles = require('../css/Styles');
// 마이페이지 스크린
export default class UserSignUp extends Component {
  state = {
    cookie: '',
    email: '',
    password: '',
    name: '',
    nickName: '',
    phone: '',
    addr: '',
    roadAddr: '',
    siNm: '',
    detail_address: '',
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios
      .get('http://myks790.iptime.org:8082/board/location')
      .then((response) => {
        //state.data에 response로 받은 json 값을 넣어줌
        this.setState({sido: response.data});
      });
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
  transSiNmToSido = (siNm) => {
    var temp = this.state.sido.filter((item) => item.name == siNm);
    return temp[0].name;
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
      this.state.roadAddr = tmp.roadAddr;
      this.state.siNm = tmp.siNm;
      this.transSiNmToSido(this.state.siNm);
    };

    return (
      <ScrollView>
        <View style={styles.containerLogin}>
          <Text>유저회원가입</Text>
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
          <TextInput
            name={'name'}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="이름"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChange={this.onChange}
          />
          <TextInput
            name={'nickName'}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="닉네임"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChange={this.onChange}
          />
          <TextInput
            name={'phone'}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="전화번호"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChange={this.onChange}
            dataDetectorTypes={'phoneNumber'}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              this.props.navigation.navigate('Adress', {
                onSubmit: onSubmit,
              })
            }>
            <Text style={styles.submitButtonText}> 주소찾기 </Text>
          </TouchableOpacity>
          <TextInput
            editable={false}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="주소"
            placeholderTextColor="black"
            autoCapitalize="none"
            value={this.state.roadAddr}
          />
          <TextInput
            name={'detail_address'}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="상세주소"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChange={this.onChange}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => this.props.navigation.navigate('로그인')}>
            <Text style={styles.submitButtonText}> 회원가입 </Text>
          </TouchableOpacity>
          <Text>{}</Text>
        </View>
      </ScrollView>
    );
  }
}

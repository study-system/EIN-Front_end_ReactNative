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
import config from '../config';
// 마이페이지 스크린
export default class UserSignUp extends Component {
  state = {
    email: '',
    password: '',
    rePassword: '',
    name: '',
    nickName: '',
    phone: '',
    roadAddr: '',
    siNm: '',
    detail_address: '',
    validate: {
      email: true,
      password: true,
      name: true,
      nickName: true,
      phone: true,
      roadAddr: true,
      siNm: true,
      detail_address: true,
      req: true,
    },
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios.get(config.server + '/board/location').then((response) => {
      //state.data에 response로 받은 json 값을 넣어줌
      this.setState({sido: response.data});
    });
  }
  onChange = (e) => {
    this.setState({
      ...this.state, // 기존의 객체를 복사한 뒤
      [e._dispatchInstances.memoizedProps.name]: e.nativeEvent.text, // name 키를 가진 값을 value 로 설정
    });
  };
  transSiNmToSido = (siNm) => {
    if (siNm) {
      var temp = this.state.sido.filter((item) => item.name == siNm);
      return temp[0].id;
    } else {
      return;
    }
  };
  varidateEmail = (e) => {
    let emailExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 출처:https://for1123.tistory.com/30
    if (e.nativeEvent.text.match(emailExp)) {
      //버튼 disabled를 위한 거라 반대
      this.state.validate.email = false;
    } else {
      this.state.validate.email = true;
    }

    this.onChange(e);
  };
  varidatePassword = (e) => {
    var booleanPR = true;
    var booleanPL = true;
    if (e.nativeEvent.text.length > 3) {
      //버튼 disabled를 위한 거라 반대
      booleanPL = false;
    } else {
      booleanPL = true;
    }
    if (e.nativeEvent.text == this.state.password) {
      booleanPR = false;
    } else {
      booleanPR = true;
    }
    this.state.validate.password = booleanPL || booleanPR;

    this.onChange(e);
  };
  varidateName = (e) => {
    if (e.nativeEvent.text.length > 1) {
      //버튼 disabled를 위한 거라 반대
      this.state.validate.name = false;
    } else {
      this.state.validate.name = true;
    }

    this.onChange(e);
  };
  varidateNickName = (e) => {
    if (e.nativeEvent.text.length > 1) {
      //버튼 disabled를 위한 거라 반대
      this.state.validate.nickName = false;
    } else {
      this.state.validate.nickName = true;
    }

    this.onChange(e);
  };

  varidatePhone = (e) => {
    let emailExp = /^[0-9]{10,11}$/i;
    // 출처:https://for1123.tistory.com/30
    if (e.nativeEvent.text.match(emailExp)) {
      //버튼 disabled를 위한 거라 반대
      this.state.validate.phone = false;
    } else {
      this.state.validate.phone = true;
    }

    this.onChange(e);
  };

  varidateRoadAddr = (e) => {
    if (e.nativeEvent.text) {
      //버튼 disabled를 위한 거라 반대
      this.state.validate.roadAddr = false;
    } else {
      this.state.validate.roadAddr = true;
    }

    this.onChange(e);
  };
  varidateDetail = (e) => {
    if (e.nativeEvent.text) {
      //버튼 disabled를 위한 거라 반대
      this.state.validate.detail_address = false;
    } else {
      this.state.validate.detail_address = true;
    }

    this.onChange(e);
  };

  render() {
    const signInReq = () => {
      axios
        .post(config.server + '/user', jsonForSignIn)
        .then(function (response) {
          this.setState();
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const onSubmit = (tmp) => {
      this.state.roadAddr = tmp.roadAddr;
      this.state.siNm = tmp.siNm;
      this.transSiNmToSido(this.state.siNm);
    };
    var jsonForSignIn = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      nickname: this.state.nickName,
      phone: Number(this.state.phone),
      address: this.state.roadAddr,
      detail_address: this.state.detail_address,
      location_id: this.transSiNmToSido(this.state.siNm),
      push_agree: 'yes',
    };
    const checkBoolForSignUp = () => {
      if (this.state.validate.email) {
        alert('이메일형식이 올바르지 않습니다.');
      } else if (this.state.validate.password) {
        alert('비밀번호 길이가 짧거나 비밀번호확인과 같지 않습니다. ');
      } else if (this.state.validate.name) {
        alert('이름을 입력해주십시오');
      } else if (this.state.validate.nickName) {
        alert('별명을 입력해주십시오');
      } else if (this.state.validate.phone) {
        alert('전화번호 형식이 올바르지 않습니다.');
      } else if (this.state.validate.address) {
        alert('주소찾기를 해주십시오');
      } else if (this.state.validate.detail_address) {
        alert('상세주소를 입력해주십시오');
      } else if (this.state.validate.location_id) {
        alert('주소찾기를 다시 해주십시오');
      } else {
        signInReq();
        this.props.navigation.navigate('로그인');
      }
    };
    return (
      <ScrollView>
        <View style={styles.containerLogin}>
          <View style={{marginTop: 20}}>
            <Text style={styles.inputNameTag}>이메일</Text>
            <TextInput
              name={'email'}
              style={this.state.validate.email ? styles.input : styles.inputO}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChange={this.varidateEmail}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>비밀번호</Text>
            <TextInput
              name={'password'}
              style={
                this.state.validate.password ? styles.input : styles.inputO
              }
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor="black"
              autoCapitalize="none"
              secureTextEntry={true}
              onChange={this.onChange}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>비밀번호확인</Text>
            <TextInput
              name={'rePassword'}
              style={
                this.state.validate.password ? styles.input : styles.inputO
              }
              underlineColorAndroid="transparent"
              placeholder="Password확인"
              placeholderTextColor="black"
              autoCapitalize="none"
              secureTextEntry={true}
              onChange={this.varidatePassword}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>이름</Text>
            <TextInput
              name={'name'}
              style={this.state.validate.name ? styles.input : styles.inputO}
              underlineColorAndroid="transparent"
              placeholder="이름"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChange={this.varidateName}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>닉네임</Text>
            <TextInput
              name={'nickName'}
              style={
                this.state.validate.nickName ? styles.input : styles.inputO
              }
              underlineColorAndroid="transparent"
              placeholder="닉네임"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChange={this.varidateNickName}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>전화번호</Text>
            <TextInput
              name={'phone'}
              style={this.state.validate.phone ? styles.input : styles.inputO}
              underlineColorAndroid="transparent"
              placeholder="전화번호"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChange={this.varidatePhone}
              dataDetectorTypes={'phoneNumber'}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>주소</Text>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              this.props.navigation.navigate('Adress', {
                onSubmit: onSubmit,
                reqPage: this.props.route.params.nextPage,
              })
            }>
            <Text style={styles.submitButtonText}> 주소찾기 </Text>
          </TouchableOpacity>
          <TextInput
            editable={false}
            style={this.state.validate.roadAddr ? styles.input : styles.inputO}
            underlineColorAndroid="transparent"
            placeholder="주소"
            placeholderTextColor="black"
            autoCapitalize="none"
            value={this.state.roadAddr}
            onChange={this.varidateRoadAddr}
          />
          <TextInput
            name={'detail_address'}
            style={this.state.validate.roadAddr ? styles.input : styles.inputO}
            underlineColorAndroid="transparent"
            placeholder="상세주소"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChange={this.varidateDetail}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              checkBoolForSignUp();
            }}>
            <Text style={styles.submitButtonText}> 회원가입 </Text>
          </TouchableOpacity>
          <Text>{}</Text>
        </View>
      </ScrollView>
    );
  }
}

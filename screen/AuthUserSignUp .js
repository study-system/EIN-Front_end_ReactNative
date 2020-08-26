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
export default class AuthUserSignUp extends Component {
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
    company: '',
    companyNumber: '',
    position: '',
    website: '',
    validate: {
      email: true,
      password: true,
      name: true,
      nickName: true,
      phone: true,
      roadAddr: true,
      siNm: true,
      detail_address: true,
      company: true,
      companyNumber: true,
      position: true,
      website: true,
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
    //input의 name
    console.log(e._dispatchInstances.memoizedProps.name);
    //input의 값
    console.log(e.nativeEvent.text);
    this.setState({
      ...this.state, // 기존의 객체를 복사한 뒤
      [e._dispatchInstances.memoizedProps.name]: e.nativeEvent.text, // name 키를 가진 값을 value 로 설정
    });
    console.log(this.state.email);
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
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.email = false;
    } else {
      console.log('포맷실패');
      this.state.validate.email = true;
    }

    this.onChange(e);
  };
  varidatePassword = (e) => {
    var booleanPR = true;
    var booleanPL = true;
    if (e.nativeEvent.text.length > 3) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      booleanPL = false;
    } else {
      console.log('포맷실패');
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
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.name = false;
    } else {
      console.log('포맷실패');
      this.state.validate.name = true;
    }

    this.onChange(e);
  };
  varidateNickName = (e) => {
    if (e.nativeEvent.text.length > 1) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.nickName = false;
    } else {
      console.log('포맷실패');
      this.state.validate.nickName = true;
    }

    this.onChange(e);
  };

  varidatePhone = (e) => {
    let emailExp = /^[0-9]{10,11}$/i;
    // 출처:https://for1123.tistory.com/30
    if (e.nativeEvent.text.match(emailExp)) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.phone = false;
    } else {
      console.log('포맷실패');
      this.state.validate.phone = true;
    }

    this.onChange(e);
  };

  varidateRoadAddr = (e) => {
    if (e.nativeEvent.text) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.roadAddr = false;
    } else {
      console.log('포맷실패');
      this.state.validate.roadAddr = true;
    }

    this.onChange(e);
  };
  varidateDetail = (e) => {
    if (e.nativeEvent.text) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.detail_address = false;
    } else {
      console.log('포맷실패');
      this.state.validate.detail_address = true;
    }

    this.onChange(e);
  };

  varidateCompany = (e) => {
    if (e.nativeEvent.text.length > 1) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.company = false;
    } else {
      console.log('포맷실패');
      this.state.validate.company = true;
    }

    this.onChange(e);
  };

  varidateCompanyNumber = (e) => {
    let emailExp = /^[0-9]{10}$/i;
    // 출처:https://for1123.tistory.com/30
    if (e.nativeEvent.text.match(emailExp)) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.companyNumber = false;
    } else {
      console.log('포맷실패');
      this.state.validate.companyNumber = true;
    }

    this.onChange(e);
  };

  varidatePosition = (e) => {
    if (e.nativeEvent.text.length > 1) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.position = false;
    } else {
      console.log('포맷실패');
      this.state.validate.position = true;
    }

    this.onChange(e);
  };
  varidateWebsite = (e) => {
    var valid = /^(ftp|http|https):\/\/[^ "]+$/;
    //출처 https://www.it-swarm.dev/ko/javascript/url-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%82%AC%EB%A5%BC%EC%9C%84%ED%95%9C-%EC%A0%95%EA%B7%9C%EC%8B%9D-javascript/967108519/
    if (e.nativeEvent.text.length > 10) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      this.state.validate.website = false;
    } else {
      console.log('포맷실패');
      this.state.validate.website = true;
    }

    this.onChange(e);
  };

  //http://myks790.iptime.org:8082/user
  //post
  render() {
    // let json = {
    //   email: 'myks790@gmail.com',
    //   password: 1234,
    //   name: '강상훈',
    //   nickname: '닉네임',
    //   phone: '01012345678',
    //   address: '제주도 특별자치도 제주시 진남로 99길 10',
    //   detail_address: '101호',
    //   location_id: 17,
    //   push_agree: 'yes',
    // };
    const signInReq = () => {
      axios
        .post('http://myks790.iptime.org:8082/user', jsonForSignIn)
        .then(function (response) {
          console.log('계정생성성공', response);
          this.setState();
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const onSubmit = (tmp) => {
      console.log('넘어온 주소 값', tmp);
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
      company: '회~사',
      companyNumber: 109394295,
      position: '대리',
      website: 'http://equalda.com',
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

          {/* 인증유저기입내용 */}
          <View>
            <Text style={styles.inputNameTag}>회사명</Text>
            <TextInput
              name={'company'}
              style={this.state.validate.company ? styles.input : styles.inputO}
              underlineColorAndroid="transparent"
              placeholder="회사명"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChange={this.varidateCompany}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>사업자등록번호</Text>
            <TextInput
              name={'companyNumber'}
              style={
                this.state.validate.companyNumber ? styles.input : styles.inputO
              }
              underlineColorAndroid="transparent"
              placeholder="-없이 입력해주세요"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChange={this.varidateCompanyNumber}
              dataDetectorTypes={'phoneNumber'}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>직책</Text>
            <TextInput
              name={'position'}
              style={
                this.state.validate.position ? styles.input : styles.inputO
              }
              underlineColorAndroid="transparent"
              placeholder="ex)대리, 부장, ..."
              placeholderTextColor="black"
              autoCapitalize="none"
              onChange={this.varidatePosition}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>웹사이트</Text>
            <TextInput
              name={'website'}
              style={this.state.validate.website ? styles.input : styles.inputO}
              underlineColorAndroid="transparent"
              placeholder="httP://example.com"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChange={this.varidateWebsite}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              console.log(jsonForSignIn);
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

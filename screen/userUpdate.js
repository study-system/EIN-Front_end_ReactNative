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
import axios from 'axios';
import {UserConsumer} from './UserContext';
const styles = require('../css/Styles');
import config from '../config';
import CheckBox from '@react-native-community/checkbox';
// 마이페이지 스크린
export default class Mypage extends Component {
  state = {
    validate: {
      email: true,
      password: true,
      newPassword: true,
      curPassword: true,
      nickName: true,
      phone: true,
      roadAddr: true,
      siNm: true,
      detail_address: true,
      req: true,
    },
    userInfo: {
      email: '',
      name: '',
      nickname: '',
      address: '',
      detail_address: '',
      phone: '',
      password: '',
      newPassword: '',
      rePassword: '',
      pushAgree: '',
    },
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.setState(
      {
        ...this.state,
        validate: {
          ...this.state.validate,
          email: false,
          password: false,
          newPassword: false,
          nickName: false,
          phone: false,
          roadAddr: false,
          siNm: false,
          detail_address: false,
        },
        userInfo: this.props.route.params.userInfo,
      },
      () => {
        console.log('userInfo들어오는지', JSON.stringify(this.state));
      },
    );
    axios.get(config.server + '/board/location').then((response) => {
      //state.data에 response로 받은 json 값을 넣어줌
      this.setState({...this.state, sido: response.data}, () => {
        console.log('시도업데이트 확인용', JSON.stringify(this.state));
      });
    });
  }

  MkTextInputPassword = (props) => {
    return (
      <TextInput
        underlineColorAndroid="transparent"
        placeholderTextColor="black"
        autoCapitalize="none"
        secureTextEntry={true}
        style={this.state.validate.curPassword ? styles.input : styles.inputO}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
      />
    );
  };
  onChange = (e) => {
    //input의 name
    console.log(e._dispatchInstances.memoizedProps.name);
    //input의 값
    console.log(e.nativeEvent.text);
    this.setState({
      ...this.state, // 기존의 객체를 복사한 뒤
      userInfo: {
        ...this.state.userInfo,
        [e._dispatchInstances.memoizedProps.name]: e.nativeEvent.text,
      }, // name 키를 가진 값을 value 로 설정
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
    if (e.nativeEvent.text == this.state.userInfo.newPassword) {
      booleanPR = false;
    } else {
      booleanPR = true;
    }
    this.state.validate.password = booleanPL || booleanPR;

    this.onChange(e);
  };
  varidateNewPassword = (e) => {
    if (e.nativeEvent.text.length > 2) {
      //버튼 disabled를 위한 거라 반대
      this.state.validate.newPassword = false;
    } else {
      this.state.validate.newPassword = true;
    }

    this.onChange(e);
  };
  varidateCurPassword = (e) => {
    if (e.nativeEvent.text.length > 2) {
      //버튼 disabled를 위한 거라 반대
      this.state.validate.curPassword = false;
    } else {
      this.state.validate.curPassword = true;
    }

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
  setToggleCheckBox = (e) => {
    console.log('처크박스', e);
    this.setState({
      ...this.state,
      userInfo: {
        ...this.state.userInfo,
        pushAgree: !this.state.userInfo.pushAgree,
      },
    });
  };
  transBoolToYesNo = (bool) => {
    if (bool) {
      return 'yes';
    } else {
      return 'no';
    }
  };
  render() {
    const userInfoUpdate = () => {
      //'http://myks790.iptime.org:8082/user/myks790%40gmail.com'
      var url = config.server + '/user/' + this.state.userInfo.email;
      console.log('url', url);
      var jsonForUpdate = {
        password: this.state.userInfo.password,
        newPassword: this.state.userInfo.newPassword,
        nickname: this.state.userInfo.nickname,
        phone: this.state.userInfo.phone,
        location_id:
          this.transSiNmToSido(this.state.userInfo.siNm) ||
          this.state.userInfo.location_id,
        address: this.state.userInfo.address,
        addressDetail: this.state.userInfo.detail_address,
        pushAgree: this.transBoolToYesNo(this.state.userInfo.pushAgree),
      };
      console.log(JSON.stringify(jsonForUpdate));
      axios
        .put(url, jsonForUpdate, {withCredentials: true})
        .then((response) => {
          console.log('응답!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', response);
          // console.log(this.props);
          this.props.navigation.navigate('로그인');
        })
        .catch((error) => {
          console.log(error);
          console.log('업데이트실패');
          alert('비밀번호가 맞지 않습니다.', error);
        });
    };

    const onSubmit = (tmp) => {
      console.log('넘어온 주소 값', tmp);
      this.state.userInfo.address = tmp.roadAddr;
      this.state.userInfo.siNm = tmp.siNm;
    };
    const checkBoolForSignUp = () => {
      if (this.state.validate.curPassword) {
        alert('비밀번호의 길이가 너무 짧습니다.');
      } else if (this.state.validate.password) {
        alert('비밀번호 길이가 짧거나 비밀번호확인과 같지 않습니다. ');
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
        userInfoUpdate();
      }
    };
    return (
      <ScrollView>
        <View style={styles.containerLogin}>
          <View>
            <Text style={styles.inputNameTag}>이메일</Text>
            <Text style={styles.informationText}>
              Email: {this.state.userInfo.email}
            </Text>
          </View>
          <View>
            <Text style={styles.inputNameTag}>비밀번호</Text>
            <this.MkTextInputPassword
              name={'password'}
              onChange={this.varidateCurPassword}
              placeholder={'현재비밀번호'}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>새로운 비밀번호</Text>
            <TextInput
              name={'newPassword'}
              style={
                this.state.validate.newPassword ? styles.input : styles.inputO
              }
              underlineColorAndroid="transparent"
              placeholder="새로운비밀번호"
              placeholderTextColor="black"
              autoCapitalize="none"
              secureTextEntry={true}
              onChange={this.varidateNewPassword}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>새로운 비밀번호 확인</Text>
            <TextInput
              name={'rePassword'}
              style={
                this.state.validate.password ? styles.input : styles.inputO
              }
              underlineColorAndroid="transparent"
              placeholder="새로운비밀번호확인"
              placeholderTextColor="black"
              autoCapitalize="none"
              secureTextEntry={true}
              onChange={this.varidatePassword}
            />
          </View>
          <View>
            <Text style={styles.inputNameTag}>닉네임</Text>
            <TextInput
              name={'nickname'}
              style={
                this.state.validate.nickName ? styles.input : styles.inputO
              }
              underlineColorAndroid="transparent"
              placeholder="닉네임"
              placeholderTextColor="black"
              autoCapitalize="none"
              onChange={this.varidateNickName}
              defaultValue={this.state.userInfo.nickname}
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
              defaultValue={this.state.userInfo.phone}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              this.props.navigation.navigate('Adress', {
                onSubmit: onSubmit,
                reqPage: '정보수정',
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
            value={this.state.userInfo.address}
            onChange={this.varidateRoadAddr}
            defaultValue={this.state.userInfo.address}
          />
          <TextInput
            name={'detail_address'}
            style={this.state.validate.roadAddr ? styles.input : styles.inputO}
            underlineColorAndroid="transparent"
            placeholder="상세주소"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChange={this.varidateDetail}
            defaultValue={this.state.userInfo.detail_address}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'center',
            }}>
            <Text style={styles.inputNameTag}>푸쉬알람On/Off</Text>
            <CheckBox
              style={{marginTop: -6}}
              name={'pushAgree'}
              disabled={false}
              value={this.state.userInfo.pushAgree}
              onValueChange={this.setToggleCheckBox}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              // checkBoolForSignUp();
              console.log(JSON.stringify(this.state));
              checkBoolForSignUp();
            }}>
            <Text style={styles.submitButtonText}> 수정 </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

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
export default class Adress extends Component {
  state = {
    page: 1,
    value: '',
    siNm: '',
    roadAddr: '',
  };
  constructor(props) {
    super(props);
    this.state.value = this.props.route.params.addrName;
  }
  //http://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDIwMDgyMDIwMDYyODExMDA4NDk=&keyword=%EC%9A%B0%ED%8F%89%EB%A1%9C&resultType=json
  //get
  //"roadAddrPart1": "제주특별자치도 제주시 우평로 2",
  //"siNm": "제주특별자치도",
  componentDidMount() {
    this.state.value = this.props.route.params.addrName;

    this.getList();
  }
  handleValue = (text) => {
    this.setState({value: text});
    this.getList();
  };
  onFormSubmit = (siNm, roadAddr) => {
    console.log('onSubmit 메서드 진입');
    this.props.onSubmit({siNm: siNm, roadAddr: roadAddr});
  };
  getList = () => {
    //resultType=json
    let url =
      'http://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDIwMDgyMDIwMDYyODExMDA4NDk=&keyword=' +
      this.state.value +
      '&resultType=json';
    axios
      .get(url)
      .then((response) => {
        //state.data에 response로 받은 json 값을 넣어줌
        var objForSettingFilter = {};
        console.log('json', JSON.parse(response.request._response));
        var data = JSON.parse(response.request._response);
        console.log('json2', data.results.juso);
        objForSettingFilter.list = data.results.juso;
        this.setState(objForSettingFilter);
      })
      .catch(function (error) {
        console.log(error);
        console.log('실패');
      });
  };
  render() {
    const Item = ({roadAddr}) => (
      <View style={styles.item}>
        <Text style={styles.postTitle}>{roadAddr} </Text>
      </View>
    );

    const renderItem = ({item}) => (
      <View>
        <TouchableOpacity
          style={{backgroundColor: '#fff'}}
          onPress={() => {
            this.props.navigation.navigate('UserSignUp', {
              siNm: item.siNm,
              roadAddrPart1: this.state.roadAddrPart1,
            });
          }}>
          <Item roadAddr={item.roadAddrPart1} />
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.containerLogin}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="주소명"
          placeholderTextColor="black"
          autoCapitalize="none"
          onChangeText={this.handleValue}
        />
        <FlatList
          data={this.state.list}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            this.onFormSubmit(this.state.siNm, this.state.roadAddr);
            this.props.navigation.navigate('UserSignUp');
          }}>
          <Text style={styles.submitButtonText}> 확인 </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

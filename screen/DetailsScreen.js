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
import config from '../config';
const styles = require('../css/Styles');
const axios = require('axios');
const moment = require('moment');
import {UserConsumer} from './UserContext';
//기능 import
const GetDetail = require('../function/GetDetail');

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
  }
  boardId = this.props.route.params.boardId;
  auth = this.props.route.params.auth;
  state = {
    data: {
      title: '',
      content: '',
      writer: '',
      start_date: '',
      end_date: '',
      location: '',
    },
  };

  componentDidMount() {
    console.log('스테이트확인', this.state);
    // 시도 필터정보
    axios.get(config.server + '/board/' + this.boardId).then((response) => {
      //state.data에 response로 받은 json 값을 넣어줌
      this.setState({data: response.data});
      console.log('정보확인\n ', response.data);
    });
  }
  deleteCreateAlert = () =>
    Alert.alert(
      '확인',
      '정말 게시글을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: '확인', onPress: () => this.onSubmitDelete()},
        ,
      ],
      {cancelable: false},
    );

  onSubmitDelete = () => {
    axios
      .delete('http://myks790.iptime.org:8082/board/' + this.boardId, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);

        this.props.navigation.navigate('인증게시판');
        console.log('글삭제성공');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <UserConsumer>
        {({userInfo, ctxLogIn, ctxLogOut}) => (
          <View style={styles.containerLogin}>
            {/* <Text>{JSON.stringify(id)}</Text> */}
            <View
              style={{
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 20,
                backgroundColor: '#000',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('인증게시판');
                  }}>
                  <Text style={{fontSize: 24, color: '#fff'}}>
                    {this.props.route.params.auth == 'yes'
                      ? '<  인증게시판'
                      : '<  자유게시판'}
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.data.email == userInfo.email ? (
                <View style={{marginTop: -10}}>
                  <TouchableOpacity
                    style={stylesEm.submitButtonWhite}
                    onPress={() => {
                      this.props.navigation.navigate('Update', {
                        boardId: this.boardId,
                        auth: this.auth,
                      });
                    }}>
                    <Text style={stylesEm.submitButtonTextWhite}>수정하기</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text />
              )}
            </View>
            {/* <GetDetail url={config.server + '/board/' + this.boardId} /> */}
            <ScrollView style={{flex: 1, marginTop: 20}}>
              <View>
                <View style={stylesEm.titleBox}>
                  <Text style={stylesEm.title}>{this.state.data.title}</Text>
                </View>
                <View style={stylesEm.dateBox}>
                  <View style={stylesEm.dateItem}>
                    <Text>
                      시작날짜: {this.state.data.start_date.substr(0, 10)}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text />
                  </View>
                  <View style={stylesEm.dateItem}>
                    <Text>
                      마감날짜: {this.state.data.end_date.substr(0, 10)}
                    </Text>
                  </View>
                </View>
                <View style={stylesEm.titleBox}>
                  <Text>지역: {this.state.data.location}</Text>
                </View>
                <View style={stylesEm.contentsBox}>
                  <View style={stylesEm.contentBox}>
                    <Text>{this.state.data.content}</Text>
                  </View>
                  <View style={stylesEm.contentBox}>
                    <Text>{this.state.data.imageurl}</Text>
                  </View>
                </View>
                <View style={stylesEm.writerBox}>
                  <View style={stylesEm.dateItem}>
                    <Text>작성자: {this.state.data.nickname}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text />
                  </View>
                  <View style={stylesEm.dateItem}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log('신고하기');
                      }}>
                      <Text style={stylesEm.reportText}>신고하기</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {this.state.data.email == userInfo.email ? (
                <View>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                      this.deleteCreateAlert();
                    }}>
                    <Text style={styles.submitButtonText}>삭제하기</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text />
              )}
            </ScrollView>
          </View>
        )}
      </UserConsumer>
    );
  }
}

const stylesEm = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  titleBox: {
    marginTop: 10,
    marginLeft: 20,
    borderColor: '#555',
    borderBottomWidth: 2,
    width: 360,
  },
  date: {
    fontSize: 12,
  },
  dateBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginLeft: 20,
    borderColor: '#555',
    borderBottomWidth: 2,
    width: 360,
  },
  dateItem: {
    flex: 2,
  },
  contentBox: {
    marginLeft: 20,
    width: 340,
  },
  contentsBox: {
    marginTop: 30,
    marginLeft: 20,
    borderColor: '#555',
    borderBottomWidth: 2,
    width: 360,
  },
  writerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    borderColor: '#555',
    borderBottomWidth: 2,
    width: 360,
  },
  reportText: {
    color: '#07f',
  },
  submitButtonWhite: {
    backgroundColor: 'white',
    padding: 10,
    margin: 15,
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
  },
  submitButtonTextWhite: {
    color: '#000',
  },
});

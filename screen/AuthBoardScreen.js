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
//기능 import
const MkPicker = require('../function/Mkpicker');
const GetDetail = require('../function/GetDetail');
import dumy from '../dumydata';
import {UserConsumer} from './UserContext';

//스크린 import
//
//인증게시판 스크린 클래스
export default class AuthBoardScreen extends Component {
  state = {
    auth: 'yes',
    major: 0,
    sido: 0,
    target: 0,
    page: 1,
    reset: false,
  };
  constructor(props) {
    super(props);
    // console.log('Auth', this.props.data2);
    console.log(props);
    this.state.auth = props.route.params.auth;
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  // 실행한 결과가 오면 자동으로 리플래시 되면서 반영함. 1번
  componentDidMount() {
    this.getList();
  }

  componentWillUnmount() {
    console.log('will마운트');
  }
  handleStatusChange(status) {
    console.log('state체인지');
  }
  onLoad = () => {
    this.props.navigation.addListener('willFocus', () => {
      console.log('focus');
    });
  };
  getList = () => {
    console.log('컨피그', config);
    let url =
      config.server +
      '/board?auth=' +
      this.state.auth +
      '&page=' +
      this.state.page +
      '&pageSize=8';
    if (this.state.location > 0) {
      url = url + '&location_id=' + this.state.location;
    }
    if (this.state.major > 0) {
      url = url + '&major_id=' + this.state.major;
    }
    if (this.state.target > 0) {
      url = url + '&target_id=' + this.state.target;
    }
    axios.get(url).then((response) => {
      //state.data에 response로 받은 json 값을 넣어줌
      var objForSettingFilter = {};
      objForSettingFilter.authBoard = response.data.contents;
      this.setState(objForSettingFilter);
      console.log(response.data.contents);
    });
  };
  render() {
    console.log('인증보드', this.props.route.params.isLogin);
    //포스트 하나 만드는 메서드
    let Item = ({title, writer}) => (
      <View style={styles.item}>
        <Text style={styles.postTitle}>{title} </Text>
        <Text style={styles.postWriter}>{writer}</Text>
      </View>
    );
    let renderItem = ({item}) => (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{backgroundColor: '#fff'}}
          onPress={() => {
            this.props.navigation.navigate('Details', {
              boardId: item.id,
              auth: this.state.auth,
            });
          }}>
          <Item title={item.title} writer={item.nickname} />
        </TouchableOpacity>
      </View>
    );
    const onSubmitPicker = (tmp) => {
      if (tmp.name == 'sido') {
        // text.location = tmp.value;
        this.state.location = tmp.value;
        console.log(this.state.location);
        this.getList();
      }
      if (tmp.name == 'major') {
        this.state.major = tmp.value;
        this.getList();
      }
      if (tmp.name == 'target') {
        this.state.target = tmp.value;
        this.getList();
      }
    };
    //  url = config.server + '/board?auth=' + this.state.auth + '&page=1&pageSize=8';

    const n = 2;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}>
        {/* <Text style={styles.title}>인증게시판</Text> */}
        {/* 필터링하는 부분 */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#fff',
            height: 200,
            paddingBottom: 0,
            marginBottom: 0,
          }}>
          <View
            style={{
              borderWidth: 1,
              width: 120,
              height: 50,
              backgroundColor: '#fff',
            }}>
            <MkPicker
              filterName={'sido'}
              url={config.server + '/board/location'}
              onSubmit={onSubmitPicker}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              borderRightWidth: 1,
              width: 120,
              height: 50,
              backgroundColor: '#fff',
            }}>
            <MkPicker
              filterName={'major'}
              url={config.server + '/board/major'}
              onSubmit={onSubmitPicker}
            />
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              width: 120,
              height: 50,
              backgroundColor: '#fff',
            }}>
            <MkPicker
              filterName={'target'}
              url={config.server + '/board/target'}
              onSubmit={onSubmitPicker}
            />
          </View>
        </View>

        {/* 게시판글 목록 */}
        <View
          style={{flex: 7, flexDirection: 'column', backgroundColor: '#fff'}}>
          <FlatList
            style={{borderTopColor: '#000', borderTopWidth: 2}}
            data={this.state.authBoard} //dumy.boardList
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column', alignSelf: 'center'}}>
          <View style={{flex: 1}} />
          <View style={{flex: 3, flexDirection: 'row', alignSelf: 'center'}}>
            <View style={{flex: 1}} />
            <Button
              title="<"
              onPress={() => {
                this.props.navigation.navigate('Update', {
                  auth: this.state.auth,
                });
              }}
            />
            <View style={{flex: 2}} />
            <Button
              style={{}}
              title=">"
              onPress={() => {
                this.props.navigation.navigate('Update', {
                  auth: this.state.auth,
                });
              }}
            />
            <View style={{flex: 1}} />
          </View>
          <View style={{flex: 1}} />
        </View>
        <UserConsumer>
          {({userInfo}) => (
            <Button
              style={{flex: 1}}
              title="글쓰기"
              onPress={() => {
                this.props.navigation.navigate('Update', {
                  auth: this.state.auth,
                });
              }}
            />
          )}
        </UserConsumer>
      </View>
    );
  }
}

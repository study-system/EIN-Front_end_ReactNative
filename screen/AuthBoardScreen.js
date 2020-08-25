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
  Dimensions,
  Image,
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
import {max} from 'moment';

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
    popupSetting: true,
    popupImg: '',
    popupActive: '',
    popupStatus: true,
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
    if (this.state.popupSetting) this.getPopUp();
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
  getPopUp = () => {
    var url = config.server + '/popup';
    axios.get(url).then((response) => {
      //state.data에 response로 받은 json 값을 넣어줌

      this.setState({
        ...this.state,
        popupActive: response.data.active,
        popupImg: response.data.image,
      });
      console.log('팝업팝업팝ㅇ버', this.state.popupImg, response.data);
    });
  };

  render() {
    console.log('게시판구분', this.state.auth);
    console.log('인증보드', this.props.route.params.isLogin);
    //포스트 하나 만드는 메서드
    let Item = ({title, writer}) => (
      <View style={styles.postItem}>
        <View style={styles.headerTitle5}>
          <Text style={styles.postTitle}>{title} </Text>
        </View>
        <View style={styles.headerTitle2}>
          <Text style={styles.postTitle}>0 </Text>
        </View>
        <View style={styles.headerTitle3}>
          <Text style={styles.postWriter}>{writer}</Text>
        </View>
      </View>
    );
    let renderItem = ({item}) => (
      <View>
        <TouchableOpacity
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

    const n = 2;

    return (
      <UserConsumer>
        {({userInfo, ctxLogIn, ctxLogOut}) => (
          <View style={styles.containerLogin}>
            {/* 팝업 */}
            {this.state.popupStatus && this.state.popupActive == 'yes' ? (
              <View
                style={{
                  backgroundColor: '#2228',

                  zIndex: 3,
                  position: 'absolute',

                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height,
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    translateX: 25,
                    translateY: 50,
                    width: 360,
                    height: 580,
                  }}>
                  <View style={{flex: 8}}>
                    <Image
                      style={{flex: 1, borderRadius: 10}}
                      source={{
                        uri: this.state.popupImg,
                      }}></Image>
                  </View>
                  <View
                    style={{
                      marginTop: -10,
                      flex: 1,
                      backgroundColor: '#0cf',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <View>
                      <TouchableOpacity
                        style={styles.submitButtonPopup}
                        onPress={() => {
                          this.setState(
                            {
                              ...this.state,
                              popupSetting: false,
                              popupStatus: false,
                            },
                            () => {
                              console.log(
                                '다시보지않기',
                                this.state.popupSetting,
                              );
                            },
                          );
                        }}>
                        <Text style={styles.submitButtonText}>
                          다시보지않기
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.submitButtonPopup}
                        onPress={() => {
                          this.setState(
                            {
                              ...this.state,

                              popupStatus: false,
                            },
                            () => {
                              console.log('닫기', this.state.popupSetting);
                            },
                          );
                        }}>
                        <Text style={styles.submitButtonText}>닫기</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}

            {/* 필터링하는 부분 */}
            <View style={styles.containerPicker}>
              <View style={styles.picker}>
                <MkPicker
                  filterName={'sido'}
                  url={config.server + '/board/location'}
                  onSubmit={onSubmitPicker}
                />
              </View>
              <View style={styles.picker}>
                <MkPicker
                  filterName={'major'}
                  url={config.server + '/board/major'}
                  onSubmit={onSubmitPicker}
                />
              </View>

              <View style={styles.picker}>
                <MkPicker
                  filterName={'target'}
                  url={config.server + '/board/target'}
                  onSubmit={onSubmitPicker}
                />
              </View>
            </View>

            {/* 게시판글 목록 */}
            <View style={styles.containerHeader}>
              <View style={styles.headerTitle5}>
                <Text>제목</Text>
              </View>
              <View style={styles.headerTitle2}>
                <Text>추천</Text>
              </View>
              <View style={styles.headerTitle3}>
                <Text>작성자</Text>
              </View>
            </View>
            <View
              style={{
                flex: 6,
                borderBottomColor: '#888',
                borderBottomWidth: 2,
              }}>
              <FlatList
                data={this.state.authBoard} //dumy.boardList
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
              />
            </View>
            <View
              style={{flex: 1, flexDirection: 'column', alignSelf: 'center'}}>
              <View style={{flex: 0.5}} />
              <View
                style={{flex: 4, flexDirection: 'row', alignSelf: 'center'}}>
                <View style={{flex: 1}} />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    if (this.state.page > 1) {
                      var cnt = this.state.page - 1;
                      this.state.page = cnt;
                      this.setState({...this.state, page: cnt});
                      console.log(cnt);
                      this.getList();
                    }
                  }}>
                  <Text style={styles.submitButtonText}> {' < '}</Text>
                </TouchableOpacity>
                <View style={{flex: 2}} />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => {
                    if (this.state.page < 100) {
                      var cnt = this.state.page + 1;
                      this.state.page = cnt;
                      this.setState({...this.state, page: cnt});
                      console.log(cnt);
                      this.getList();
                    }
                  }}>
                  <Text style={styles.submitButtonText}> {' > '}</Text>
                </TouchableOpacity>
                <View style={{flex: 1}} />
              </View>
              <View style={{flex: 1}} />
            </View>
            {userInfo.role == '인증' ? (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  this.props.navigation.navigate('Update', {
                    auth: this.state.auth,
                  });
                }}>
                <Text style={styles.submitButtonText}> 글쓰기 </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  alert('인증회원만 글을 쓸 수 있습니다.');
                  console.log('버튼을 누르고 있네요');
                }}>
                <Text style={styles.submitButtonText}> 글쓰기 </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </UserConsumer>
    );
  }
}

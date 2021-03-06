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
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import config from '../config';
// import {Picker} from '@react-native-community/picker';
// import {TapGestureHandler} from 'react-native-gesture-handler';
import {UserConsumer} from './UserContext';
const styles = require('../css/Styles');
const axios = require('axios');
const moment = require('moment');
//기능 import
const MkPicker = require('../function/Mkpicker');
const GetDetail = require('../function/GetDetail');
import ImagePicker from 'react-native-image-picker';
export default function UpdateScreen({route, navigation}) {
  //임시변수 로그인 만든 후에는 쿠키에서 가져오자
  const userId = 1;
  //게시글의 id

  const {boardId} = route.params;

  const {auth} = route.params;
  const {boardName} = route.params;
  const {data} = route.params;
  let loadData = false;

  //input과 입력받은값 유효성체크를 위한
  const [text, setText] = React.useState({
    //글제목
    title: '',
    validate_title: true,
    //시작날짜
    start_date: '',
    validate_start_date: true,
    //마감날짜
    end_date: '',
    validate_end_date: true,
    content: '',
    validate_content: true,
    //분류 분류의 id값으로 키값을 가짐
    //분류-지역 시도와 헷갈리니 바꾸는 것도 좋아보임
    location_id: '0',
    validate_location_id: true,
    //분류-분야
    major_id: '0',
    validate_major_id: true,
    //분류-대상
    target_id: '0',
    validate_target_id: true,
    //글작성자
    writer: userId,
    validate_writer: false,
    //추후추가
    imageurl: '',
    validate_imgUrl: false,
  });

  // useEffect는 첫번째 인자로 callBack함수를 받습니다.
  React.useEffect(() => {
    // 컴포넌트가 마운트 되고 setTimeout함수를실행합니다.
    if (data) {
      //id값으로 게시글 정보를 가져와 text에 넣어줌
      axios.get(config.server + '/board/' + boardId).then((response) => {
        setText({
          ...text,
          validate_content: false,
          validate_end_date: false,
          validate_location_id: false,
          validate_major_id: false,
          validate_start_date: false,
          validate_target_id: false,
          validate_title: false,
          ...response.data,
        });
      });
    }
  }, []);
  React.useEffect(() => {
    console.log('이미지 받아지나?', text.imageurl, text);
  }, [text.imageurl]);

  //input의 onChange에 쓸 메소드
  const onChange = (e) => {
    setText({
      ...text, // 기존의 객체를 복사한 뒤
      [e._dispatchInstances.memoizedProps.name]: e.nativeEvent.text, // name 키를 가진 값을 value 로 설정
    });
  };

  //picker 데이터를 부모로 가져옴 메서드용
  const onSubmitPicker = (tmp) => {
    if (tmp.name == 'sido') {
      text.location_id = tmp.value;
    }
    if (tmp.name == 'major') {
      text.major_id = tmp.value;
    }
    if (tmp.name == 'target') {
      text.target_id = tmp.value;
    }
    validatePicker(tmp.name);
  };
  const validateDate = (e) => {
    const dateExp = /^\d{4}\-\d{2}\-\d{2}\ \d{2}\:\d{2}\:\d{2}/;
    if (e.nativeEvent.text.match(dateExp)) {
      //버튼 disabled를 위한 거라 반대
      if (e._dispatchInstances.memoizedProps.name == 'start_date') {
        text.validate_start_date = false;
      } else {
        text.validate_end_date = false;
      }
    } else {
      if (e._dispatchInstances.memoizedProps.name == 'start_date') {
        text.validate_start_date = true;
      } else {
        text.validate_end_date = true;
      }
    }
    onChange(e);
  };
  const validateTitle = (e) => {
    // const dateExp = /^[^\\]+[a-zA-Z0-9가-힣]+[^\\]+[a-zA-Z0-9가-힣]+[^\\]/;
    if (e.nativeEvent.text.length > 0 && text.title != null) {
      //버튼 disabled를 위한 거라 반대

      text.validate_title = false;
    } else {
      text.validate_title = true;
    }
    onChange(e);
  };
  const validateContent = (e) => {
    // const dateExp = /^[^\\]+[a-zA-Z0-9가-힣]+[^\\]+[a-zA-Z0-9가-힣]+[^\\]/;
    if (e.nativeEvent.text.length > 1) {
      //버튼 disabled를 위한 거라 반대

      text.validate_content = false;
    } else {
      text.validate_content = true;
    }
    onChange(e);
  };

  const validatePicker = (name) => {
    // const dateExp = /^[^\\]+[a-zA-Z0-9가-힣]+[^\\]+[a-zA-Z0-9가-힣]+[^\\]/;
    if (name == 'sido') {
      if (text.location_id != '0' && text.location_id != null) {
        //버튼 disabled를 위한 거라 반대
        text.validate_location_id = false;
      } else {
        text.validate_location_id = true;
      }
    } else if (name == 'major') {
      if (text.major_id != '0' && text.major_id != null) {
        //버튼 disabled를 위한 거라 반대
        text.validate_major_id = false;
      } else {
        text.validate_major_id = true;
      }
    } else if (name == 'target') {
      if (text.target_id != '0' && text.target_id != null) {
        //버튼 disabled를 위한 거라 반대
        text.validate_target_id = false;
      } else {
        text.validate_target_id = true;
      }
    }
  };
  const dateFormat = (date) => {
    //나중에 요청보내는 곳으로

    return moment(date).utcOffset(0).toISOString();
  };
  const toggleButton = () => {
    if (boardId) {
      onSubmitUpdate();
    } else {
      onSubmitCreate();
    }
  };
  var jsonForUpdate = {
    title: text.title,
    start_date: dateFormat(text.start_date),
    end_date: dateFormat(text.end_date),
    content: text.content,
    imageurl: text.imageurl,
    location_id: Number(text.location_id),
    major_id: Number(text.major_id),
    target_id: Number(text.target_id),
  };
  const onSubmitUpdate = () => {
    console.log('글수정시도', jsonForUpdate);
    axios
      .put(config.server + '/board/' + boardId, jsonForUpdate, {
        withCredentials: true,
      })
      .then((response) => {
        console.log('글수정성공', response);
        route.params.onSubmitRefresh();
        navigation.navigate(boardName, {reset: true});
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  var jsonForCreate = {
    user_id: text.writer,
    title: text.title,
    start_date: dateFormat(text.start_date),
    end_date: dateFormat(text.end_date),
    content: text.content,
    imageurl: text.imageurl,
    location_id: Number(text.location_id),
    major_id: Number(text.major_id),
    target_id: Number(text.target_id),
    auth: auth,
  };

  const onSubmitCreate = () => {
    axios
      .post(config.server + '/board', jsonForCreate, {
        withCredentials: true,
      })
      .then((response) => {
        route.params.onSubmitRefresh();
        navigation.navigate(boardName, {reset: true});
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const booleanCheck = (booleanValue) => {
    if (booleanValue) {
      return 'True';
    } else {
      return 'False';
    }
  };

  const onClickTakePhoto = () => {
    // More info on all the options is below in the API Reference... just some common use cases shown here
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info in the API Reference)
     */
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};

        // setText({...text, avatarSource: source});
        const file = {
          originalname: response.fileName,
          type: response.type,
          uri: response.uri,
          buffer: response.data,
        };

        axios
          .post(
            'http://myks790.iptime.org:8082/file',
            {...file},
            {
              withCredentials: true,
            },
          )
          .then((respone) => {
            const imgUrl = respone.data.imgUrl;

            setTimeout(() => {
              setText({...text, imageurl: imgUrl});
            }, 1000);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <UserConsumer>
      {({userInfo, ctxLogIn, ctxLogOut}) => (
        <View style={styles.containerLogin}>
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
                  navigation.navigate(boardName);
                }}>
                <Text style={{fontSize: 24, color: '#fff'}}>
                  {route.params.auth == 'yes'
                    ? '<  인증게시판'
                    : '<  자유게시판'}
                  {boardId ? '  글수정' : '  글작성'}
                </Text>
              </TouchableOpacity>
            </View>
            {text.validate_start_date ||
            text.validate_end_date ||
            text.validate_title ||
            text.validate_content ||
            text.validate_location_id ||
            text.validate_major_id ||
            text.validate_target_id ? (
              <View style={{marginTop: -10}}>
                <TouchableOpacity
                  style={stylesEm.submitButtonGrey}
                  onPress={() => {
                    console.log('버튼을 누르고 있네요');
                    alert('항목들을 채워주세요');
                  }}>
                  <Text style={stylesEm.submitButtonTextWhite}>
                    {boardId ? ' 글수정 ' : ' 글작성 '}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{marginTop: -10}}>
                <TouchableOpacity
                  style={stylesEm.submitButtonWhite}
                  onPress={() => {
                    toggleButton();
                  }}>
                  <Text style={stylesEm.submitButtonTextWhite}>
                    {boardId ? ' 글수정 ' : ' 글작성 '}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <SafeAreaView style={styles.container}>
            <ScrollView style={{flex: 1, marginTop: 20}}>
              <View>
                <Text style={styles.inputNameTag}>제목</Text>
                <TextInput
                  name="title"
                  style={stylesEm.inputTitle}
                  underlineColorAndroid="black"
                  placeholder="제목을 입력해주세요"
                  onChange={validateTitle}
                  defaultValue={text.title}
                />
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderRadius: 20,
                  borderColor: '#777',
                  marginBottom: 10,
                }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View
                    style={{
                      width: 120,
                      height: 50,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      borderWidth: 1,
                      marginBottom: 5,
                    }}>
                    <MkPicker
                      filterName={'sido'}
                      url={config.server + '/board/location'}
                      onSubmit={onSubmitPicker}
                      default={text.location_id}
                    />
                  </View>
                  <View
                    style={{
                      width: 120,
                      height: 50,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      borderWidth: 1,
                      marginBottom: 5,
                    }}>
                    <MkPicker
                      filterName={'major'}
                      url={config.server + '/board/major'}
                      onSubmit={onSubmitPicker}
                      default={text.major_id}
                    />
                  </View>
                  <View
                    style={{
                      width: 120,
                      height: 50,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      borderWidth: 1,
                      marginBottom: 5,
                    }}>
                    <MkPicker
                      filterName={'target'}
                      url={config.server + '/board/target'}
                      onSubmit={onSubmitPicker}
                      default={text.target_id}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: -5,
                }}>
                <View>
                  <Text style={styles.inputNameTag}> 시작날짜</Text>
                  <TextInput
                    name="start_date"
                    style={styles.input}
                    placeholder="2020-01-01 12:00:00"
                    onChange={validateDate}
                    defaultValue={text.start_date}
                  />
                </View>
                <View>
                  <Text style={styles.inputNameTag}> 시작날짜</Text>
                  <TextInput
                    name="end_date"
                    style={styles.input}
                    placeholder="2020-01-01 12:00:00"
                    onChange={validateDate}
                    defaultValue={text.end_date}
                  />
                </View>
              </View>
              <TextInput
                name="content"
                multiline
                style={stylesEm.inputMultiLine}
                numberOfLines={4}
                onChange={validateContent}
                value={text.content}
                editable
                maxLength={300}
              />

              {text.imageurl ? (
                <Image
                  style={{alignSelf: 'center', width: 300, height: 300}}
                  source={{uri: text.imageurl}}
                />
              ) : (
                <></>
              )}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  onClickTakePhoto();
                }}>
                <Text style={styles.submitButtonText}>이미지찾기</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </UserConsumer>
  );
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
  submitButtonGrey: {
    backgroundColor: 'grey',
    padding: 10,
    margin: 15,
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
  },
  submitButtonTextWhite: {
    color: '#000',
  },
  inputMultiLine: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 250,
  },
  inputDate: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  inputTitle: {
    margin: 15,
    height: 40,

    borderRadius: 10,
  },
});

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

const styles = require('../css/Styles');
const axios = require('axios');
const moment = require('moment');
//기능 import
const MkPicker = require('../function/Mkpicker');
const GetDetail = require('../function/GetDetail');

export default function UpdateScreen({route, navigation}) {
  //임시변수 로그인 만든 후에는 쿠키에서 가져오자
  const userId = 1;
  //게시글의 id
  console.log(route);
  const {boardId} = route.params;
  // if (boardId) {
  //   console.log('test성공');
  // }
  const {auth} = route.params;
  console.log('boardId', boardId, auth);

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
    location: '0',
    validate_location: true,
    //분류-분야
    major: '0',
    validate_major: true,
    //분류-대상
    target: '0',
    validate_target: true,
    //글작성자
    writer: userId,
    validate_writer: false,
    //추후추가
    imgUrl: '',
    validate_imgUrl: false,
  });
  //input의 onChange에 쓸 메소드
  const onChange = (e) => {
    //input의 name
    console.log(e._dispatchInstances.memoizedProps.name);
    //input의 값
    console.log(e.nativeEvent.text);
    setText({
      ...text, // 기존의 객체를 복사한 뒤
      [e._dispatchInstances.memoizedProps.name]: e.nativeEvent.text, // name 키를 가진 값을 value 로 설정
    });
  };

  //picker 데이터를 부모로 가져옴 메서드용
  const onSubmitPicker = (tmp) => {
    if (tmp.name == 'sido') {
      // text.location = tmp.value;
      text.location = tmp.value;
      console.log(text.location);
    }
    if (tmp.name == 'major') {
      text.major = tmp.value;
    }
    if (tmp.name == 'target') {
      text.target = tmp.value;
    }
    validatePicker(tmp.name);
  };
  const validateDate = (e) => {
    //나중에 옮기자
    var a = moment(text.start_date).utcOffset(0).toISOString();
    console.log('날짜', a);
    const dateExp = /^\d{4}\-\d{2}\-\d{2}\ \d{2}\:\d{2}\:\d{2}/;
    if (e.nativeEvent.text.match(dateExp)) {
      console.log('포맷성공');
      //버튼 disabled를 위한 거라 반대
      if (e._dispatchInstances.memoizedProps.name == 'start_date') {
        text.validate_start_date = false;
        console.log('start');
      } else {
        text.validate_end_date = false;
        console.log('end');
      }
    } else {
      console.log('포맷실패');
      if (e._dispatchInstances.memoizedProps.name == 'start_date') {
        text.validate_start_date = true;
        console.log('start');
      } else {
        text.validate_end_date = true;
        console.log('end');
      }
    }
    onChange(e);
  };
  const validateTitle = (e) => {
    // const dateExp = /^[^\\]+[a-zA-Z0-9가-힣]+[^\\]+[a-zA-Z0-9가-힣]+[^\\]/;
    if (e.nativeEvent.text.length > 0 && text.title != null) {
      console.log('포맷성공title');
      //버튼 disabled를 위한 거라 반대

      text.validate_title = false;
      console.log('title');
    } else {
      console.log('포맷실패');

      text.validate_title = true;
      console.log('title');
    }
    onChange(e);
  };
  const validateContent = (e) => {
    // const dateExp = /^[^\\]+[a-zA-Z0-9가-힣]+[^\\]+[a-zA-Z0-9가-힣]+[^\\]/;
    if (e.nativeEvent.text.length > 1) {
      console.log('포맷성공title');
      //버튼 disabled를 위한 거라 반대

      text.validate_content = false;
      console.log('title');
    } else {
      console.log('포맷실패');

      text.validate_content = true;
      console.log('title');
    }
    onChange(e);
  };
  const validateLocation = () => {
    // const dateExp = /^[^\\]+[a-zA-Z0-9가-힣]+[^\\]+[a-zA-Z0-9가-힣]+[^\\]/;
    if (text.location != '0' && text.location != null) {
      console.log('포맷성공Location');
      //버튼 disabled를 위한 거라 반대

      text.validate_location = false;
    } else {
      console.log('포맷실패Location');

      text.validate_location = true;
    }
  };
  const validatePicker = (name) => {
    // const dateExp = /^[^\\]+[a-zA-Z0-9가-힣]+[^\\]+[a-zA-Z0-9가-힣]+[^\\]/;
    if (name == 'sido') {
      if (text.location != '0' && text.location != null) {
        console.log('포맷성공' + name);
        //버튼 disabled를 위한 거라 반대
        text.validate_location = false;
        console.log('포맷성공' + name + ' : ' + text.validate_location);
      } else {
        console.log('포맷실패' + name);
        text.validate_location = true;
      }
    } else if (name == 'major') {
      if (text.major != '0' && text.major != null) {
        //버튼 disabled를 위한 거라 반대
        text.validate_major = false;
        console.log('포맷성공' + name + ' : ' + text.validate_major);
      } else {
        console.log('포맷실패' + name);
        text.validate_major = true;
      }
    } else if (name == 'target') {
      if (text.target != '0' && text.target != null) {
        console.log('포맷성공' + name);
        //버튼 disabled를 위한 거라 반대
        text.validate_target = false;
        console.log('포맷성공' + name + ' : ' + text.validate_target);
      } else {
        console.log('포맷실패' + name);
        text.validate_target = true;
      }
    }
  };
  const dateFormat = (date) => {
    //나중에 요청보내는 곳으로

    console.log(moment(date).utcOffset(0).toISOString());
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
    location_id: Number(text.location),
    major_id: Number(text.major),
    target_id: Number(text.target),
  };
  const onSubmitUpdate = () => {
    console.log('글수정시도', jsonForUpdate);
    axios
      .put('http://myks790.iptime.org:8082/board/' + boardId, jsonForUpdate)
      .then(function (response) {
        console.log(response);
        console.log('글수정성공');
      })
      .catch(function (error) {
        console.log(error);
        console.log('글수정실패');
      });
    console.log('글수정파트끝');
  };
  var jsonForCreate = {
    user_id: text.writer,
    title: text.title,
    start_date: dateFormat(text.start_date),
    end_date: dateFormat(text.end_date),
    content: text.content,
    location_id: Number(text.location),
    major_id: Number(text.major),
    target_id: Number(text.target),
    auth: auth,
  };
  console.log(jsonForCreate);
  const onSubmitCreate = () => {
    axios
      .post('http://myks790.iptime.org:8082/board', jsonForCreate)
      .then(function (response) {
        console.log('글쓰기 성공', response);
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Udate! </Text>
          <Button
            onPress={() => {
              toggleButton();

              navigation.navigate('인증게시판');
            }}
            title="수정"
            disabled={
              text.validate_start_date ||
              text.validate_end_date ||
              text.validate_title ||
              text.validate_content ||
              text.validate_location ||
              text.validate_major ||
              text.validate_target
            }
          />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text>제목</Text>
            <TextInput
              name="title"
              style={{height: 40, width: 350, backgroundColor: '#fff'}}
              placeholder="Type here to translate!"
              onChange={validateTitle}
              defaultValue={text.title}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 120, height: 50}}>
              <MkPicker
                filterName={'sido'}
                url={'http://myks790.iptime.org:8082/board/location'}
                onSubmit={onSubmitPicker}
              />
            </View>
            <View style={{width: 120, height: 50}}>
              <MkPicker
                filterName={'major'}
                url={'http://myks790.iptime.org:8082/board/major'}
                onSubmit={onSubmitPicker}
              />
            </View>
            <View style={{width: 120, height: 50}}>
              <MkPicker
                filterName={'target'}
                url={'http://myks790.iptime.org:8082/board/target'}
                onSubmit={onSubmitPicker}
              />
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text>시작날짜</Text>
            <TextInput
              name="start_date"
              style={{height: 40, width: 150, backgroundColor: '#fff'}}
              placeholder="2020-01-01 12:00:00"
              onChange={validateDate}
              defaultValue={text.start_date}
            />
            <Text>마감날짜</Text>
            <TextInput
              name="end_date"
              style={{height: 40, width: 150, backgroundColor: '#fff'}}
              placeholder="2020-01-01 12:00:00"
              onChange={validateDate}
              defaultValue={text.end_date}
            />
          </View>
          <TextInput
            name="content"
            multiline
            style={{height: 250, width: 250, backgroundColor: '#fff'}}
            numberOfLines={4}
            onChange={validateContent}
            value={text.content}
            editable
            maxLength={300}
          />

          {/* <Text>{JSON.stringify(id)}</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

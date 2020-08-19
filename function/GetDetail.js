import React, { useState, Component } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SliderComponent,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { timing } from 'react-native-reanimated';

//스크린 임포트

const axios = require('axios');
//picker 생성클래스
class GetDetail extends Component {
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
  constructor(props) {
    super(props);
  }

  // 변경되는 것을 자동으로 리플래시 되면서 반영함.
  componentDidMount() {
    //시도 필터정보
    axios.get(this.props.url).then((response) => {
      //state.data에 response로 받은 json 값을 넣어줌
      this.setState({ data: response.data });
      console.log(response.data);

      console.log('확인중입니다.', Object.keys(response.data));
      console.log('제목', response.data.title);
      console.log('내용', response.data.content);
      console.log('작성자', response.data.writer);
      console.log('시작날짜', response.data.start_date);
      console.log('마감날짜', response.data.end_date);
      console.log('지역', response.data.location);
    });
  }
  render() {
    //major_code를 code로 통일하면 함수를 통일할 수 있음

    return (
      <View>
        <Text>제목 {this.state.data.title}</Text>
        <Text>내용 {this.state.data.content}</Text>
        <Text>시작날짜 {this.state.data.start_date}</Text>
        <Text>마감날짜 {this.state.data.end_date}</Text>
        <Text>지역 {this.state.data.location}</Text>
        <Text>작성자 {this.state.data.writer}</Text>
      </View>
    );
  }
}

module.exports = GetDetail;

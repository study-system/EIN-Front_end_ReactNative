import React, {useState, Component} from 'react';
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
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Picker} from '@react-native-community/picker';
//스크린 임포트

const axios = require('axios');

class AuthBoardScreen extends Component {
  constructor(props) {
    super(props);
    console.log('Auth', this.props.data2);
  }
  state = {
    language: '001',
    lang: 'java',
    pick: [],
    pickers: [],
    data: [{id: 1, name: '시도'}],
  };

  // state = {picker: []};
  componentDidMount() {
    console.log(this.state.language);
    axios.get('http://myks790.iptime.org:8082/board/major').then((response) => {
      console.log(this.state.data[0]);
      this.setState({data: response.data});
      const tmparr = [];
      // 화살표함수를 써야 상위를 this로 부를 수 있음
      console.log(this.state.data[0]);
      this.state.data.map((item) => {
        // return <Picker.Item label={item.name} value={item.id} />;
        console.log(item.id, item.name);
        tmparr.push(<Picker.Item label={item.id} value={item.name} />);
      });
      this.setState({pickers: tmparr});
    });
  }
  putPickers() {
    // if (this.state.pickers) {
    //   console.log(this.state.pickers[0]);
    //   return this.state.pickers[0];
    // }
    return (
      <View>
        <Picker
          selectedValue={this.states.lang}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({lang: itemValue})
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
  addP = () => {
    return (
      <View>
        {this.state.data.map((prop, key) => {
          return <Picker.Item label={prop.id} key={key} value={prop.name} />;
        })}
      </View>
    );
  };
  AddT = () => {
    return (
      <View>
        <Text>{this.state.data[0].name}</Text>
      </View>
    );
  };

  render() {
    let pickerItems = this.state.data.map((item, i) => {
      return <Picker.Item key={i} label={item.name} value={item.id.toString} />;
    });

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>인증게시판입니다.</Text>

        <this.AddT />
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          {pickerItems}
          {/* <addP /> */}
        </Picker>
      </View>
    );
  }
}

// 자유게시판 스크린
class BoardScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>자유게시판입니다.</Text>
      </View>
    );
  }
}
// 마이페이지 스크린
class Mypage extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>마이페이지입니다.</Text>
      </View>
    );
  }
}
//푸쉬알람 스크린
//스크롤뷰 + 플로팅버튼
class PushAlarm extends Component {
  render() {
    return (
      <ScrollView>
        <Text>
          푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다.{' '}
          {'\n'}
          푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다.{' '}
          {'\n'}
          푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다.{' '}
          {'\n'}
          푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다.{' '}
          {'\n'}
          푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다.{' '}
          {'\n'}
          푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다.{' '}
          {'\n'}
          푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다.{' '}
          {'\n'}
          푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다.{' '}
          {'\n'}
          푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}푸쉬입니다. {'\n'}
        </Text>
      </ScrollView>
    );
  }
}

// 탭 부분
const Tab = createBottomTabNavigator();
// 하단탭
class MyTabs extends Component {
  constructor(props) {
    super(props);
    console.log('MyTabs', this.props.data);
  }
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="인증게시판"
          component={AuthBoardScreen}
          data2={this.props.data}
        />
        <Tab.Screen name="자유게시판" component={BoardScreen} />
        <Tab.Screen name="마이페이지" component={Mypage} />
        <Tab.Screen name="푸쉬알람" component={PushAlarm} />
      </Tab.Navigator>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data: 'adaa'};
  }
  componentDidMount() {
    axios.get('http://myks790.iptime.org:8082/board/major').then((response) => {
      this.setState({data: response.data});
      // this.setState({data: '인증게시판'});
      // console.log(response.data);
    });
  }
  render() {
    return (
      <NavigationContainer>
        <Text>{this.state.data[0].name}</Text>
        {/* <Text>{this.state.data}</Text> */}
        <MyTabs data={this.state.data} />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  postTitle: {
    fontSize: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

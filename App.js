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

//임시데이터
const DATA = [
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
    writer: '유저2',
    content:
      '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Second Item',
    writer: '유저1',
    content:
      '강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'First Item',
    writer: '유저1',
    content:
      '고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d77',
    title: 'Third Item',
    writer: '유저5',
    content:
      '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d79',
    title: 'Second Item',
    writer: '유저5',
    content:
      '강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    title: 'First Item',
    writer: '유저5',
    content:
      '고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이',
  },
];
//picker 생성클래스
class MkPicker extends Component {
  constructor(props) {
    super(props);
    // this.setState({type: props});
  }
  state = {
    default_type: '000',
    data: [{id: '999', name: '임시'}],
  };

  // 변경되는 것을 자동으로 리플래시 되면서 반영함.
  componentDidMount() {
    console.log(this.state.default_type);
    axios.get('http://myks790.iptime.org:8082/board/major').then((response) => {
      // console.log(this.state.data[0]);
      //state.data에 response로 받은 json 값을 넣어줌
      this.setState({data: response.data});
      console.log('선택', this.state.data[0].name);
    });
  }
  render() {
    //major_code를 code로 통일하면 함수를 통일할 수 있음
    let pickerItems = this.state.data.map((item, i) => {
      return <Picker.Item key={i} label={item.name} value={item.major_code} />;
    });

    return (
      <View>
        <Picker
          selectedValue={this.state.default_type}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({default_type: itemValue});
            console.log(this.state.default_type);
          }}>
          <Picker.Item label="시도명" value="000" />
          {pickerItems}
        </Picker>
      </View>
    );
  }
}

//인증게시판 스크린 클래스
class AuthBoardScreen extends Component {
  constructor(props) {
    super(props);
    console.log('Auth', this.props.data2);
  }
  state = {
    major: '000',
    sido: '000',
    target: '000',
    data: [{id: '050', name: '임시'}],
  };
  // 변경되는 것을 자동으로 리플래시 되면서 반영함.
  componentDidMount() {
    console.log(this.state.major);
    axios
      .get('http://myks790.iptime.org:8082/board/major')
      .then((response) => {
        console.log(response);
        // console.log(this.state.data[0]);
        //state.data에 response로 받은 json 값을 넣어줌
        this.setState({data: response.data});
        console.log('분야선택', this.state.data[0].name);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        console.log('에러에러');
      })
      .then(function () {
        // always executed
      });
  }
  //나중에 쓸 수도 있음  쓰는법   {/* <this.AddT /> */}
  // AddT = () => {
  //   return (
  //     <View>
  //       <Text>{this.state.data[0].name}</Text>
  //     </View>
  //   );
  // };

  render() {
    //포스트 하나 만드는 메서드
    let Item = ({title, writer}) => (
      <View style={styles.item}>
        <Text style={styles.postTitle}>{title} </Text>
        <Text style={styles.postTitle}>{writer}</Text>
      </View>
    );
    let renderItem = ({item}) => (
      <Item title={item.title} writer={item.writer} />
    );

    let pickerItems = this.state.data.map((item, i) => {
      return <Picker.Item key={i} label={item.name} value={item.major_code} />;
    });

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>인증게시판</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 100, height: 50, backgroundColor: 'powderblue'}}>
            <MkPicker />
          </View>
          <View style={{width: 100, height: 50, backgroundColor: 'skyblue'}}>
            <MkPicker />
          </View>
          <View style={{width: 100, height: 50}}>
            <Picker
              selectedValue={this.state.major}
              style={{height: 50, width: 100}}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({major: itemValue});
                console.log(this.state.major);
              }}>
              <Picker.Item label="시도명" value="000" />
              {pickerItems}
            </Picker>
          </View>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
    flex: 1,
    flexDirection: 'row',
  },
  postTitle: {
    fontSize: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

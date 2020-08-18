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
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
// import {Picker} from '@react-native-community/picker';
// import {TapGestureHandler} from 'react-native-gesture-handler';
//스크린 임포트

const axios = require('axios');

const MkPicker = require('./function/Mkpicker');
const GetDetail = require('./function/GetDetail');
//
//인증게시판 스크린 클래스
class AuthBoardScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('Auth', this.props.data2);
    console.log(props);
  }
  state = {
    major: '000',
    sido: '000',
    target: '000',
  };
  // 변경되는 것을 자동으로 리플래시 되면서 반영함.
  componentDidMount() {
    let url =
      'http://myks790.iptime.org:8082/board?auth=true&page=1&pageSize=10';
    axios.get(url).then((response) => {
      //state.data에 response로 받은 json 값을 넣어줌
      var objForSettingFilter = {};
      objForSettingFilter.auth = response.data.contents;
      this.setState(objForSettingFilter);
      console.log(response.data.contents);
    });
    //변경되는 것 실행할 곳
  }

  render() {
    //포스트 하나 만드는 메서드
    let Item = ({title, writer}) => (
      <View style={styles.item}>
        <Text style={styles.postTitle}>{title} </Text>
        <Text style={styles.postTitle}>{writer}</Text>
      </View>
    );
    let renderItem = ({item}) => (
      <View>
        <TouchableOpacity
          style={{backgroundColor: '#fff'}}
          onPress={() => {
            this.props.navigation.navigate('Details', {id: item.id});
          }}>
          <Item title={item.title} writer={item.nickname} />
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text style={styles.title}>인증게시판</Text> */}
        {/* 필터링하는 부분 */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 120, height: 50}}>
            <MkPicker
              filterName={'sido'}
              url={'http://myks790.iptime.org:8082/board/location'}
            />
          </View>
          <View style={{width: 120, height: 50}}>
            <MkPicker
              filterName={'major'}
              url={'http://myks790.iptime.org:8082/board/major'}
            />
          </View>
          <View style={{width: 120, height: 50}}>
            <MkPicker
              filterName={'target'}
              url={'http://myks790.iptime.org:8082/board/target'}
            />
          </View>
        </View>
        {/* 게시판글 목록 */}

        <View style={styles.tablHheader}>
          <View>
            <Text>제목</Text>
          </View>
          <View>
            <Text>작성자</Text>
          </View>
        </View>

        <FlatList
          data={this.state.auth}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
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
function DetailsScreen({route, navigation}) {
  const {id} = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('Update', {id: id});
          }}
          title="수정"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>{JSON.stringify(id)}</Text> */}

      <GetDetail
        url={'http://myks790.iptime.org:8082/board/' + JSON.stringify(id)}
      />
      <Button
        title="삭제하기"
        onPress={() => {
          navigation.navigate('Update', {id: id});
        }}
      />
    </View>
  );
}

function UpdateScreen({route, navigation}) {
  //
  let [text, setText] = React.useState({
    title: '',
    start_date: '',
    end_date: '',
    content: '',
    location: '',
    writer: '',
  });
  const onChange = (e) => {
    //input의 name
    console.log(e._dispatchInstances.memoizedProps.name);
    //input의 값
    console.log(e.nativeEvent.text);
    // const {value, name} = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setText({
      ...text, // 기존의 input 객체를 복사한 뒤
      [e._dispatchInstances.memoizedProps.name]: e.nativeEvent.text, // name 키를 가진 값을 value 로 설정
    });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Udate!</Text>
      <Button
        onPress={() => {
          navigation.navigate('Update');
          alert(text.title + text.start_date);
        }}
        title="수정"
      />
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>제목</Text>
        <TextInput
          name="title"
          style={{height: 40, width: 200, backgroundColor: '#fff'}}
          placeholder="Type here to translate!"
          onChange={onChange}
          defaultValue={text.title}
        />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text>시작날짜</Text>
        <TextInput
          name="start_date"
          style={{height: 40, width: 100, backgroundColor: '#fff'}}
          placeholder="Type here to translate!"
          onChange={onChange}
          defaultValue={text.start_date}
        />
        <Text>마감날짜</Text>
        <TextInput
          style={{height: 40, width: 100, backgroundColor: '#fff'}}
          placeholder="Type here to translate!"
          onChangeText={onChange}
          defaultValue={text.end_date}
        />
      </View>
      <Text>{text.title}</Text>
      {/* <Text>{JSON.stringify(id)}</Text> */}
    </View>
  );
}
// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Home screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details', '전달값')}
//       />
//     </View>
//   );
// }
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="인증게시판" component={AuthBoardScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} options={{}} />
      <HomeStack.Screen name="Update" component={UpdateScreen} />
    </HomeStack.Navigator>
  );
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
        <Tab.Screen name="Home" component={HomeStackScreen} />
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
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginVertical: 2,
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
  tablHheader: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
  },
});

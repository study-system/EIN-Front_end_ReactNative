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
const moment = require('moment');
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
        <Button
          title="임시"
          onPress={() => {
            this.props.navigation.navigate('Update', {id: '1'});
          }}
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
  //임시id변수
  const userId = 'user';
  const {id} = route.params;
  const [text, setText] = React.useState({
    title: '',
    start_date: '',
    validate_start_date: true,
    end_date: '',
    validate_end_date: true,
    content: '',
    location: '',
    major: '',
    target: '',
    writer: '',
  });

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
  let onSubmitPicker = (tmp) => {
    console.log(tmp);
    if (tmp.name == 'sido') {
      text.location = tmp.value;
    }
    if (tmp.name == 'major') {
      text.major = tmp.value;
    }
    if (tmp.name == 'target') {
      text.target = tmp.value;
    }
  };
  const validateDate = (e) => {
    const dateExp = /^\d{4}\-\d{2}\-\d{2}\ \d{2}\:\d{2}\:\d{2}/;
    const tmpExp = /^\d{4}\-\d{2}\-\d{2}/;
    if (e.nativeEvent.text.match(dateExp)) {
      var com_ymd = moment('2015-01-01 11:11:11').format(
        'YYYY-MM-DDTHH:mm:ss.SSSZ',
      );
      // alert('결과 : ' + com_ymd);
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

    // var da = new Date('2015-03-04T00:00:00.000Z');

    //shxrecord.tistory.com/139 [첫 발]
    // var date = new Date('1111.11.11').format('2020-07-01T09:12:28.000Z');
    // console.log(date);
    onChange(e);
  };
  //validate 메소드들
  //화면 리플레쉬 필요
  const validateStartDate = () => {
    const dateExp = /^\d{4}\-\d{2}\-\d{2}\ \d{2}\:\d{2}\:\d{2}/;
    if (text.start_date.match(dateExp)) {
      console.log('포맷성공start');
      //버튼 disabled를 위한 거라 반대
      text.validate_start_date = false;
    } else {
      console.log('포맷실패');
      text.validate_start_date = true;
    }
    console.log(text.validate_start_date);
    window.location.reload(false);
  };

  const onSubmitUpdate = () => {
    axios
      .put('http://myks790.iptime.org:8082/board/' + id, {
        title: '여름 코딩 캠프',
        start_date: '2020-07-01T09:12:28.000Z',
        end_date: '2020-07-21T09:12:28.000Z',
        content: '9박 10일 여름 코딩 캠프~~~',
        location_id: 17,
        major_id: 1,
        target_id: 1,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onSubmitCreate = () => {
    axios
      .post('/user', {
        userId: 1,
        title: '생성',
        start_date: '2020-07-01T09:12:28.000Z',
        end_date: '2020-07-21T09:12:28.000Z',
        content: '14박 15일 여름 코딩 캠프~~~',
        location_id: 17,
        major_id: 1,
        target_id: 1,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Udate! </Text>
          <Button
            onPress={() => {
              navigation.navigate('Update');
              alert(
                'title:' +
                  text.title +
                  '\n date:' +
                  text.start_date +
                  'to' +
                  text.end_date +
                  '\n content:' +
                  text.content +
                  '\n loc:' +
                  text.location +
                  '\n major:' +
                  text.major +
                  '\n target:' +
                  text.target +
                  '\n writer:' +
                  userId +
                  '\n boardId' +
                  id,
              );
            }}
            title="수정"
            disabled={text.validate_start_date || text.validate_end_date}
          />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text>제목</Text>
            <TextInput
              name="title"
              style={{height: 40, width: 350, backgroundColor: '#fff'}}
              placeholder="Type here to translate!"
              onChange={onChange}
              defaultValue={text.title}
            />
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
            onChange={onChange}
            value={text.content}
            editable
            maxLength={300}
          />
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
          <Text>{text.content}</Text>
          {/* <Text>{JSON.stringify(id)}</Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
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

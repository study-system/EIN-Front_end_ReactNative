
import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, ScrollView, StatusBar,Picker } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const axios = require('axios');


// 게시글더미데이터
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    writer: '유저1',
    sido:'jeju',
    content: '강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지강아지',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    writer: '유저1',
    content: '고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이고양이',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    writer: '유저2',
    content: '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
    writer: '유저2',
    content: '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
    writer: '유저2',
    content: '토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼토끼',
  },

];


// 게시글 하나
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.post - title}>{title}</Text>
  </View>
);

// 탭에 따른 스크린 
// 인증게시판 스크린
function AuthBoardScreen() {
  //게시글 랜더메서드
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  
  // Make a request for a user with a given ID
axios.get('http://myks790.iptime.org:8082/board/major')
.then(function (response) {
  // handle success
  // console.log(response);
})
  //피커 상태데이터
  const [sidoselectedValue, sidosetSelectedValue] = useState("sido");
  const [majorselectedValue, majorsetSelectedValue] = useState("major");
  const [targetselectedValue, targetsetSelectedValue] = useState("target");

  return (
    <SafeAreaView style={styles.container}>
      {/* 제목 */}
      <Text style={styles.title} >인증게시판 </Text>
      {/* 분류 */}
      <View style={{flex: 1, flexDirection: 'row'}}>
      <Picker
        selectedValue={sidoselectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => sidosetSelectedValue(itemValue)}
      >
        <Picker.Item label="시도명" value="sido" />
        <Picker.Item label="서울특별시" value="seoul" />
      </Picker>
      <Picker
        selectedValue={majorselectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => majorsetSelectedValue(itemValue)}
      >
        <Picker.Item label="분류" value="major" />
        <Picker.Item label="IT" value="it" />
      </Picker>
      <Picker
        selectedValue={targetselectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => targetsetSelectedValue(itemValue)}
      >
        <Picker.Item label="대상" value="target" />
        <Picker.Item label="유아" value="children" />
      </Picker>
      </View>
      {/* 게시판 */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
// 자유게시판 스크린
function BoardScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>자유게시판입니다.</Text>
    </View>
  );
}
// 마이페이지 스크린
function Mypage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>마이페이지입니다.</Text>
    </View>
  );
}
//푸쉬알람 스크린
//스크롤뷰 + 플로팅버튼
function PushAlarm() {
  return (
    <ScrollView >

      <Text>푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}</Text>
    </ScrollView>
  );
}

// 탭 부분
const Tab = createBottomTabNavigator();
// 하단탭
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="인증게시판" component={AuthBoardScreen} />
      <Tab.Screen name="자유게시판" component={BoardScreen} />
      <Tab.Screen name="마이페이지" component={Mypage} />
      <Tab.Screen name="푸쉬알람" component={PushAlarm} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
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
    fontWeight: "bold",
  },
});
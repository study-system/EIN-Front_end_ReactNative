
import * as React from 'react';
import { Text, View,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>인증게시판입니다. </Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>자유게시판입니다.</Text>
    </View>
  );
}
function Mypage() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>마이페이지입니다.</Text>
    </View>
  );
}

function PushAlarm() {
  return (
    <ScrollView >
    
      <Text>푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}푸쉬입니다. {"\n"}</Text>
    </ScrollView>
  );
}


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="인증게시판" component={HomeScreen} />
      <Tab.Screen name="자유게시판" component={SettingsScreen} />
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
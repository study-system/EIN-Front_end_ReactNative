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
import config from '../config';
const axios = require('axios');
const moment = require('moment');
//기능 import
const GetDetail = require('../function/GetDetail');

export default function DetailsScreen({route, navigation}) {
  const {boardId} = route.params;
  const {auth} = route.params;
  console.log(auth);
  console.log('게시글번호', boardId);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('Update', {boardId: boardId, auth: auth});
          }}
          title="수정"
        />
      ),
    });
  }, [auth, boardId, navigation]);

  const deleteCreateAlert = () =>
    Alert.alert(
      '확인',
      '정말 게시글을 삭제하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: '확인', onPress: () => onSubmitDelete()},
        ,
      ],
      {cancelable: false},
    );

  const onSubmitDelete = () => {
    axios
      .delete('http://myks790.iptime.org:8082/board/' + boardId)
      .then(function (response) {
        console.log(response);

        navigation.navigate('인증게시판');
        console.log('글삭제성공');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>{JSON.stringify(id)}</Text> */}

      <GetDetail url={config.server + '/board/' + JSON.stringify(boardId)} />
      <Button
        title="삭제하기"
        onPress={() => {
          deleteCreateAlert();
        }}
      />
    </View>
  );
}

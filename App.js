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
  PermissionsAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

const styles = require('./css/Styles');
const axios = require('axios');
const moment = require('moment');
//기능 import
const MkPicker = require('./function/Mkpicker');
const GetDetail = require('./function/GetDetail');

//스크린 import
import MypageStack from './screen/MypageStackScreen';
import AuthBoardStackScreen from './screen/AuthBoardStackScreen';
import config from './config';
import {UserProvider} from './screen/UserContext';

import ImagePicker from 'react-native-image-picker';
// 자유게시판 스크린
class BoardScreen extends Component {
  state = {
    photo: null,
  };

  render() {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>자유게시판입니다.</Text>
        <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}
//푸쉬알람 스크린
//스크롤뷰 + 플로팅버튼
class PushAlarm extends Component {
  render() {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    const requestStroragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    return (
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>개발중입니다.</Text>
          <Button
            title="request permissions"
            onPress={requestCameraPermission}
          />
          <Button
            title="request permissions"
            onPress={requestStroragePermission}
          />
        </View>
      </ScrollView>
    );
  }
}

// 탭 부분
const Tab = createBottomTabNavigator();

// 하단탭
class MyTabs extends Component {
  state = {
    isLogin: false,
    id: '',
  };

  onSubmit(params) {
    if (params.isLogin) {
      this.state.isLogin = params.isLogin;
    }
    if (params.id) {
      this.state.id = params.id;
    }
    console.log('최상위params', params);
  }
  constructor(props) {
    super(props);
    console.log('MyTabs', this.props.data);
  }
  render() {
    console.log('최상위', this.state.isLogin);
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={AuthBoardStackScreen}
          initialParams={{
            onSubmit: this.onSubmit,
            isLogin: this.state.isLogin,
            id: this.state.id,
          }}
        />
        {/* <Tab.Screen
          name="인증게시판"
          component={AuthBoardScreen}
          data2={this.props.data}
        /> */}
        <Tab.Screen
          name="자유게시판"
          component={BoardScreen}
          onSubmit={this.onSubmit}
          isLogin={this.state.isLogin}
          id={this.state.id}
        />
        <Tab.Screen
          name="마이페이지"
          component={MypageStack}
          initialParams={{
            onSubmit: this.onSubmit,
            isLogin: this.state.isLogin,
            id: this.state.id,
          }}
        />
        <Tab.Screen
          name="푸쉬알람"
          component={PushAlarm}
          onSubmit={this.onSubmit}
          isLogin={this.state.isLogin}
          id={this.state.id}
        />
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
    axios.get(config.server + '/board/major').then((response) => {
      this.setState({data: response.data});
      // this.setState({data: '인증게시판'});
      // console.log(response.data);
    });
  }
  render() {
    return (
      <UserProvider>
        <NavigationContainer>
          {/* <Text>{this.state.data[0].name}</Text> */}
          <MyTabs data={this.state.data} />
        </NavigationContainer>
      </UserProvider>
    );
  }
}

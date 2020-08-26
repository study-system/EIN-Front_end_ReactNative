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
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

const styles = require('../css/Styles');
// 마이페이지 스크린
export default class SignUp extends Component {
  render() {
    return (
      <View style={styles.containerLogin}>
        <View style={stylesEm.containerBox}>
          <TouchableOpacity
            style={stylesEm.submitButtonUser}
            onPress={() =>
              this.props.navigation.navigate('AgreePage', {
                nextPage: 'UserSignUp',
              })
            }>
            <View style={stylesEm.containerItem}>
              <View style={stylesEm.containerItem}>
                <Image
                  style={{marginLeft: 30, width: 240, height: 240, flex: 4}}
                  source={require('../img/iconP.png')}
                />
              </View>
              <View>
                <Text style={stylesEm.submitButtonText}> 일반회원가입 </Text>
                <Text style={{textAlign: 'center'}}>개인</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={stylesEm.submitButtonUser}
            onPress={() =>
              this.props.navigation.navigate('AgreePage', {
                nextPage: 'AuthUserSignUp',
              })
            }>
            <View style={stylesEm.containerItem}>
              <View style={stylesEm.containerItem}>
                <Image
                  style={{marginLeft: 30, width: 240, height: 240, flex: 4}}
                  source={require('../img/iconB.png')}
                />
              </View>
              <View>
                <Text style={stylesEm.submitButtonText}> 인증회원가입 </Text>
                <Text style={{textAlign: 'center'}}>법인</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const stylesEm = StyleSheet.create({
  containerItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerBox: {
    alignItems: 'center',
  },
  submitButtonText: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  submitButtonUser: {
    width: 300,
    height: 240,
    borderWidth: 2,
    margin: 10,
  },
});

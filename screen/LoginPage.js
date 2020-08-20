import React, { useState, Component } from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const axios = require('axios');
const styles = require('../css/Styles');
// 마이페이지 스크린
export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    handleEmail = text => {
        this.setState({ email: text });
    };
    handlePassword = text => {
        this.setState({ password: text });
    };
    login = (email, password) => {
        //http://myks790.iptime.org:8082/login
        //post

    }
    postReq(url, json) {
        axios
            .post(url, json)
            .then(function (response) {
                console.log("요청성공", response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <View style={styles.containerLogin}>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    onChangeText={this.handleEmail}
                />
                <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={this.handlePassword}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.login(this.state.email, this.state.password)}
                >
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View >
        );
    }
}
// https://www.instamobile.io/react-native-tutorials/asyncstorage-example-react-native/
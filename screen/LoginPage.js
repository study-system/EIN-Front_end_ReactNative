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

// 마이페이지 스크린
export default class LoginPage extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>로그인</Text>
            </View>
        );
    }
}
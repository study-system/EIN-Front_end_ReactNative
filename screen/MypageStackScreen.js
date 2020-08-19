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

import { createStackNavigator } from '@react-navigation/stack';

import Mypage from './Mypage';
import LoginPage from './LoginPage';


const MypageStack = createStackNavigator();
export default function MypageStackScreen2() {
    return (
        <MypageStack.Navigator>
            <MypageStack.Screen
                name="로그인"
                component={LoginPage}
            />
            <MypageStack.Screen
                name="마이페이지"
                component={Mypage}
            />
        </MypageStack.Navigator>
    );
}




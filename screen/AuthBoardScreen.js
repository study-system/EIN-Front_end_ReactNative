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
// import {Picker} from '@react-native-community/picker';
// import {TapGestureHandler} from 'react-native-gesture-handler';

const styles = require('../css/Styles');
const axios = require('axios');
const moment = require('moment');
//기능 import
const MkPicker = require('../function/Mkpicker');
const GetDetail = require('../function/GetDetail');

//스크린 import
//
//인증게시판 스크린 클래스
export default class AuthBoardScreen extends Component {

    state = {
        auth: 'yes',
        major: 0,
        sido: 0,
        target: 0,
        page: 1,
    };
    constructor(props) {
        super(props);
        // console.log('Auth', this.props.data2);
        console.log(props);
        this.state.auth = props.route.params.auth;
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    // 실행한 결과가 오면 자동으로 리플래시 되면서 반영함. 1번
    componentDidMount() {
        this.onLoad();
        let url =
            'http://myks790.iptime.org:8082/board?auth=' +
            this.state.auth +
            '&page=1&pageSize=10';
        axios.get(url).then((response) => {
            console.log("리스트", response.data.contents);
            //state.data에 response로 받은 json 값을 넣어줌
            var objForSettingFilter = {};
            objForSettingFilter.authBoard = response.data.contents;
            this.setState(objForSettingFilter);
        }).catch(function (error) {
            console.log("리스트에러에러");
            // handle error
            console.log(error);
        })
            .then(function () {
                // always executed
            });
        this.onLoad();

    }
    componentDidUpdate() {
        console.log("업데이트");
        console.log(this.state);

    }
    componentWillUnmount() {
        console.log("will마운트");
    }
    handleStatusChange(status) {
        console.log("state체인지");
    }
    onLoad = () => {
        this.props.navigation.addListener('willFocus', () => {
            console.log("focus");
        });
    };

    render() {
        this.onLoad();
        //포스트 하나 만드는 메서드
        let Item = ({ title, writer }) => (
            <View style={styles.item}>
                <Text style={styles.postTitle}>{title} </Text>
                <Text style={styles.postTitle}>{writer}</Text>
            </View>
        );
        let renderItem = ({ item }) => (
            <View>
                <TouchableOpacity
                    style={{ backgroundColor: '#fff' }}
                    onPress={() => {
                        this.props.navigation.navigate('Details', {
                            boardId: item.id,
                            auth: this.state.auth,
                            onSubmitRefresh: onSubmitRefresh,
                        });
                    }}>
                    <Item title={item.title} writer={item.nickname} />
                </TouchableOpacity>
            </View>
        );
        const onSubmitPicker = (tmp) => {
            if (tmp.name == 'sido') {
                // text.location = tmp.value;
                this.state.location = tmp.value;
                console.log(this.state.location);
                getList();
            }
            if (tmp.name == 'major') {
                this.state.major = tmp.value;
                getList();
            }
            if (tmp.name == 'target') {
                this.state.target = tmp.value;
                getList();
            }
        };
        const onSubmitRefresh = (tmp) => {
            console.log("auth", tmp.params);
            this.setState({
                location: 17,
            });

            getList();

        }
        const getList = () => {
            let url =
                'http://myks790.iptime.org:8082/board?auth=' +
                this.state.auth +
                '&page=' +
                this.state.page +
                '&pageSize=10';
            if (this.state.location > 0) {
                url = url + '&location_id=' + this.state.location;
            }
            if (this.state.major > 0) {
                url = url + '&major_id=' + this.state.major;
            }
            if (this.state.target > 0) {
                url = url + '&target_id=' + this.state.target;
            }
            axios.get(url).then((response) => {
                //state.data에 response로 받은 json 값을 넣어줌
                var objForSettingFilter = {};
                objForSettingFilter.authBoard = response.data.contents;
                this.setState(objForSettingFilter);
                console.log(response.data.contents);
            });
        };

        return (
            <View style={styles.containerAuth}>
                {/* <Text style={styles.title}>인증게시판</Text> */}
                {/* 필터링하는 부분 */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: 120, height: 50 }}>
                        <MkPicker
                            filterName={'sido'}
                            url={'http://myks790.iptime.org:8082/board/location'}
                            onSubmit={onSubmitPicker}
                        />
                    </View>
                    <View style={{ width: 120, height: 50 }}>
                        <MkPicker
                            filterName={'major'}
                            url={'http://myks790.iptime.org:8082/board/major'}
                            onSubmit={onSubmitPicker}
                        />
                    </View>
                    <View style={{ width: 120, height: 50 }}>
                        <MkPicker
                            filterName={'target'}
                            url={'http://myks790.iptime.org:8082/board/target'}
                            onSubmit={onSubmitPicker}
                        />
                    </View>
                </View>
                {/* 게시판글 목록 */}

                <View style={styles.tableHeader}>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Text>제목</Text>
                    </View>
                    <View>
                        <Text>작성자</Text>
                    </View>
                </View>

                <FlatList
                    data={this.state.authBoard}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.id)}
                />
                <Button
                    title="글쓰기"
                    onPress={() => {
                        this.props.navigation.navigate('Update', {
                            auth: this.state.auth,
                            onSubmitRefresh: onSubmitRefresh,

                        });
                    }}
                />
            </View >
        );
    }
}

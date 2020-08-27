import React, {useState, Component, useReducer} from 'react';
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
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import config from '../config';
import styles from '../css/Styles';
import {BorderlessButton} from 'react-native-gesture-handler';
import {UserConsumer} from './UserContext';

export default function Comments(props) {
  const [state, setState] = React.useState({
    //댓글 불러오기용
    coments: [{content: 'null'}],
    //댓글쓰기용
    contentWrite: '',
    validate_contentWrite: true,
    refresh: 0,
  });
  const url = config.server + '/board/' + props.boardId + '/comment';
  React.useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        //state.data에 response로 받은 json 값을 넣어줌

        //   this.setState({
        //     ...state,
        //     popupActive: response.data.active,
        //     popupImg: response.data.image,
        //   });
        setState({...state, coments: response.data.contents});
        console.log('axios정보확인', response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log('엑시오스실패');
      });
  }, [state.refresh]);

  React.useEffect(() => {
    console.log('코멘트가 잘 들어왔나?', state.coments);
  }, [state.coments]);

  React.useEffect(() => {
    console.log('코멘트쓰기', state.contentWrite);
  }, [state.contentWrite]);
  const GetComments = () => {
    return (
      <View>
        <Text>댓글</Text>
      </View>
    );
  };

  let Result = () => {
    let result = <></>;
    if (state.coments) {
      result = state.coments.map((item) => (
        <View>
          <View>
            <Text style={stylesEm.postTitle}>{item.content} </Text>
          </View>
        </View>
      ));
    }
    return result;
  };
  const onChange = (e) => {
    setState({
      ...state, // 기존의 객체를 복사한 뒤
      [e._dispatchInstances.memoizedProps.name]: e.nativeEvent.text, // name 키를 가진 값을 value 로 설정
    });
  };

  const validateContent = (e) => {
    if (e.nativeEvent.text.length > 1) {
      state.validate_contentWrite = false;
    } else {
      state.validate_contentWrite = true;
    }
    onChange(e);
  };
  const submitContent = (isLogin) => {
    if (isLogin) {
      if (state.refresh < 3) {
        if (state.validate_contentWrite) {
          alert('내용을 입력해주세요');
        } else {
          axios
            .post(url, {content: state.contentWrite})
            .then((respone) => {
              console.log(respone);
              setState({
                ...state,
                refresh: state.refresh + 1,
                contentWrite: '',
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        alert('도배방지');
      }
    } else {
      alert('로그인을 해주세요');
    }
  };
  console.log('코멘트보드아이디', props.boardId);
  return (
    <View style={{margin: 20, borderBottomWidth: 2}}>
      <Text style={{marginLeft: 30, fontSize: 24, fontWeight: 'bold'}}>
        댓글
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 7, marginRight: 0}}>
          <TextInput
            name="contentWrite"
            multiline
            style={stylesEm.inputMultiLine}
            numberOfLines={2}
            onChange={validateContent}
            value={state.contentWrite}
            editable
            maxLength={300}
          />
        </View>
        <View>
          <UserConsumer>
            {({userInfo}) => (
              <TouchableOpacity
                style={stylesEm.submitButtonComment}
                onPress={() => {
                  submitContent(userInfo.isLogin);
                  console.log(state.contentWrite);
                }}>
                <Text style={styles.submitButtonText}> {' 입력 '}</Text>
              </TouchableOpacity>
            )}
          </UserConsumer>
        </View>
      </View>

      <Result />
    </View>
  );
}

const stylesEm = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  titleBox: {
    marginTop: 10,
    marginLeft: 20,
    borderColor: '#555',
    borderBottomWidth: 2,
    width: 360,
  },
  date: {
    fontSize: 12,
  },
  dateBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginLeft: 20,
    borderColor: '#555',
    borderBottomWidth: 2,
    width: 360,
  },
  dateItem: {
    flex: 2,
  },
  contentBox: {
    marginLeft: 20,
    width: 340,
  },
  contentsBox: {
    marginTop: 30,
    marginLeft: 20,
    borderColor: '#555',
    borderBottomWidth: 2,
    width: 360,
  },
  writerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 20,
    borderColor: '#555',
    borderBottomWidth: 2,
    width: 360,
  },
  reportText: {
    color: '#07f',
  },
  submitButtonWhite: {
    backgroundColor: 'white',
    padding: 10,
    margin: 15,
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
  },
  submitButtonGrey: {
    backgroundColor: 'grey',
    padding: 10,
    margin: 15,
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
  },
  submitButtonTextWhite: {
    color: '#000',
  },
  inputMultiLine: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
  },
  inputDate: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  inputTitle: {
    margin: 15,
    height: 40,

    borderRadius: 10,
  },

  submitButtonComment: {
    backgroundColor: 'black',
    padding: 10,
    marginLeft: 0,
    marginTop: 25,
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 12,
    textAlign: 'left',
  },
});

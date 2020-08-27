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
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
import config from '../config';
import styles from '../css/Styles';
export default function Comments(props) {
  const [state, setState] = React.useState({
    coments: [{content: 'null'}],
  });

  React.useEffect(() => {
    var url = config.server + '/board/' + props.boardId + '/comment';

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
  }, []);

  React.useEffect(() => {
    console.log('코멘트가 잘 들어왔나?', state.coments);
    Result();
  }, [state.coments]);
  const GetComments = () => {
    return (
      <View>
        <Text>댓글</Text>
      </View>
    );
  };
  let Item = ({content}) => {
    console.log('아이템', content);
    return (
      <View style={styles.postItem}>
        <View style={styles.headerTitle5}>
          <Text style={styles.postTitle}>{content} </Text>
        </View>
      </View>
    );
  };
  let renderItem = ({item}) => {
    console.log('아이템', item);
    return (
      <View>
        <Item content={item.content} />
      </View>
    );
  };
  let Result = () => {
    let result = <></>;
    if (state.coments) {
      result = state.coments.map((item) => <Text>{item.content}</Text>);
    }
    return result;
  };
  console.log('코멘트보드아이디', props.boardId);
  return (
    <View>
      <Text>댓글입니다.</Text>
      <GetComments />
      <FlatList
        data={state.coments} //dumy.boardList
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
      {state.coments ? <Result /> : <></>}
    </View>
  );
}
